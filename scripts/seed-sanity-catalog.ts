/**
 * Загружает товары из lib/products-fallback.ts в Sanity.
 * По умолчанию — одна локальная картинка из public/ (без HTTP к CDN).
 * С флагом --with-remote-images — скачивание по URL из поля image (Node https + curl --ipv4).
 *
 * Идемпотентно: seedProduct1 … seedProduct16 (createOrReplace).
 *
 * Требуется в .env.local: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET,
 * SANITY_API_WRITE_TOKEN (Editor).
 */
import { getSanityWriteEnv, REPO_ROOT } from "./bootstrap-env";
import { createClient } from "@sanity/client";
import { execFile } from "node:child_process";
import { lookup } from "node:dns/promises";
import { existsSync, readFileSync } from "node:fs";
import * as http from "node:http";
import * as https from "node:https";
import { resolve } from "node:path";

import { fallbackCatalogProducts } from "../lib/products-fallback";

const withRemoteImages = process.argv.includes("--with-remote-images");

const PLACEHOLDER_PATH = resolve(REPO_ROOT, "public/catalog-placeholder.jpg");

function extFromUrl(url: string): string {
  try {
    const p = new URL(url).pathname;
    const m = p.match(/\.(jpe?g|png|webp|gif)$/i);
    return m ? m[1].toLowerCase().replace("jpeg", "jpg") : "jpg";
  } catch {
    return "jpg";
  }
}

async function downloadUrlToBuffer(
  urlString: string,
  redirectDepth = 0,
): Promise<Buffer> {
  if (redirectDepth > 8) {
    throw new Error("Слишком много редиректов");
  }
  const url = new URL(urlString);
  const isHttps = url.protocol === "https:";
  const mod = isHttps ? https : http;
  const port =
    url.port === "" ? (isHttps ? 443 : 80) : Number.parseInt(url.port, 10);

  let connectHost = url.hostname;
  try {
    const { address } = await lookup(url.hostname, { family: 4 });
    connectHost = address;
  } catch {
    // нет A-записи / только IPv6 — оставляем hostname
  }

  return new Promise((resolvePromise, reject) => {
    const req = mod.request(
      {
        hostname: connectHost,
        port,
        path: `${url.pathname}${url.search}`,
        method: "GET",
        headers: {
          Host: url.host,
          "User-Agent": "techzonemotors-seed/1",
          Accept: "image/*,*/*",
        },
        ...(isHttps ? { servername: url.hostname } : {}),
      },
      (res) => {
        const code = res.statusCode ?? 0;
        const loc = res.headers.location;
        if (code >= 300 && code < 400 && loc) {
          res.resume();
          downloadUrlToBuffer(new URL(loc, url).href, redirectDepth + 1)
            .then(resolvePromise)
            .catch(reject);
          return;
        }
        if (code !== 200) {
          res.resume();
          reject(new Error(`HTTP ${code}`));
          return;
        }
        const chunks: Buffer[] = [];
        res.on("data", (chunk: Buffer | string) => {
          chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk));
        });
        res.on("end", () => resolvePromise(Buffer.concat(chunks)));
      },
    );
    req.on("error", reject);
    req.end();
  });
}

function downloadViaCurlIpv4(urlString: string): Promise<Buffer> {
  return new Promise((resolvePromise, reject) => {
    execFile(
      "curl",
      ["-fsSL", "--ipv4", "-A", "techzonemotors-seed/1", urlString],
      {
        maxBuffer: 40 * 1024 * 1024,
        encoding: "buffer",
      },
      (err, stdout) => {
        if (err) {
          reject(err);
          return;
        }
        resolvePromise(stdout as Buffer);
      },
    );
  });
}

async function downloadImageForSeed(urlString: string): Promise<Buffer> {
  try {
    return await downloadUrlToBuffer(urlString);
  } catch (e1) {
    console.warn(
      "Скачивание через Node (https) не удалось, пробуем curl --ipv4…",
    );
    try {
      return await downloadViaCurlIpv4(urlString);
    } catch (e2) {
      const err = new Error(
        "Не удалось скачать картинку ни через Node, ни через curl (проверь VPN/файрвол).",
      );
      (err as Error & { cause?: unknown }).cause = { e1, e2 };
      throw err;
    }
  }
}

async function main() {
  const { apiVersion, dataset, projectId, token } = getSanityWriteEnv();

  if (!projectId) {
    console.error("Нет NEXT_PUBLIC_SANITY_PROJECT_ID в .env.local");
    process.exit(1);
  }
  if (!token) {
    console.error("Нет SANITY_API_WRITE_TOKEN в .env.local");
    process.exit(1);
  }

  if (withRemoteImages) {
    console.log(
      "Режим: --with-remote-images (скачивание по URL из каталога; нужен доступ в интернет).",
    );
  } else {
    if (!existsSync(PLACEHOLDER_PATH)) {
      console.error(`Нет файла заглушки: ${PLACEHOLDER_PATH}`);
      process.exit(1);
    }
    console.log(
      "Режим: локальная заглушка public/catalog-placeholder.jpg (без скачивания). Для URL: добавьте флаг --with-remote-images.",
    );
  }

  const client = createClient({
    projectId,
    dataset,
    apiVersion,
    token,
    useCdn: false,
  });

  let sharedPlaceholderRef: string | undefined;

  if (!withRemoteImages) {
    const buf = readFileSync(PLACEHOLDER_PATH);
    const asset = await client.assets.upload("image", buf, {
      filename: "catalog-placeholder.jpg",
    });
    sharedPlaceholderRef = asset._id;
  }

  let n = 0;
  for (let i = 0; i < fallbackCatalogProducts.length; i++) {
    const p = fallbackCatalogProducts[i];
    const _id = `seedProduct${i + 1}`;

    let assetRef: string;
    if (withRemoteImages) {
      const remoteUrl =
        p.seedRemoteImageUrl ??
        (p.image.startsWith("http://") || p.image.startsWith("https://")
          ? p.image
          : undefined);
      if (!remoteUrl) {
        console.error(
          `В режиме --with-remote-images нет URL для «${p.name}» (нужен seedRemoteImageUrl или абсолютный image).`,
        );
        process.exit(1);
      }
      let buf: Buffer;
      try {
        buf = await downloadImageForSeed(remoteUrl);
      } catch (e) {
        console.error(`Не скачать картинку для «${p.name}»:`, e);
        process.exit(1);
      }
      const ext = extFromUrl(remoteUrl);
      const asset = await client.assets.upload("image", buf, {
        filename: `catalog-${i + 1}.${ext}`,
      });
      assetRef = asset._id;
    } else {
      assetRef = sharedPlaceholderRef!;
    }

    await client.createOrReplace({
      _id,
      _type: "product",
      name: p.name,
      description: p.description,
      price: p.price,
      slug: { _type: "slug", current: `catalog-item-${i + 1}` },
      sortOrder: i,
      image: {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: assetRef,
        },
      },
    });

    n += 1;
    console.log(`OK ${_id}: ${p.name}`);
  }

  console.log(`Готово: ${n} товаров в dataset «${dataset}».`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});

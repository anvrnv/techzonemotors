import { DEFAULT_CATALOG_IMAGE_URL } from "@/lib/catalog-product";
import { fallbackSvoProducts } from "@/lib/svo-products-fallback";
import { getSanityClient } from "@/lib/sanity/client";
import { projectId } from "@/lib/sanity/env";
import { urlForImage } from "@/lib/sanity/image";
import {
  svoProductBySlugQuery,
  svoProductsQuery,
} from "@/lib/sanity/queries";
import type { SanitySvoProductRow } from "@/lib/sanity/types";

export type SvoCatalogProduct = {
  id: string;
  slug: string;
  brand: string;
  model: string;
  name?: string;
  description: string;
  priceRegular?: string;
  priceDiscount?: string;
  image: string;
};

function simpleSlug(s: string): string {
  const t = s
    .toLowerCase()
    .trim()
    .replace(/\s+/g, "-");
  const cleaned = t
    .replace(/[^a-z0-9а-яё-]/gi, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return cleaned;
}

function mapFallbackRows(rows: typeof fallbackSvoProducts): SvoCatalogProduct[] {
  return rows.map((row) => ({
    id: row.id,
    slug: row.slug,
    brand: row.brand,
    model: row.model,
    ...(row.name ? { name: row.name } : {}),
    description: row.description,
    priceRegular: row.priceRegular,
    priceDiscount: row.priceDiscount,
    image: row.image,
  }));
}

function sanityRowHasImageAsset(
  image: SanitySvoProductRow["image"],
): boolean {
  if (image == null || typeof image !== "object") return false;
  return Object.keys(image).length > 0;
}

function mapSanityRows(rows: SanitySvoProductRow[]): SvoCatalogProduct[] {
  const out: SvoCatalogProduct[] = [];
  for (const row of rows) {
    const nameOpt = row.name?.trim();
    const brand = row.brand?.trim() ?? "";
    const model = row.model?.trim() ?? "";
    const slugRaw = row.slug?.trim() ?? "";
    const hasName = Boolean(nameOpt);
    const hasImageAsset = sanityRowHasImageAsset(row.image);
    const hasCore = Boolean(brand && model && slugRaw && hasImageAsset);
    if (!hasName && !hasCore) {
      continue;
    }

    const imageUrl =
      urlForImage(row.image ?? undefined, 1200) ?? DEFAULT_CATALOG_IMAGE_URL;

    const slug =
      slugRaw ||
      simpleSlug(nameOpt || `${brand}-${model}`) ||
      row.id.replace(/^drafts\./, "");

    const pr = row.priceRegular?.trim();
    const pd = row.priceDiscount?.trim();

    out.push({
      id: row.id,
      slug,
      brand,
      model,
      ...(nameOpt ? { name: nameOpt } : {}),
      description: row.description?.trim() ?? "",
      priceRegular: pr || undefined,
      priceDiscount: pd || undefined,
      image: imageUrl,
    });
  }
  return out;
}

export async function getSvoCatalogProducts(): Promise<SvoCatalogProduct[]> {
  if (!projectId) {
    return mapFallbackRows(fallbackSvoProducts);
  }

  const client = getSanityClient();
  if (!client) {
    return mapFallbackRows(fallbackSvoProducts);
  }

  try {
    const rows = await client.fetch<SanitySvoProductRow[]>(svoProductsQuery);
    const mapped = mapSanityRows(rows ?? []);
    if (mapped.length === 0) {
      return mapFallbackRows(fallbackSvoProducts);
    }
    return mapped;
  } catch {
    return mapFallbackRows(fallbackSvoProducts);
  }
}

export async function getSvoProductBySlug(
  slug: string,
): Promise<SvoCatalogProduct | null> {
  const normalized = slug.trim();
  if (!normalized) {
    return null;
  }

  if (projectId) {
    const client = getSanityClient();
    if (client) {
      try {
        const row = await client.fetch<SanitySvoProductRow | null>(
          svoProductBySlugQuery,
          { slug: normalized },
        );
        if (row) {
          const [one] = mapSanityRows([row]);
          if (one) {
            return one;
          }
        }
      } catch {
        // fallback below
      }
    }
  }

  const fromFallback = mapFallbackRows(fallbackSvoProducts);
  return fromFallback.find((p) => p.slug === normalized) ?? null;
}

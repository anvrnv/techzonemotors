import { DEFAULT_CATALOG_IMAGE_URL } from "@/lib/catalog-product";
import { fallbackSvoProducts } from "@/lib/svo-products-fallback";
import { getSanityClient } from "@/lib/sanity/client";
import { projectId } from "@/lib/sanity/env";
import { urlForImage } from "@/lib/sanity/image";
import { svoProductsQuery } from "@/lib/sanity/queries";
import type { SanitySvoProductRow } from "@/lib/sanity/types";

export type SvoCatalogProduct = {
  id: string;
  name: string;
  description: string;
  priceRegular: string;
  priceDiscount: string;
  image: string;
};

function mapFallbackRows(rows: typeof fallbackSvoProducts): SvoCatalogProduct[] {
  return rows.map((row) => ({
    id: row.id,
    name: row.name,
    description: row.description,
    priceRegular: row.priceRegular,
    priceDiscount: row.priceDiscount,
    image: row.image,
  }));
}

function mapSanityRows(rows: SanitySvoProductRow[]): SvoCatalogProduct[] {
  const out: SvoCatalogProduct[] = [];
  for (const row of rows) {
    const name = row.name?.trim();
    const description = row.description?.trim() ?? "";
    const priceRegular = row.priceRegular?.trim() ?? "";
    const priceDiscount = row.priceDiscount?.trim() ?? "";
    if (!name || !priceRegular || !priceDiscount) {
      continue;
    }
    const imageUrl =
      urlForImage(row.image ?? undefined, 1200) ?? DEFAULT_CATALOG_IMAGE_URL;
    out.push({
      id: row.id,
      name,
      description,
      priceRegular,
      priceDiscount,
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

import { DEFAULT_CATALOG_IMAGE_URL, type CatalogProduct } from "@/lib/catalog-product";
import { fallbackCatalogProducts } from "@/lib/products-fallback";
import { getSanityClient } from "@/lib/sanity/client";
import { projectId } from "@/lib/sanity/env";
import { urlForImage } from "@/lib/sanity/image";
import { productsQuery } from "@/lib/sanity/queries";
import type { SanityProductRow } from "@/lib/sanity/types";

function mapSanityRows(rows: SanityProductRow[]): CatalogProduct[] {
  const out: CatalogProduct[] = [];
  for (const row of rows) {
    const name = row.name?.trim();
    const description = row.description?.trim() ?? "";
    const price = row.price?.trim() ?? "";
    if (!name) {
      continue;
    }
    const imageUrl =
      urlForImage(row.image ?? undefined, 1200) ?? DEFAULT_CATALOG_IMAGE_URL;
    out.push({
      id: row.id,
      name,
      description,
      price,
      image: imageUrl,
    });
  }
  return out;
}

export async function getCatalogProducts(): Promise<CatalogProduct[]> {
  if (!projectId) {
    return fallbackCatalogProducts;
  }

  const client = getSanityClient();
  if (!client) {
    return fallbackCatalogProducts;
  }

  try {
    const rows = await client.fetch<SanityProductRow[]>(productsQuery);
    const mapped = mapSanityRows(rows ?? []);
    if (mapped.length === 0) {
      return fallbackCatalogProducts;
    }
    return mapped;
  } catch {
    return fallbackCatalogProducts;
  }
}

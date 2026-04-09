import type { CatalogProduct } from "@/lib/catalog-product";
import { getCatalogProducts, mapSanityProductRows } from "@/lib/products";
import { getSanityClient } from "@/lib/sanity/client";
import { projectId } from "@/lib/sanity/env";
import { homeCarouselSettingsQuery } from "@/lib/sanity/queries";
import type {
  SanityHomeCarouselSettingsRow,
  SanityProductRow,
} from "@/lib/sanity/types";

function filterProductRows(
  items: (SanityProductRow | null | undefined)[] | null | undefined,
): SanityProductRow[] {
  const out: SanityProductRow[] = [];
  for (const row of items ?? []) {
    if (row != null && typeof row.id === "string") {
      out.push(row);
    }
  }
  return out;
}

export async function getHomeCarouselProducts(): Promise<CatalogProduct[]> {
  if (!projectId) {
    return getCatalogProducts();
  }

  const client = getSanityClient();
  if (!client) {
    return getCatalogProducts();
  }

  try {
    const doc = await client.fetch<SanityHomeCarouselSettingsRow | null>(
      homeCarouselSettingsQuery,
    );
    if (!doc) {
      return getCatalogProducts();
    }

    const rows = filterProductRows(doc.items);
    if (rows.length === 0) {
      return getCatalogProducts();
    }

    const mapped = mapSanityProductRows(rows);
    if (mapped.length === 0) {
      return getCatalogProducts();
    }

    return mapped;
  } catch {
    return getCatalogProducts();
  }
}

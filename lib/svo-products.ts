import { DEFAULT_CATALOG_IMAGE_URL } from "@/lib/catalog-product";
import { fallbackSvoProducts } from "@/lib/svo-products-fallback";
import { getSanityClient } from "@/lib/sanity/client";
import { projectId } from "@/lib/sanity/env";
import { urlForImage } from "@/lib/sanity/image";
import {
  svoProductBySlugQuery,
  svoProductsQuery,
} from "@/lib/sanity/queries";
import type {
  SanitySvoProductDetailRow,
  SanitySvoProductRow,
} from "@/lib/sanity/types";
import type { SvoFallbackRow } from "@/lib/svo-products-fallback";

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

export type SvoDetailProduct = SvoCatalogProduct & {
  specTorque?: string;
  specFuelConsumption?: string;
  specMaxSpeed?: string;
  specVolume?: string;
  dimensionLength?: string;
  dimensionHeight?: string;
};

export function svoDisplayTitle(
  product: SvoCatalogProduct | { brand: string; model: string; name?: string },
): string {
  const brand = product.brand?.trim() ?? "";
  const model = product.model?.trim() ?? "";
  const pair = [brand, model].filter(Boolean).join(" — ");
  if (pair) return pair;
  const name = "name" in product ? product.name?.trim() : "";
  if (name) return name;
  return "Техника СВО";
}

/** Matches visible SVO tile caption for screen readers: «brand / model» when both set. */
export function svoTileAccessibleText(
  product: SvoCatalogProduct | { brand: string; model: string; name?: string },
): string {
  const brand = product.brand?.trim() ?? "";
  const model = product.model?.trim() ?? "";
  if (brand && model) return `${brand} / ${model}`;
  return svoDisplayTitle(product);
}

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

function optionalTrimmed(s: string | undefined): string | undefined {
  const t = s?.trim();
  return t ? t : undefined;
}

function mapFallbackRowToCatalog(row: SvoFallbackRow): SvoCatalogProduct {
  return {
    id: row.id,
    slug: row.slug,
    brand: row.brand,
    model: row.model,
    ...(row.name ? { name: row.name } : {}),
    description: row.description,
    priceRegular: optionalTrimmed(row.priceRegular),
    priceDiscount: optionalTrimmed(row.priceDiscount),
    image: row.image,
  };
}

function mapFallbackRowToDetail(row: SvoFallbackRow): SvoDetailProduct {
  return {
    ...mapFallbackRowToCatalog(row),
    specTorque: optionalTrimmed(row.specTorque),
    specFuelConsumption: optionalTrimmed(row.specFuelConsumption),
    specMaxSpeed: optionalTrimmed(row.specMaxSpeed),
    specVolume: optionalTrimmed(row.specVolume),
    dimensionLength: optionalTrimmed(row.dimensionLength),
    dimensionHeight: optionalTrimmed(row.dimensionHeight),
  };
}

function mapFallbackRows(rows: typeof fallbackSvoProducts): SvoCatalogProduct[] {
  return rows.map((row) => mapFallbackRowToCatalog(row));
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

function mapSanityRowToDetail(
  row: SanitySvoProductDetailRow,
): SvoDetailProduct | null {
  const nameOpt = row.name?.trim();
  const brand = row.brand?.trim() ?? "";
  const model = row.model?.trim() ?? "";
  const slugRaw = row.slug?.trim() ?? "";
  const hasName = Boolean(nameOpt);
  const hasImageAsset = sanityRowHasImageAsset(row.image);
  const hasCore = Boolean(brand && model && slugRaw && hasImageAsset);
  if (!hasName && !hasCore) {
    return null;
  }

  const imageUrl =
    urlForImage(row.image ?? undefined, 1200) ?? DEFAULT_CATALOG_IMAGE_URL;

  const slug =
    slugRaw ||
    simpleSlug(nameOpt || `${brand}-${model}`) ||
    row.id.replace(/^drafts\./, "");

  const pr = row.priceRegular?.trim();
  const pd = row.priceDiscount?.trim();

  return {
    id: row.id,
    slug,
    brand,
    model,
    ...(nameOpt ? { name: nameOpt } : {}),
    description: row.description?.trim() ?? "",
    priceRegular: pr || undefined,
    priceDiscount: pd || undefined,
    image: imageUrl,
    specTorque: optionalTrimmed(row.specTorque),
    specFuelConsumption: optionalTrimmed(row.specFuelConsumption),
    specMaxSpeed: optionalTrimmed(row.specMaxSpeed),
    specVolume: optionalTrimmed(row.specVolume),
    dimensionLength: optionalTrimmed(row.dimensionLength),
    dimensionHeight: optionalTrimmed(row.dimensionHeight),
  };
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
): Promise<SvoDetailProduct | null> {
  const normalized = slug.trim();
  if (!normalized) {
    return null;
  }

  if (projectId) {
    const client = getSanityClient();
    if (client) {
      try {
        const row = await client.fetch<SanitySvoProductDetailRow | null>(
          svoProductBySlugQuery,
          { slug: normalized },
        );
        if (row) {
          const one = mapSanityRowToDetail(row);
          if (one) {
            return one;
          }
        }
      } catch {
        // fallback below
      }
    }
  }

  const row = fallbackSvoProducts.find((p) => p.slug === normalized);
  return row ? mapFallbackRowToDetail(row) : null;
}

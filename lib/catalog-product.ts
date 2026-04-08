export type CatalogProduct = {
  id: string;
  name: string;
  description: string;
  price: string;
  image: string;
};

/** Локальный файл в `public/` — работает без внешних CDN (офлайн, жёсткие файрволы). */
export const DEFAULT_CATALOG_IMAGE_URL = "/catalog-placeholder.jpg";

export type CatalogProductsProps = {
  products: CatalogProduct[];
};

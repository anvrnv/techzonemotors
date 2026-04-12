import type { PortableTextBlock } from "@portabletext/types";

/** Raw product row returned by `productsQuery` in GROQ. */
export type SanityProductRow = {
  id: string;
  name?: string;
  description?: string;
  price?: string;
  image?: Record<string, unknown> | null;
};

/** Raw `svoProduct` row from `svoProductsQuery` in GROQ (list; lean). */
export type SanitySvoProductRow = {
  id: string;
  name?: string;
  brand?: string;
  model?: string;
  slug?: string | null;
  description?: string;
  priceRegular?: string;
  priceDiscount?: string;
  image?: Record<string, unknown> | null;
};

/** Raw `svoProduct` row from `svoProductBySlugQuery` (detail; includes specs). */
export type SanitySvoProductDetailRow = SanitySvoProductRow & {
  specTorque?: string;
  specFuelConsumption?: string;
  specMaxSpeed?: string;
  specVolume?: string;
  dimensionLength?: string;
  dimensionHeight?: string;
};

/** Singleton `homeCarouselSettings` row from `homeCarouselSettingsQuery`. */
export type SanityHomeCarouselSettingsRow = {
  items?: (SanityProductRow | null)[] | null;
};

/** Row for article cards from `articlesListQuery`. */
export type SanityArticleListRow = {
  title?: string;
  excerpt?: string | null;
  slug?: string | null;
};

/** Full article from `articleBySlugQuery` (body is Portable Text). */
export type SanityArticleDetail = {
  title?: string;
  excerpt?: string | null;
  slug?: string | null;
  body?: PortableTextBlock[] | null;
};

/** Raw `review` row from `reviewsQuery` (published only). */
export type SanityReviewRow = {
  id: string;
  authorName?: string;
  text?: string;
  ratingTen?: number;
  sortOrder?: number;
};

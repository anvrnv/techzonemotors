import type { PortableTextBlock } from "@portabletext/types";

/** Raw product row returned by `productsQuery` in GROQ. */
export type SanityProductRow = {
  id: string;
  name?: string;
  description?: string;
  price?: string;
  image?: Record<string, unknown> | null;
};

/** Raw `svoProduct` row returned by `svoProductsQuery` in GROQ. */
export type SanitySvoProductRow = {
  id: string;
  name?: string;
  description?: string;
  priceRegular?: string;
  priceDiscount?: string;
  image?: Record<string, unknown> | null;
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

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

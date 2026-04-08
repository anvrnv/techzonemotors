/** Raw product row returned by `productsQuery` in GROQ. */
export type SanityProductRow = {
  id: string;
  name?: string;
  description?: string;
  price?: string;
  image?: Record<string, unknown> | null;
};

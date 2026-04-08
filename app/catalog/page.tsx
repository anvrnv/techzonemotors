import CatalogPageClient from "./CatalogPageClient";
import { getCatalogProducts } from "@/lib/products";

export const revalidate = 60;

export default async function CatalogPage() {
  const products = await getCatalogProducts();
  return <CatalogPageClient products={products} />;
}

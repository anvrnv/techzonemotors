import SvoPageClient from "./SvoPageClient";
import { getSvoCatalogProducts } from "@/lib/svo-products";

export const revalidate = 60;

export default async function SvoPage() {
  const products = await getSvoCatalogProducts();
  return <SvoPageClient products={products} />;
}

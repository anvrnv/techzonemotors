import SvoPageClient from "./SvoPageClient";
import { getSvoCatalogProducts } from "@/lib/svo-products";

export const revalidate = 60;

export default async function SvoPage() {
  const products = await getSvoCatalogProducts();
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <SvoPageClient products={products} />
    </div>
  );
}

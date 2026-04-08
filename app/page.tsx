import HomeClient from "./HomeClient";
import { getCatalogProducts } from "@/lib/products";

export const revalidate = 60;

export default async function Home() {
  const products = await getCatalogProducts();
  return <HomeClient products={products} />;
}

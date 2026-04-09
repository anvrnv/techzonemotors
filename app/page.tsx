import HomeClient from "./HomeClient";
import { getHomeCarouselProducts } from "@/lib/home-carousel";

export const revalidate = 60;

export default async function Home() {
  const products = await getHomeCarouselProducts();
  return <HomeClient products={products} />;
}

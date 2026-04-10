import HomeClient from "./HomeClient";
import { getHomeCarouselProducts } from "@/lib/home-carousel";
import { getReviewsForGrid } from "@/lib/reviews";

export const revalidate = 60;

export default async function Home() {
  const [products, reviews] = await Promise.all([
    getHomeCarouselProducts(),
    getReviewsForGrid(),
  ]);
  return <HomeClient products={products} reviews={reviews} />;
}

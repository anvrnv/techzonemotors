"use client";

import { useRouter } from "next/navigation";

import ProductCarousel from "./components/ProductCarousel";
import ReviewsGrid from "./components/ReviewsGrid";
import Footer from "./components/Footer";
import type { CatalogProductsProps } from "@/lib/catalog-product";
import type { ReviewData } from "@/lib/reviews";
import { dispatchOpenContactModal } from "@/lib/contact-modal";

type HomeClientProps = CatalogProductsProps & {
  reviews: (ReviewData | null)[];
};

export default function HomeClient({ products, reviews }: HomeClientProps) {
  const router = useRouter();
  const openModal = () => dispatchOpenContactModal();

  return (
    <div className="bg-[#111111] flex flex-col min-h-screen">
      <ProductCarousel
        products={products}
        onBuyClick={openModal}
        onDetailsClick={() => router.push("/catalog")}
      />
      <ReviewsGrid reviews={reviews} />
      <Footer />
    </div>
  );
}

"use client";

import ProductCarousel from "./components/ProductCarousel";
import ReviewsGrid from "./components/ReviewsGrid";
import Footer from "./components/Footer";
import type { CatalogProductsProps } from "@/lib/catalog-product";
import { dispatchOpenContactModal } from "@/lib/contact-modal";

export default function HomeClient({ products }: CatalogProductsProps) {
  const openModal = () => dispatchOpenContactModal();

  return (
    <div className="bg-[#111111] flex flex-col min-h-screen">
      <ProductCarousel products={products} onBuyClick={openModal} />
      <ReviewsGrid />
      <Footer />
    </div>
  );
}

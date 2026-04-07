"use client";

import ProductCarousel from "./components/ProductCarousel";
import ReviewsGrid from "./components/ReviewsGrid";
import Footer from "./components/Footer";

export default function Home() {
  const openModal = () =>
    window.dispatchEvent(new CustomEvent("open-contact-modal"));

  return (
    <div className="bg-[#111111] flex flex-col min-h-screen">
      <ProductCarousel onBuyClick={openModal} />
      <ReviewsGrid />
      <Footer />
    </div>
  );
}

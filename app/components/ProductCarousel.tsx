"use client";

import { useState } from "react";

import type { CatalogProductsProps } from "@/lib/catalog-product";

type ProductCarouselProps = CatalogProductsProps & {
  onBuyClick?: () => void;
};

export default function ProductCarousel({
  products,
  onBuyClick,
}: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fading, setFading] = useState(false);

  if (products.length === 0) {
    return (
      <section
        className="w-full flex flex-col items-center justify-center px-6 text-center"
        style={{ minHeight: "calc(100vh - 3.5rem)", padding: "2rem 0 1.5rem" }}
      >
        <h2 className="text-white text-3xl font-bold tracking-tight mb-4">
          Наш каталог
        </h2>
        <p className="text-zinc-400 text-sm max-w-md">
          Товары скоро появятся. Загляните позже или откройте раздел «Каталог» в
          меню.
        </p>
      </section>
    );
  }

  const navigate = (index: number) => {
    setFading(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setFading(false);
    }, 150);
  };

  const prev = () =>
    navigate((currentIndex - 1 + products.length) % products.length);
  const next = () => navigate((currentIndex + 1) % products.length);

  const product = products[currentIndex];

  return (
    <section
      className="w-full flex flex-col px-0"
      style={{ height: "calc(100vh - 3.5rem)", padding: "2rem 0 1.5rem" }}
    >
      <h2 className="text-white text-3xl font-bold tracking-tight text-center flex-shrink-0 mb-6">
        Наш каталог
      </h2>

      <div className="relative flex items-center justify-center flex-1 min-h-0">
        <button
          onClick={prev}
          aria-label="Предыдущий"
          className="absolute left-4 md:left-8 z-10 w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:border-white/40 transition-all duration-200"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M12 5L7 10L12 15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>

        <div
          className="w-full max-w-6xl mx-auto px-8 md:px-16 h-full min-h-0"
          style={{
            opacity: fading ? 0 : 1,
            transition: "opacity 0.15s ease",
          }}
        >
          <div className="rounded-2xl overflow-hidden h-full flex flex-col shadow-2xl">
            <div className="flex-none" style={{ height: "72%" }}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            <div
              className="flex-none bg-zinc-900 px-8 py-5 flex flex-col justify-center"
              style={{ height: "28%" }}
            >
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="text-white font-bold text-2xl leading-snug truncate">
                    {product.name}
                  </h3>
                  <p className="text-zinc-400 text-sm mt-1 leading-relaxed line-clamp-2">
                    {product.description}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className="text-orange-400 font-semibold text-2xl whitespace-nowrap">
                    {product.price}
                  </span>
                  <button
                    className="px-5 py-2 rounded-full border border-white text-white text-sm font-medium hover:bg-white hover:text-black transition-all duration-200 whitespace-nowrap"
                    onClick={onBuyClick}
                  >
                    Подробнее
                  </button>
                  <button
                    className="px-5 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 active:scale-95 transition-all duration-200 whitespace-nowrap"
                    onClick={onBuyClick}
                  >
                    Купить
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={next}
          aria-label="Следующий"
          className="absolute right-4 md:right-8 z-10 w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm border border-white/20 flex items-center justify-center text-white hover:bg-white/20 hover:border-white/40 transition-all duration-200"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path
              d="M8 5L13 10L8 15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </section>
  );
}

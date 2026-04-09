"use client";

import { useEffect, useRef, useState } from "react";

import type { CatalogProductsProps } from "@/lib/catalog-product";

type ProductCarouselProps = CatalogProductsProps & {
  onBuyClick?: () => void;
  /** «Подробнее» — отдельно от «Купить» (например переход в каталог). */
  onDetailsClick?: () => void;
};

export default function ProductCarousel({
  products,
  onBuyClick,
  onDetailsClick,
}: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const fadeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (fadeTimerRef.current !== null) clearTimeout(fadeTimerRef.current);
    };
  }, []);

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
    if (fadeTimerRef.current !== null) clearTimeout(fadeTimerRef.current);
    setFading(true);
    fadeTimerRef.current = setTimeout(() => {
      fadeTimerRef.current = null;
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
          className="w-full max-w-6xl mx-auto px-8 md:px-16 flex justify-center items-center min-h-0"
          style={{
            opacity: fading ? 0 : 1,
            transition: "opacity 0.15s ease",
          }}
        >
          <div className="relative w-full aspect-[3/2] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={product.image}
              alt={product.name}
              className="absolute inset-0 z-0 w-full h-full object-cover brightness-110"
            />
            <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/80 via-black/50 to-transparent px-6 py-5 md:px-8 md:pb-6 pt-16 md:pt-20">
              <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
                <div className="min-w-0">
                  <h3 className="text-white font-bold text-2xl leading-snug truncate drop-shadow-sm">
                    {product.name}
                  </h3>
                  <p className="text-zinc-200/90 text-sm mt-1 leading-relaxed line-clamp-2 drop-shadow-sm">
                    {product.description}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <span className="text-orange-400 font-semibold text-2xl whitespace-nowrap drop-shadow-sm">
                    {product.price}
                  </span>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-full border border-white text-white text-sm font-medium hover:bg-white hover:text-black transition-all duration-200 whitespace-nowrap"
                    onClick={onDetailsClick ?? onBuyClick}
                  >
                    Подробнее
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 active:scale-95 transition-all duration-200 whitespace-nowrap"
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

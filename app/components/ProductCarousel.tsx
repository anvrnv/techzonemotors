"use client";

import { useEffect, useRef, useState } from "react";

import type { CatalogProductsProps } from "@/lib/catalog-product";

type ProductCarouselProps = CatalogProductsProps & {
  onBuyClick?: () => void;
  /** «Подробнее» — отдельно от «Купить» (например переход в каталог). */
  onDetailsClick?: () => void;
};

const primaryBtn =
  "inline-flex items-center justify-center min-h-[44px] rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:bg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/60 active:scale-95";

const secondaryBtn =
  "inline-flex items-center justify-center min-h-[44px] rounded-full border border-white/35 bg-white/0 px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 whitespace-nowrap";

const navBtn =
  "absolute z-10 flex h-12 w-12 items-center justify-center rounded-full border border-white/25 bg-black/40 text-white backdrop-blur-sm transition-all duration-200 hover:border-white/45 hover:bg-foreground/35 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50";

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
        <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground">
          Наш каталог
        </h2>
        <p className="max-w-md text-sm text-foreground-muted">
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
      className="flex w-full flex-col px-0"
      style={{ height: "calc(100vh - 3.5rem)", padding: "2rem 0 1.5rem" }}
    >
      <h2 className="mb-6 flex-shrink-0 text-center text-3xl font-bold tracking-tight text-foreground">
        Наш каталог
      </h2>

      <div className="relative flex min-h-0 flex-1 items-center justify-center">
        <button
          onClick={prev}
          aria-label="Предыдущий"
          className={`left-4 md:left-8 ${navBtn}`}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
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
          className="mx-auto flex w-full min-h-0 max-w-6xl items-center justify-center px-8 md:px-16"
          style={{
            opacity: fading ? 0 : 1,
            transition: "opacity 0.15s ease",
          }}
        >
          <div className="relative aspect-[3/2] w-full overflow-hidden rounded-2xl shadow-elevated">
            <img
              src={product.image}
              alt={product.name}
              className="absolute inset-0 z-0 h-full w-full object-cover brightness-110"
            />
            <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/80 via-black/50 to-transparent px-6 pt-16 pb-5 md:px-8 md:pt-20 md:pb-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="min-w-0">
                  <h3 className="truncate text-2xl font-bold leading-snug text-white drop-shadow-sm">
                    {product.name}
                  </h3>
                  <p className="mt-1 line-clamp-2 text-sm leading-relaxed text-zinc-200/90 drop-shadow-sm">
                    {product.description}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-3 shrink-0">
                  <span className="whitespace-nowrap text-2xl font-semibold text-accent drop-shadow-sm">
                    {product.price}
                  </span>
                  <button
                    type="button"
                    className={secondaryBtn}
                    onClick={onDetailsClick ?? onBuyClick}
                  >
                    Подробнее
                  </button>
                  <button
                    type="button"
                    className={`${primaryBtn} whitespace-nowrap`}
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
          className={`right-4 md:right-8 ${navBtn}`}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden>
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

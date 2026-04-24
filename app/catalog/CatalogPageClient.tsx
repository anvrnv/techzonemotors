"use client";

import { useEffect, useId, useState } from "react";

import type { CatalogProduct, CatalogProductsProps } from "@/lib/catalog-product";
import { dispatchOpenContactModal } from "@/lib/contact-modal";

const primaryBtn =
  "inline-flex items-center justify-center min-h-[44px] rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:bg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/60 active:scale-95";

const secondaryBtnOnPhoto =
  "inline-flex items-center justify-center min-h-[44px] rounded-full border border-white/35 bg-white/0 px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50";

function ProductModal({
  product,
  onClose,
  onBuyClick,
}: {
  product: CatalogProduct;
  onClose: () => void;
  onBuyClick: () => void;
}) {
  const titleId = useId();

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center bg-overlay-scrim-strong p-4 md:p-8 backdrop-blur-[8px]"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Закрыть"
        className="absolute top-5 right-5 z-[95] flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-border/80 bg-card/90 text-foreground shadow-sm backdrop-blur-sm transition hover:bg-card-raised focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/60"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
          <path
            d="M3 3L13 13M13 3L3 13"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <div
        className="max-h-[90vh] w-full max-w-5xl overflow-y-auto overflow-x-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <div className="relative w-full aspect-[3/2] overflow-hidden rounded-2xl shadow-elevated">
          <img
            src={product.image}
            alt={product.name}
            className="absolute inset-0 z-0 h-full w-full object-cover brightness-110"
          />
          <div className="absolute inset-x-0 bottom-0 z-10 bg-gradient-to-t from-black/80 via-black/50 to-transparent px-6 pt-16 pb-5 md:px-8 md:pt-20 md:pb-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="min-w-0">
                <h3
                  id={titleId}
                  className="truncate text-2xl font-bold leading-snug text-white drop-shadow-sm"
                >
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
                  className={`${secondaryBtnOnPhoto} whitespace-nowrap`}
                  onClick={onClose}
                >
                  Подробнее
                </button>
                <button
                  type="button"
                  className={`${primaryBtn} whitespace-nowrap`}
                  onClick={() => {
                    onClose();
                    onBuyClick();
                  }}
                >
                  Купить
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CatalogPageClient({ products }: CatalogProductsProps) {
  const [selected, setSelected] = useState<CatalogProduct | null>(null);

  const openModal = (product: CatalogProduct) => setSelected(product);
  const closeModal = () => setSelected(null);
  const openContactModal = () => {
    closeModal();
    dispatchOpenContactModal();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-6 py-section">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">
          Каталог товаров
        </h1>
        <p className="mb-10 text-sm text-foreground-muted">
          {products.length} моделей питбайков в наличии
        </p>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <button
              key={product.id}
              onClick={() => openModal(product)}
              className="group text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring/40 focus-visible:ring-offset-2 focus-visible:ring-offset-background focus-visible:outline-none rounded-xl border border-border bg-card shadow-card overflow-hidden hover:border-border-strong hover:bg-card-raised hover:shadow-elevated hover:scale-[1.02] active:scale-[0.99]"
            >
              <div className="h-44 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition-all duration-200 group-hover:brightness-110"
                />
              </div>

              <div className="flex flex-col gap-1.5 p-4">
                <h3 className="line-clamp-1 text-sm font-semibold leading-snug text-foreground">
                  {product.name}
                </h3>
                <p className="line-clamp-2 text-xs leading-relaxed text-foreground-subtle">
                  {product.description}
                </p>
                <span className="mt-1 text-base font-bold text-accent">
                  {product.price}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <ProductModal
          product={selected}
          onClose={closeModal}
          onBuyClick={openContactModal}
        />
      )}
    </div>
  );
}

"use client";

import { useEffect, useId, useState } from "react";

import type { CatalogProduct, CatalogProductsProps } from "@/lib/catalog-product";
import { dispatchOpenContactModal } from "@/lib/contact-modal";

const primaryBtn =
  "inline-flex items-center justify-center min-h-[44px] rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-200 hover:bg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/60 active:scale-95";

const secondaryBtnOnPhoto =
  "inline-flex items-center justify-center min-h-[44px] rounded-full border border-white/35 bg-white/0 px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50";

const catalogCardShell =
  "group flex min-h-[300px] flex-col overflow-hidden rounded-[length:var(--r-showroom)] border border-border/80 bg-card text-left shadow-[var(--s-showroom-card)] transition-all duration-300 ease-out hover:-translate-y-1 hover:border-border-strong hover:bg-card-raised hover:shadow-[var(--s-showroom-card-hover)] focus-within:ring-2 focus-within:ring-ring/40 focus-within:ring-offset-2 focus-within:ring-offset-background";

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
        <div className="catalog-showroom-stage relative w-full aspect-[3/2] overflow-hidden rounded-[length:var(--r-showroom)] shadow-elevated">
          <div className="absolute inset-0 z-[2] flex items-center justify-center px-5 pt-5 pb-[7.25rem] md:px-8 md:pt-8 md:pb-40">
            <img
              src={product.image}
              alt={product.name}
              className="catalog-showroom-product-shadow relative z-[2] max-h-full max-w-full object-contain brightness-[0.96] contrast-[1.06]"
            />
          </div>
          <div
            className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-t from-black/35 via-transparent to-black/12"
            aria-hidden
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
                  Подобрать технику
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
      <div className="page-shell section-block">
        <h1 className="section-heading">Каталог товаров</h1>
        <p className="section-intro mb-12 md:mb-14">
          {products.length} моделей питбайков в наличии
        </p>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product) => (
            <article key={product.id} className={catalogCardShell}>
              <div className="catalog-showroom-stage relative flex min-h-0 flex-[7] basis-0 flex-col">
                <div className="relative z-[2] flex min-h-[150px] flex-1 items-center justify-center px-3 pb-[4.5rem] pt-3 sm:min-h-[160px] sm:px-4 sm:pb-[4.75rem] sm:pt-4">
                  <img
                    src={product.image}
                    alt=""
                    role="presentation"
                    className="catalog-showroom-product-shadow relative z-[2] max-h-[min(11rem,46vw)] w-full max-w-full object-contain brightness-[0.96] contrast-[1.06] transition duration-300 group-hover:brightness-[1] sm:max-h-[13rem]"
                  />
                </div>
                <div
                  className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-t from-black/48 via-black/12 to-black/18"
                  aria-hidden
                />
                <div className="absolute inset-x-0 bottom-0 z-[4] flex flex-col items-stretch gap-2 px-3 pb-2.5 sm:flex-row sm:flex-wrap sm:items-stretch sm:gap-2.5 sm:px-4 sm:pb-3">
                  <button
                    type="button"
                    className={`${primaryBtn} w-full shrink-0 sm:w-auto`}
                    onClick={() => {
                      dispatchOpenContactModal();
                    }}
                  >
                    Оставить заявку
                  </button>
                  <button
                    type="button"
                    className={`${secondaryBtnOnPhoto} shrink-0 self-center sm:self-auto`}
                    onClick={() => {
                      openModal(product);
                    }}
                  >
                    Подробнее
                  </button>
                </div>
              </div>

              <div className="flex min-h-0 flex-[3] basis-0 flex-col justify-center gap-1 border-t border-border-faint px-4 py-3.5">
                <h3 className="line-clamp-2 text-base font-bold leading-snug text-foreground sm:text-lg">
                  {product.name}
                </h3>
                <p className="line-clamp-2 text-xs leading-relaxed text-foreground-subtle sm:text-sm">
                  {product.description}
                </p>
                <span className="mt-0.5 text-lg font-bold text-accent sm:text-xl">{product.price}</span>
              </div>
            </article>
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

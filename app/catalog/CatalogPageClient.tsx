"use client";

import { useEffect, useId, useState } from "react";

import type { CatalogProduct, CatalogProductsProps } from "@/lib/catalog-product";
import { dispatchOpenContactModal } from "@/lib/contact-modal";

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
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 md:p-8"
      style={{ backgroundColor: "rgba(0,0,0,0.82)", backdropFilter: "blur(8px)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Закрыть"
        className="absolute top-5 right-5 z-[95] min-h-[44px] min-w-[44px] flex items-center justify-center rounded-full bg-black/50 border border-white/20 text-white/70 hover:text-white hover:bg-white/10 transition-all"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path
            d="M3 3L13 13M13 3L3 13"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>
      </button>

      <div
        className="w-full max-w-5xl max-h-[90vh] overflow-y-auto overflow-x-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
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
                <h3
                  id={titleId}
                  className="text-white font-bold text-2xl leading-snug truncate drop-shadow-sm"
                >
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
                  onClick={onClose}
                >
                  Подробнее
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center min-h-[44px] px-5 py-2.5 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 active:scale-95 transition-all duration-200 whitespace-nowrap"
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
    <div className="bg-[#111111] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-white text-3xl font-bold tracking-tight mb-2">
          Каталог товаров
        </h1>
        <p className="text-zinc-400 text-sm mb-10">
          {products.length} моделей питбайков в наличии
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((product) => (
            <button
              key={product.id}
              onClick={() => openModal(product)}
              className="group text-left bg-zinc-800/70 border border-white/5 rounded-xl overflow-hidden hover:border-white/20 hover:bg-zinc-800 hover:scale-[1.02] hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              <div className="h-44 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-200"
                />
              </div>

              <div className="p-4 flex flex-col gap-1.5">
                <h3 className="text-white font-semibold text-sm leading-snug line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-zinc-500 text-xs leading-relaxed line-clamp-2">
                  {product.description}
                </p>
                <span className="text-orange-400 font-bold text-base mt-1">
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

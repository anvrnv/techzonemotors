"use client";

import { useState } from "react";

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
  return (
    <div
      className="fixed inset-0 z-[90] flex items-center justify-center p-4 md:p-8"
      style={{ backgroundColor: "rgba(0,0,0,0.82)", backdropFilter: "blur(8px)" }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <button
        onClick={onClose}
        aria-label="Закрыть"
        className="absolute top-5 right-5 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 border border-white/20 text-white/70 hover:text-white hover:bg-white/10 transition-all"
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
        className="w-full max-w-5xl rounded-2xl overflow-hidden flex flex-col shadow-2xl"
        style={{ height: "min(80vh, 700px)" }}
      >
        <div className="flex-none" style={{ height: "72%" }}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover brightness-110"
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
                onClick={onClose}
              >
                Подробнее
              </button>
              <button
                className="px-5 py-2 rounded-full bg-white text-black text-sm font-semibold hover:bg-white/90 active:scale-95 transition-all duration-200 whitespace-nowrap"
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

"use client";

import { useState } from "react";

import { dispatchOpenContactModal } from "@/lib/contact-modal";
import type { SvoCatalogProduct } from "@/lib/svo-products";

function SvoBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-700/30 border border-green-600/40 text-green-400 text-[10px] font-bold tracking-wider uppercase">
      СВО
    </span>
  );
}

function PriceBlock({
  priceRegular,
  priceDiscount,
  large = false,
}: {
  priceRegular: string;
  priceDiscount: string;
  large?: boolean;
}) {
  return (
    <div className={`flex items-center gap-2 flex-wrap ${large ? "" : "mt-1"}`}>
      <span
        className={`text-zinc-500 line-through ${large ? "text-lg" : "text-xs"}`}
      >
        {priceRegular}
      </span>
      <span
        className={`text-green-400 font-bold ${large ? "text-2xl" : "text-base"}`}
      >
        {priceDiscount}
      </span>
    </div>
  );
}

function ProductModal({
  product,
  onClose,
  onBuyClick,
}: {
  product: SvoCatalogProduct;
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
        <div className="flex-none relative" style={{ height: "72%" }}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover brightness-110"
          />
          <div className="absolute top-4 left-4">
            <SvoBadge />
          </div>
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
            <div className="flex items-center gap-3 shrink-0 flex-wrap justify-end">
              <PriceBlock
                priceRegular={product.priceRegular}
                priceDiscount={product.priceDiscount}
                large
              />
              <button
                className="px-5 py-2 rounded-full border border-white text-white text-sm font-medium hover:bg-white hover:text-black transition-all duration-200 whitespace-nowrap"
                onClick={onClose}
              >
                Подробнее
              </button>
              <button
                className="px-5 py-2 rounded-full bg-green-500 text-white text-sm font-semibold hover:bg-green-400 active:scale-95 transition-all duration-200 whitespace-nowrap"
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

export default function SvoPageClient({
  products,
}: {
  products: SvoCatalogProduct[];
}) {
  const [selected, setSelected] = useState<SvoCatalogProduct | null>(null);

  const openModal = (product: SvoCatalogProduct) => setSelected(product);
  const closeModal = () => setSelected(null);
  const openContactModal = () => {
    closeModal();
    dispatchOpenContactModal();
  };

  return (
    <div className="bg-[#111111] min-h-screen">
      <div className="w-full bg-gradient-to-r from-green-900/40 via-[#111111] to-[#111111] border-b border-green-800/30">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <SvoBadge />
              <span className="text-zinc-500 text-xs">Специальные условия</span>
            </div>
            <h1 className="text-white text-3xl font-bold tracking-tight mb-1">
              Техника для СВО
            </h1>
            <p className="text-zinc-400 text-sm max-w-xl">
              Специальные цены для участников специальной военной операции.
              Скидка <span className="text-green-400 font-semibold">12%</span> на
              весь ассортимент при предъявлении соответствующих документов.
            </p>
          </div>
          <button
            onClick={() => dispatchOpenContactModal()}
            className="shrink-0 px-6 py-3 rounded-full bg-green-600 hover:bg-green-500 text-white text-sm font-semibold transition-all active:scale-95"
          >
            Узнать подробнее
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-12">
        <p className="text-zinc-500 text-sm mb-8">
          {products.length} моделей со скидкой для участников СВО
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products.map((product) => (
            <button
              key={product.id}
              onClick={() => openModal(product)}
              className="group text-left bg-zinc-800/70 border border-white/5 rounded-xl overflow-hidden hover:border-green-700/40 hover:bg-zinc-800 hover:scale-[1.02] hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-700/40"
            >
              <div className="h-44 overflow-hidden relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-200"
                />
                <div className="absolute top-2 left-2">
                  <SvoBadge />
                </div>
              </div>

              <div className="p-4 flex flex-col gap-1">
                <h3 className="text-white font-semibold text-sm leading-snug line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-zinc-500 text-xs leading-relaxed line-clamp-2">
                  {product.description}
                </p>
                <PriceBlock
                  priceRegular={product.priceRegular}
                  priceDiscount={product.priceDiscount}
                />
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

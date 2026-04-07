"use client";

import { useState } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  discountPrice: string;
  image: string;
}

const svoProducts: Product[] = [
  {
    id: 1,
    name: "Питбайк Kayo TT140",
    description: "Мощный питбайк для трека и бездорожья. Двигатель 140cc с воздушным охлаждением.",
    price: "89 990 ₽",
    discountPrice: "78 990 ₽",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=900&q=85",
  },
  {
    id: 2,
    name: "Питбайк Apollo RFZ 125",
    description: "Классический питбайк с надёжной рамой. Идеален для начинающих гонщиков.",
    price: "64 990 ₽",
    discountPrice: "56 990 ₽",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=900&q=85",
  },
  {
    id: 3,
    name: "Питбайк BSE J1 140",
    description: "Спортивный питбайк с улучшенной подвеской. Подходит для соревнований и тренировок.",
    price: "79 990 ₽",
    discountPrice: "70 990 ₽",
    image: "https://images.unsplash.com/photo-1558981359-219d6364c9c8?w=900&q=85",
  },
  {
    id: 4,
    name: "Питбайк Motoland FX 125",
    description: "Лёгкий и маневренный питбайк для городских трасс. Отличное соотношение цены и качества.",
    price: "57 990 ₽",
    discountPrice: "50 990 ₽",
    image: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=900&q=85",
  },
  {
    id: 5,
    name: "Питбайк Kayo K2 160",
    description: "Флагманская модель с двигателем 160cc. Максимальная мощность для опытных гонщиков.",
    price: "109 990 ₽",
    discountPrice: "96 990 ₽",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85",
  },
  {
    id: 6,
    name: "Питбайк Geon X-Road 125",
    description: "Универсальный питбайк для езды по любым дорогам. Надёжный и долговечный.",
    price: "67 990 ₽",
    discountPrice: "59 990 ₽",
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=900&q=85",
  },
  {
    id: 7,
    name: "Питбайк BSE S2 140",
    description: "Стильный питбайк с хромированными деталями. Привлекает взгляды на любом треке.",
    price: "84 990 ₽",
    discountPrice: "74 990 ₽",
    image: "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?w=900&q=85",
  },
  {
    id: 8,
    name: "Питбайк Kayo AU160",
    description: "Автоматическая коробка передач — идеален для новичков и подростков.",
    price: "87 990 ₽",
    discountPrice: "77 990 ₽",
    image: "https://images.unsplash.com/photo-1525160354320-d8e92641b563?w=900&q=85",
  },
  {
    id: 9,
    name: "Питбайк Apollo DB-X18",
    description: "Классический дизайн с современной начинкой. Для любителей стиля и скорости.",
    price: "69 990 ₽",
    discountPrice: "61 990 ₽",
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=900&q=85",
  },
  {
    id: 10,
    name: "Питбайк BSE Z5 125",
    description: "Компактный питбайк с современным дизайном. Подходит для детей и подростков.",
    price: "54 990 ₽",
    discountPrice: "47 990 ₽",
    image: "https://images.unsplash.com/photo-1558981285-6f0c8a05b7ed?w=900&q=85",
  },
  {
    id: 11,
    name: "Питбайк Kayo K4 140",
    description: "Обновлённая модель с усиленной рамой. Отличный выбор для мотокросса.",
    price: "94 990 ₽",
    discountPrice: "83 990 ₽",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=900&q=80",
  },
  {
    id: 12,
    name: "Питбайк Geon Dakar 140",
    description: "Эндуро-стиль с мощным двигателем. Покоряет любое бездорожье.",
    price: "81 990 ₽",
    discountPrice: "71 990 ₽",
    image: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=900&q=80",
  },
  {
    id: 13,
    name: "Питбайк Motoland PB140",
    description: "Спортивная модель с инвертированными вилками. Для продвинутых гонщиков.",
    price: "99 990 ₽",
    discountPrice: "87 990 ₽",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80",
  },
  {
    id: 14,
    name: "Питбайк BRZ X5 140",
    description: "Гидравлические тормоза и усиленная подвеска. Максимальный контроль на трассе.",
    price: "76 990 ₽",
    discountPrice: "67 990 ₽",
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=900&q=80",
  },
  {
    id: 15,
    name: "Питбайк Pit Pro 140",
    description: "Надёжный питбайк для начинающих. Прочная рама и проверенный двигатель.",
    price: "71 990 ₽",
    discountPrice: "63 990 ₽",
    image: "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?w=900&q=80",
  },
  {
    id: 16,
    name: "Питбайк Motoland X140",
    description: "Питбайк с улучшенными тормозами и широкими покрышками. Высокая надёжность.",
    price: "77 990 ₽",
    discountPrice: "68 990 ₽",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=900&q=80",
  },
];

function SvoBadge() {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-700/30 border border-green-600/40 text-green-400 text-[10px] font-bold tracking-wider uppercase">
      СВО
    </span>
  );
}

function PriceBlock({
  price,
  discountPrice,
  large = false,
}: {
  price: string;
  discountPrice: string;
  large?: boolean;
}) {
  return (
    <div className={`flex items-center gap-2 flex-wrap ${large ? "" : "mt-1"}`}>
      <span
        className={`text-zinc-500 line-through ${large ? "text-lg" : "text-xs"}`}
      >
        {price}
      </span>
      <span
        className={`text-green-400 font-bold ${large ? "text-2xl" : "text-base"}`}
      >
        {discountPrice}
      </span>
      <span
        className={`bg-green-700/30 border border-green-600/40 text-green-400 rounded-full font-semibold ${
          large ? "text-xs px-2.5 py-0.5" : "text-[10px] px-2 py-0.5"
        }`}
      >
        −12%
      </span>
    </div>
  );
}

function ProductModal({
  product,
  onClose,
  onBuyClick,
}: {
  product: Product;
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
        {/* Image — 72% */}
        <div className="flex-none relative" style={{ height: "72%" }}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover brightness-110"
          />
          {/* СВО badge overlay */}
          <div className="absolute top-4 left-4">
            <SvoBadge />
          </div>
        </div>

        {/* Info — 28% */}
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
                price={product.price}
                discountPrice={product.discountPrice}
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

export default function SvoPage() {
  const [selected, setSelected] = useState<Product | null>(null);

  const openModal = (product: Product) => setSelected(product);
  const closeModal = () => setSelected(null);
  const openContactModal = () => {
    closeModal();
    window.dispatchEvent(new CustomEvent("open-contact-modal"));
  };

  return (
    <div className="bg-[#111111] min-h-screen">
      {/* Hero banner */}
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
            onClick={() =>
              window.dispatchEvent(new CustomEvent("open-contact-modal"))
            }
            className="shrink-0 px-6 py-3 rounded-full bg-green-600 hover:bg-green-500 text-white text-sm font-semibold transition-all active:scale-95"
          >
            Узнать подробнее
          </button>
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <p className="text-zinc-500 text-sm mb-8">
          {svoProducts.length} моделей со скидкой для участников СВО
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {svoProducts.map((product) => (
            <button
              key={product.id}
              onClick={() => openModal(product)}
              className="group text-left bg-zinc-800/70 border border-white/5 rounded-xl overflow-hidden hover:border-green-700/40 hover:bg-zinc-800 hover:scale-[1.02] hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-green-700/40"
            >
              {/* Image */}
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

              {/* Info */}
              <div className="p-4 flex flex-col gap-1">
                <h3 className="text-white font-semibold text-sm leading-snug line-clamp-1">
                  {product.name}
                </h3>
                <p className="text-zinc-500 text-xs leading-relaxed line-clamp-2">
                  {product.description}
                </p>
                <PriceBlock
                  price={product.price}
                  discountPrice={product.discountPrice}
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

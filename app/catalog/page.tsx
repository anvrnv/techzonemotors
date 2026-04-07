"use client";

import { useState } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

const catalogProducts: Product[] = [
  {
    id: 1,
    name: "Питбайк Kayo TT140",
    description: "Мощный питбайк для трека и бездорожья. Двигатель 140cc с воздушным охлаждением.",
    price: "89 990 ₽",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=900&q=85",
  },
  {
    id: 2,
    name: "Питбайк Apollo RFZ 125",
    description: "Классический питбайк с надёжной рамой. Идеален для начинающих гонщиков.",
    price: "64 990 ₽",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=900&q=85",
  },
  {
    id: 3,
    name: "Питбайк BSE J1 140",
    description: "Спортивный питбайк с улучшенной подвеской. Подходит для соревнований и тренировок.",
    price: "79 500 ₽",
    image: "https://images.unsplash.com/photo-1558981359-219d6364c9c8?w=900&q=85",
  },
  {
    id: 4,
    name: "Питбайк Motoland FX 125",
    description: "Лёгкий и маневренный питбайк для городских трасс. Отличное соотношение цены и качества.",
    price: "58 000 ₽",
    image: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=900&q=85",
  },
  {
    id: 5,
    name: "Питбайк Kayo K2 160",
    description: "Флагманская модель с двигателем 160cc. Максимальная мощность для опытных гонщиков.",
    price: "109 990 ₽",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85",
  },
  {
    id: 6,
    name: "Питбайк Geon X-Road 125",
    description: "Универсальный питбайк для езды по любым дорогам. Надёжный и долговечный.",
    price: "67 500 ₽",
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=900&q=85",
  },
  {
    id: 7,
    name: "Питбайк BSE S2 140",
    description: "Стильный питбайк с хромированными деталями. Привлекает взгляды на любом треке.",
    price: "85 000 ₽",
    image: "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?w=900&q=85",
  },
  {
    id: 8,
    name: "Питбайк Kayo AU160",
    description: "Автоматическая коробка передач — идеален для новичков и подростков.",
    price: "88 000 ₽",
    image: "https://images.unsplash.com/photo-1525160354320-d8e92641b563?w=900&q=85",
  },
  {
    id: 9,
    name: "Питбайк Apollo DB-X18",
    description: "Классический дизайн с современной начинкой. Для любителей стиля и скорости.",
    price: "69 990 ₽",
    image: "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=900&q=85",
  },
  {
    id: 10,
    name: "Питбайк BSE Z5 125",
    description: "Компактный питбайк с современным дизайном. Подходит для детей и подростков.",
    price: "55 500 ₽",
    image: "https://images.unsplash.com/photo-1558981285-6f0c8a05b7ed?w=900&q=85",
  },
  {
    id: 11,
    name: "Питбайк Kayo K4 140",
    description: "Обновлённая модель с усиленной рамой. Отличный выбор для мотокросса.",
    price: "94 990 ₽",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=900&q=80",
  },
  {
    id: 12,
    name: "Питбайк Geon Dakar 140",
    description: "Эндуро-стиль с мощным двигателем. Покоряет любое бездорожье.",
    price: "82 000 ₽",
    image: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=900&q=80",
  },
  {
    id: 13,
    name: "Питбайк Motoland PB140",
    description: "Спортивная модель с инвертированными вилками. Для продвинутых гонщиков.",
    price: "99 990 ₽",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80",
  },
  {
    id: 14,
    name: "Питбайк BRZ X5 140",
    description: "Гидравлические тормоза и усиленная подвеска. Максимальный контроль на трассе.",
    price: "76 500 ₽",
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=900&q=80",
  },
  {
    id: 15,
    name: "Питбайк Pit Pro 140",
    description: "Надёжный питбайк для начинающих. Прочная рама и проверенный двигатель.",
    price: "72 000 ₽",
    image: "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?w=900&q=80",
  },
  {
    id: 16,
    name: "Питбайк Motoland X140",
    description: "Питбайк с улучшенными тормозами и широкими покрышками. Высокая надёжность.",
    price: "78 000 ₽",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=900&q=80",
  },
];

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
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        aria-label="Закрыть"
        className="absolute top-5 right-5 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/50 border border-white/20 text-white/70 hover:text-white hover:bg-white/10 transition-all"
      >
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 3L13 13M13 3L3 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </button>

      {/* Card — mirrors carousel style exactly */}
      <div
        className="w-full max-w-5xl rounded-2xl overflow-hidden flex flex-col shadow-2xl"
        style={{ height: "min(80vh, 700px)" }}
      >
        {/* Image — top 72% */}
        <div className="flex-none" style={{ height: "72%" }}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover brightness-110"
          />
        </div>

        {/* Info — bottom 28% */}
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
                onClick={() => { onClose(); onBuyClick(); }}
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

export default function CatalogPage() {
  const [selected, setSelected] = useState<Product | null>(null);

  const openModal = (product: Product) => setSelected(product);
  const closeModal = () => setSelected(null);
  const openContactModal = () => {
    closeModal();
    window.dispatchEvent(new CustomEvent("open-contact-modal"));
  };

  return (
    <div className="bg-[#111111] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-white text-3xl font-bold tracking-tight mb-2">
          Каталог товаров
        </h1>
        <p className="text-zinc-400 text-sm mb-10">
          {catalogProducts.length} моделей питбайков в наличии
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {catalogProducts.map((product) => (
            <button
              key={product.id}
              onClick={() => openModal(product)}
              className="group text-left bg-zinc-800/70 border border-white/5 rounded-xl overflow-hidden hover:border-white/20 hover:bg-zinc-800 hover:scale-[1.02] hover:shadow-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-white/20"
            >
              {/* Card image */}
              <div className="h-44 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-200"
                />
              </div>

              {/* Card info */}
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

"use client";

import { useState } from "react";

interface ProductCarouselProps {
  onBuyClick?: () => void;
}

const products = [
  {
    id: 1,
    name: "Питбайк Kayo TT140",
    description: "Мощный питбайк для трека и бездорожья. Двигатель 140cc с воздушным охлаждением.",
    price: "89 990 ₽",
    image: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=1200&q=85",
  },
  {
    id: 2,
    name: "Питбайк Apollo RFZ 125",
    description: "Классический питбайк с надёжной рамой. Идеален для начинающих гонщиков.",
    price: "64 990 ₽",
    image: "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=1200&q=85",
  },
  {
    id: 3,
    name: "Питбайк BSE J1 140",
    description: "Спортивный питбайк с улучшенной подвеской. Подходит для соревнований и тренировок.",
    price: "79 500 ₽",
    image: "https://images.unsplash.com/photo-1558981359-219d6364c9c8?w=1200&q=85",
  },
  {
    id: 4,
    name: "Питбайк Motoland FX 125",
    description: "Лёгкий и маневренный питбайк для городских трасс. Отличное соотношение цены и качества.",
    price: "58 000 ₽",
    image: "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=1200&q=85",
  },
  {
    id: 5,
    name: "Питбайк Kayo K2 160",
    description: "Флагманская модель с двигателем 160cc. Максимальная мощность для опытных гонщиков.",
    price: "109 990 ₽",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=85",
  },
  {
    id: 6,
    name: "Питбайк Geon X-Road 125",
    description: "Универсальный питбайк для езды по любым дорогам. Надёжный и долговечный.",
    price: "67 500 ₽",
    image: "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=1200&q=85",
  },
  {
    id: 7,
    name: "Питбайк BSE S2 140",
    description: "Стильный питбайк с хромированными деталями. Привлекает взгляды на любом треке.",
    price: "85 000 ₽",
    image: "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?w=1200&q=85",
  },
];

export default function ProductCarousel({ onBuyClick }: ProductCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fading, setFading] = useState(false);

  const navigate = (index: number) => {
    setFading(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setFading(false);
    }, 150);
  };

  const prev = () => navigate((currentIndex - 1 + products.length) % products.length);
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
        {/* Prev button */}
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

        {/* Card */}
        <div
          className="w-full max-w-6xl mx-auto px-8 md:px-16 h-full min-h-0"
          style={{
            opacity: fading ? 0 : 1,
            transition: "opacity 0.15s ease",
          }}
        >
          <div className="rounded-2xl overflow-hidden h-full flex flex-col shadow-2xl">
            {/* Image — top 72% */}
            <div className="flex-none" style={{ height: "72%" }}>
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
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

        {/* Next button */}
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

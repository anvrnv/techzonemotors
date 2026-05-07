"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import ReviewsGrid from "./components/ReviewsGrid";
import Footer from "./components/Footer";
import type { CatalogProductsProps } from "@/lib/catalog-product";
import { DEFAULT_CATALOG_IMAGE_URL } from "@/lib/catalog-product";
import type { ReviewData } from "@/lib/reviews";
import { dispatchOpenContactModal } from "@/lib/contact-modal";

type HomeClientProps = CatalogProductsProps & {
  reviews: (ReviewData | null)[];
};

export default function HomeClient({ products, reviews }: HomeClientProps) {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sections = containerRef.current?.querySelectorAll<HTMLElement>(".fade-in-section");
    if (!sections || sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1 }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="flex flex-col bg-background">
      {/* ── 1. Hero ─────────────────────────────────────────── */}
      <div className="hero-container mx-4 mt-6 sm:mx-6 lg:mx-8">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-14">
          <div className="flex flex-col gap-8 md:flex-row md:items-center md:gap-12">
            {/* Left: text + CTAs */}
            <div className="flex flex-1 flex-col gap-6">
              <div className="flex flex-col gap-3">
                <h1 className="text-4xl font-bold leading-tight tracking-tight text-foreground md:text-5xl lg:text-[clamp(34px,4vw,56px)]">
                  Техника для активного отдыха
                </h1>
                <p className="text-base leading-relaxed text-[var(--color-text-secondary)] md:text-lg">
                  Питбайки, эндуро и мотовездеходы — подберём под рост, опыт и
                  бюджет
                </p>
              </div>

              {/* Trust points */}
              <div className="flex flex-wrap gap-4">
                <span className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                    className="shrink-0 text-[var(--color-primary)]"
                  >
                    <circle
                      cx="8"
                      cy="8"
                      r="7"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M5 8l2 2 4-4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  Техника в наличии
                </span>
                <span className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                    className="shrink-0 text-[var(--color-primary)]"
                  >
                    <path
                      d="M13 2H3a1 1 0 00-1 1v8a1 1 0 001 1h4l2 2 2-2h2a1 1 0 001-1V3a1 1 0 00-1-1z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M5 6h6M5 9h4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                  Консультация перед покупкой
                </span>
                <span className="flex items-center gap-2 text-sm text-[var(--color-text-secondary)]">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    aria-hidden="true"
                    className="shrink-0 text-[var(--color-primary)]"
                  >
                    <rect
                      x="1"
                      y="5"
                      width="9"
                      height="7"
                      rx="1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                    <path
                      d="M10 7.5h3l2 2.75V12h-5V7.5z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinejoin="round"
                    />
                    <circle cx="3.5" cy="13" r="1.25" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="12" cy="13" r="1.25" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                  Доставка по России
                </span>
              </div>

              {/* CTA buttons */}
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <button
                  type="button"
                  className="btn-primary w-full sm:w-auto"
                  onClick={() => dispatchOpenContactModal()}
                >
                  Оставить заявку
                </button>
                <button
                  type="button"
                  className="btn-secondary w-full sm:w-auto"
                  onClick={() => router.push("/catalog")}
                >
                  Смотреть каталог
                </button>
              </div>
            </div>

            {/* Right: hero image */}
            <div className="product-media hidden w-full sm:flex md:w-[45%] md:max-w-[480px] md:shrink-0">
              <img
                src={products[0]?.image ?? DEFAULT_CATALOG_IMAGE_URL}
                alt={products[0]?.name ?? "Техника"}
                className="max-h-full max-w-full object-contain"
                width={480}
                height={360}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. Popular Models ───────────────────────────────── */}
      {products.length > 0 && (
        <div className="fade-in-section page-shell section-block">
          <h2 className="section-heading mb-8">Популярные модели</h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.slice(0, 6).map((product) => (
              <article
                key={product.id}
                className="flex flex-col overflow-hidden rounded-[24px] border border-border/80 bg-card shadow-[var(--shadow-sm)] transition-all duration-[260ms] hover:-translate-y-[3px] hover:shadow-[var(--shadow-md)]"
              >
                <div className="product-media">
                  <img
                    src={product.image}
                    alt=""
                    role="presentation"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <div className="flex flex-col gap-2 border-t border-border-faint px-4 py-4">
                  <h3 className="line-clamp-2 text-base font-bold leading-snug text-foreground">
                    {product.name}
                  </h3>
                  <span className="text-lg font-bold text-accent">
                    {product.price}
                  </span>
                  <button
                    type="button"
                    className="btn-primary mt-1 w-full"
                    onClick={() => dispatchOpenContactModal()}
                  >
                    Оставить заявку
                  </button>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              className="btn-secondary"
              onClick={() => router.push("/catalog")}
            >
              Смотреть весь каталог
            </button>
          </div>
        </div>
      )}

      {/* ── 3. Trust / Benefits ─────────────────────────────── */}
      <div className="fade-in-section page-shell section-block">
        <div
          className="rounded-[var(--r-xl)] bg-[var(--color-primary-soft)] px-6 py-10 md:px-10 md:py-12"
        >
          <h2 className="section-heading mb-8 text-center">
            Почему нам доверяют
          </h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
            {/* Tile 1 */}
            <div className="flex flex-col gap-3 rounded-[var(--r-lg)] bg-card px-4 py-5 shadow-[var(--shadow-xs)]">
              <span className="text-[var(--color-primary)]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    cx="12"
                    cy="8"
                    r="4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M4 20c0-4 3.6-7 8-7s8 3 8 7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <p className="text-sm font-semibold leading-snug text-foreground">
                Помогаем подобрать под рост и опыт
              </p>
              <p className="text-xs leading-relaxed text-[var(--color-text-muted)]">
                Учтём рост, вес и уровень подготовки
              </p>
            </div>
            {/* Tile 2 */}
            <div className="flex flex-col gap-3 rounded-[var(--r-lg)] bg-card px-4 py-5 shadow-[var(--shadow-xs)]">
              <span className="text-[var(--color-primary)]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M8 12l3 3 5-5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <p className="text-sm font-semibold leading-snug text-foreground">
                Техника в наличии
              </p>
              <p className="text-xs leading-relaxed text-[var(--color-text-muted)]">
                Приезжайте смотреть и тест-драйвить
              </p>
            </div>
            {/* Tile 3 */}
            <div className="flex flex-col gap-3 rounded-[var(--r-lg)] bg-card px-4 py-5 shadow-[var(--shadow-xs)]">
              <span className="text-[var(--color-primary)]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M20 2H4a1 1 0 00-1 1v13a1 1 0 001 1h6l3 3 3-3h4a1 1 0 001-1V3a1 1 0 00-1-1z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M7 9h10M7 13h7"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <p className="text-sm font-semibold leading-snug text-foreground">
                Консультация перед покупкой
              </p>
              <p className="text-xs leading-relaxed text-[var(--color-text-muted)]">
                Подберём лучший вариант под ваш бюджет
              </p>
            </div>
            {/* Tile 4 */}
            <div className="flex flex-col gap-3 rounded-[var(--r-lg)] bg-card px-4 py-5 shadow-[var(--shadow-xs)]">
              <span className="text-[var(--color-primary)]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <rect
                    x="1"
                    y="7"
                    width="15"
                    height="12"
                    rx="1"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M16 11h4l3 4v4h-7V11z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="5.5"
                    cy="20.5"
                    r="1.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="18.5"
                    cy="20.5"
                    r="1.5"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </span>
              <p className="text-sm font-semibold leading-snug text-foreground">
                Доставка / самовывоз
              </p>
              <p className="text-xs leading-relaxed text-[var(--color-text-muted)]">
                Доставим по России или заберите сами
              </p>
            </div>
            {/* Tile 5 */}
            <div className="flex flex-col gap-3 rounded-[var(--r-lg)] bg-card px-4 py-5 shadow-[var(--shadow-xs)]">
              <span className="text-[var(--color-primary)]">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M12 21C12 21 3 14.5 3 8.5a5 5 0 019-3 5 5 0 019 3c0 6-9 12.5-9 12.5z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
              <p className="text-sm font-semibold leading-snug text-foreground">
                Поддержка после покупки
              </p>
              <p className="text-xs leading-relaxed text-[var(--color-text-muted)]">
                Всегда на связи, поможем с вопросами
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── 4. Reviews ──────────────────────────────────────── */}
      <div className="fade-in-section">
        <ReviewsGrid reviews={reviews} />
      </div>

      {/* ── 5. Final CTA ────────────────────────────────────── */}
      <div className="fade-in-section page-shell section-block">
        <div className="flex flex-col items-center gap-5 rounded-[var(--r-2xl)] bg-[var(--color-primary-soft)] px-6 py-12 text-center md:px-12">
          <h2 className="section-heading">Готовы выбрать технику?</h2>
          <p className="max-w-md text-base leading-relaxed text-[var(--color-text-secondary)]">
            Поможем подобрать под рост, опыт и бюджет
          </p>
          <button
            type="button"
            className="btn-primary"
            onClick={() => dispatchOpenContactModal()}
          >
            Оставить заявку
          </button>
        </div>
      </div>

      {/* ── 6. Footer ───────────────────────────────────────── */}
      <Footer />
    </div>
  );
}

"use client";

import { useEffect, useId, useRef, useState } from "react";

import type { CatalogProduct, CatalogProductsProps } from "@/lib/catalog-product";
import { dispatchOpenContactModal } from "@/lib/contact-modal";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import Tabs from "@/app/components/Tabs";

const catalogCardShell =
  "group flex min-h-[300px] flex-col overflow-hidden rounded-[24px] border border-border/80 bg-card text-left shadow-[var(--shadow-md)] transition-all duration-300 ease-out hover:-translate-y-[3px] hover:border-border-strong hover:bg-card-raised hover:shadow-[var(--shadow-lg)] focus-within:ring-2 focus-within:ring-ring/40 focus-within:ring-offset-2 focus-within:ring-offset-background";

function ProductCardSkeleton() {
  return (
    <div className="flex min-h-[300px] flex-col overflow-hidden rounded-[24px] border border-border/80 bg-card shadow-[var(--shadow-xs)] animate-pulse">
      <div className="flex-[7] basis-0 bg-[var(--color-border)]" />
      <div className="flex flex-[3] basis-0 flex-col gap-2 border-t border-border-faint px-4 py-3.5">
        <div className="h-4 w-3/4 rounded bg-[var(--color-border)]" />
        <div className="h-3 w-full rounded bg-[var(--color-border-faint)]" />
        <div className="h-5 w-1/3 rounded bg-[var(--color-border)] mt-1" />
      </div>
    </div>
  );
}

function ProductModal({
  product,
  onClose,
  onBuyClick,
  triggerRef,
}: {
  product: CatalogProduct;
  onClose: () => void;
  onBuyClick: () => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
}) {
  const titleId = useId();
  const tabPanelBaseId = useId();
  const [activeTab, setActiveTab] = useState("description");
  const dialogRef = useRef<HTMLDivElement>(null);

  const FOCUSABLE =
    'a[href]:not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"]), ' +
    'input:not([disabled]):not([tabindex="-1"]), select:not([disabled]):not([tabindex="-1"]), ' +
    'textarea:not([disabled]):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])';

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onClose]);

  useEffect(() => {
    const first = dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE);
    first?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const trapFocus = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const el = dialogRef.current;
      if (!el) return;
      const focusable = Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", trapFocus);
    return () => document.removeEventListener("keydown", trapFocus);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClose = () => {
    onClose();
    triggerRef?.current?.focus();
  };

  const tabs = [
    { id: "description", label: "Описание" },
    { id: "delivery", label: "Доставка" },
    { id: "warranty", label: "Гарантия" },
  ];

  const tabContent: Record<string, React.ReactNode> = {
    description: (
      <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
        {product.description || "Описание уточняйте у менеджера."}
      </p>
    ),
    delivery: (
      <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
        Доставка по России. Уточните сроки у менеджера.
      </p>
    ),
    warranty: (
      <p className="text-sm leading-relaxed text-[var(--color-text-secondary)]">
        Гарантия на всю технику. Поддержка после покупки.
      </p>
    ),
  };

  return (
    <div
      className="fixed inset-0 z-[90] flex items-end justify-center bg-overlay-scrim-strong p-0 sm:items-center sm:p-4 md:p-8 backdrop-blur-[8px]"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative max-h-[95vh] w-full max-w-3xl overflow-y-auto overflow-x-hidden rounded-t-[24px] bg-card shadow-[var(--shadow-lg)] sm:rounded-[24px]"
      >
        <button
          type="button"
          onClick={handleClose}
          aria-label="Закрыть"
          className="absolute top-4 right-4 z-[95] flex min-h-[44px] min-w-[44px] items-center justify-center rounded-full border border-border/80 bg-card/90 text-foreground shadow-sm backdrop-blur-sm transition hover:bg-card-raised focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/60"
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

        {/* Image zone */}
        <div className="catalog-showroom-stage relative aspect-[3/2] w-full overflow-hidden">
          <div className="absolute inset-0 z-[2] flex items-center justify-center px-8 py-8">
            <img
              src={product.image}
              alt={product.name}
              className="catalog-showroom-product-shadow relative z-[2] max-h-full max-w-full object-contain"
            />
          </div>
          <div
            className="pointer-events-none absolute inset-0 z-[3] bg-gradient-to-t from-black/25 via-transparent to-black/8"
            aria-hidden
          />
        </div>

        {/* Content zone */}
        <div className="flex flex-col gap-4 p-5 md:p-6">
          {/* Title + price */}
          <div className="flex items-start justify-between gap-4">
            <h3
              id={titleId}
              className="text-xl font-bold leading-snug text-foreground md:text-2xl"
            >
              {product.name}
            </h3>
            <span className="shrink-0 text-xl font-bold text-accent">
              {product.price}
            </span>
          </div>

          {/* Tabs */}
          <Tabs tabs={tabs} activeId={activeTab} onChange={setActiveTab} idPrefix={tabPanelBaseId} />
          <div
            id={`${tabPanelBaseId}-panel-${activeTab}`}
            role="tabpanel"
            tabIndex={0}
            aria-labelledby={`${tabPanelBaseId}-tab-${activeTab}`}
            className="min-h-[60px]"
          >
            {tabContent[activeTab]}
          </div>

          {/* Trust block */}
          <div className="flex flex-col gap-1.5 rounded-[var(--r-md)] bg-[var(--color-primary-soft)] px-4 py-3">
            {[
              {
                icon: (
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M5 8l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
                text: "Консультация бесплатна",
              },
              {
                icon: (
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M8 5v3.5l2 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                ),
                text: "Ответим в течение 15 минут",
              },
              {
                icon: (
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <rect x="1" y="5" width="9" height="7" rx="1" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M10 7.5h3l2 2.75V12h-5V7.5z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
                    <circle cx="3.5" cy="13" r="1.25" stroke="currentColor" strokeWidth="1.5" />
                    <circle cx="12" cy="13" r="1.25" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                ),
                text: "Доставка по России",
              },
            ].map(({ icon, text }) => (
              <p
                key={text}
                className="flex items-center gap-2 text-xs text-[var(--color-text-secondary)]"
              >
                <span className="shrink-0 text-[var(--color-primary)]">{icon}</span>
                {text}
              </p>
            ))}
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              className="btn-primary flex-1"
              onClick={() => {
                handleClose();
                onBuyClick();
              }}
            >
              Оставить заявку
            </button>
            <button
              type="button"
              className="btn-ghost"
              onClick={handleClose}
            >
              Закрыть
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CatalogPageClient({ products }: CatalogProductsProps) {
  const [selected, setSelected] = useState<CatalogProduct | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const openModal = (product: CatalogProduct) => setSelected(product);
  const closeModal = () => setSelected(null);
  const openContactModal = () => {
    dispatchOpenContactModal();
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="page-shell section-block">
        <Breadcrumbs
          items={[{ label: "Главная", href: "/" }, { label: "Каталог товаров" }]}
        />
        <h1 className="section-heading mt-4">Каталог товаров</h1>
        <p className="section-intro mb-12 md:mb-14">
          {products.length} моделей питбайков в наличии
        </p>

        {products.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-6 py-20 text-center">
            <svg
              width="56"
              height="56"
              viewBox="0 0 56 56"
              fill="none"
              aria-hidden="true"
              className="text-[var(--color-text-muted)]"
            >
              <rect
                x="8"
                y="14"
                width="40"
                height="32"
                rx="3"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path
                d="M8 22h40"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M20 14v-4a8 8 0 0116 0v4"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <circle cx="22" cy="34" r="3" stroke="currentColor" strokeWidth="2" />
              <circle cx="34" cy="34" r="3" stroke="currentColor" strokeWidth="2" />
            </svg>
            <div>
              <p className="text-xl font-semibold text-foreground">
                Товары скоро появятся
              </p>
              <p className="mt-1 text-sm text-[var(--color-text-muted)]">
                Мы пополняем каталог. Оставьте заявку и мы подберём технику для
                вас.
              </p>
            </div>
            <button
              type="button"
              className="btn-primary"
              onClick={() => dispatchOpenContactModal()}
            >
              Оставить заявку
            </button>
          </div>
        ) : (
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
                      className="btn-primary w-full shrink-0 sm:w-auto"
                      onClick={() => dispatchOpenContactModal()}
                    >
                      Оставить заявку
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center justify-center min-h-[44px] rounded-full border border-white/35 bg-white/0 px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 shrink-0 self-center sm:self-auto"
                      onClick={(e) => {
                        triggerRef.current = e.currentTarget;
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
                  <span className="mt-0.5 text-lg font-bold text-accent sm:text-xl">
                    {product.price}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>

      {selected && (
        <ProductModal
          product={selected}
          onClose={closeModal}
          onBuyClick={openContactModal}
          triggerRef={triggerRef}
        />
      )}
    </div>
  );
}

"use client";

import { useRef, useState } from "react";

import type { CatalogProduct, CatalogProductsProps } from "@/lib/catalog-product";
import { dispatchOpenContactModal } from "@/lib/contact-modal";
import Breadcrumbs from "@/app/components/Breadcrumbs";
import ProductModal from "@/app/components/ProductModal";

const catalogCardShell =
  "group flex min-h-[300px] flex-col overflow-hidden rounded-[24px] border border-border/80 bg-card text-left shadow-[var(--shadow-md)] transition-all duration-[260ms] ease-out hover:-translate-y-[3px] hover:border-border-strong hover:bg-card-raised hover:shadow-[var(--shadow-lg)] focus-within:ring-2 focus-within:ring-ring/40 focus-within:ring-offset-2 focus-within:ring-offset-background";

// used for client-side loading states
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
                      className="catalog-showroom-product-shadow relative z-[2] max-h-[min(11rem,46vw)] w-full max-w-full object-contain brightness-[0.96] contrast-[1.06] transition duration-[260ms] group-hover:brightness-[1] sm:max-h-[13rem]"
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
                      className="btn-ghost shrink-0 self-center border border-white/35 !text-white hover:!bg-white/10 sm:self-auto"
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
          isOpen={true}
          onClose={closeModal}
          onBuyClick={openContactModal}
          triggerRef={triggerRef}
        />
      )}
    </div>
  );
}

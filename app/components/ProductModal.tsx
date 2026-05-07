"use client";

import { useEffect, useId, useRef, useState } from "react";

import type { CatalogProduct } from "@/lib/catalog-product";
import Tabs from "@/app/components/Tabs";

export interface ProductModalProps {
  product: CatalogProduct;
  isOpen: boolean;
  onClose: () => void;
  onBuyClick: () => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

const FOCUSABLE =
  'a[href]:not([tabindex="-1"]), button:not([disabled]):not([tabindex="-1"]), ' +
  'input:not([disabled]):not([tabindex="-1"]), select:not([disabled]):not([tabindex="-1"]), ' +
  'textarea:not([disabled]):not([tabindex="-1"]), [tabindex]:not([tabindex="-1"])';

export default function ProductModal({
  product,
  isOpen,
  onClose,
  onBuyClick,
  triggerRef,
}: ProductModalProps) {
  const titleId = useId();
  const tabPanelBaseId = useId();
  const [activeTab, setActiveTab] = useState("description");
  const dialogRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const first = dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE);
    first?.focus();
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const trapFocus = (e: KeyboardEvent) => {
      if (e.key !== "Tab") return;
      const el = dialogRef.current;
      if (!el) return;
      const focusable = Array.from(el.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) { e.preventDefault(); last.focus(); }
      } else {
        if (document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", trapFocus);
    return () => document.removeEventListener("keydown", trapFocus);
  }, [isOpen]);

  if (!isOpen) return null;

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
      className="modal-overlay-enter fixed inset-0 z-[90] flex items-end justify-center bg-overlay-scrim-strong p-0 sm:items-center sm:p-4 md:p-8 backdrop-blur-[8px]"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="modal-content-enter relative max-h-[90dvh] w-full max-w-3xl overflow-y-auto overflow-x-hidden rounded-t-[24px] bg-card shadow-[var(--shadow-lg)] sm:rounded-[24px]"
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

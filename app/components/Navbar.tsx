"use client";

import Link from "next/link";
import { useState } from "react";

import { dispatchOpenContactModal } from "@/lib/contact-modal";

const CTA_LABEL = "Подобрать технику";

const openContact = () => dispatchOpenContactModal();

const linkClass =
  "rounded-lg px-3 py-1.5 text-[13px] font-medium tracking-wide text-foreground-muted transition-colors duration-150 hover:bg-card-muted/80 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/35 whitespace-nowrap";

const mobileLinkClass =
  "rounded-lg px-3 py-2.5 text-sm font-medium text-foreground-muted transition-colors hover:bg-card-muted/80 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/35";

const primaryBtnDesktop =
  "inline-flex shrink-0 items-center justify-center rounded-full bg-primary px-4 py-2 text-[13px] font-semibold text-primary-foreground shadow-sm transition-all duration-150 hover:bg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/55 active:scale-[0.98]";

const primaryBtnMobileBar =
  "inline-flex min-h-9 max-w-[min(11rem,calc(100vw-8.5rem))] min-w-0 shrink items-center justify-center truncate rounded-full bg-primary px-2.5 py-1.5 text-[11px] font-semibold leading-tight text-primary-foreground shadow-sm transition-all duration-150 hover:bg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/55 active:scale-[0.98] sm:max-w-[13.5rem] sm:px-3 sm:text-xs";

const primaryBtnDrawer =
  "mt-1 w-full rounded-full bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:bg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/55";

function PhoneIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/60 bg-white/72 text-foreground shadow-[0_8px_32px_-12px_rgba(26,23,20,0.12)] backdrop-blur-xl supports-[backdrop-filter]:bg-white/58">
      <nav className="relative mx-auto flex h-14 max-w-7xl items-center gap-2 px-4 sm:gap-3 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2 rounded-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/45 sm:gap-2.5"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-border/80 bg-card text-[11px] font-bold tracking-tight text-foreground shadow-sm transition-colors group-hover:border-border-strong group-hover:bg-card-raised">
            TZ
          </div>
          <span className="hidden text-sm font-semibold tracking-tight text-foreground sm:inline">
            TechZone Motors
          </span>
        </Link>

        {/* Desktop — centered nav */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-0.5 md:flex">
          <li>
            <Link href="/" className={linkClass}>
              Главная
            </Link>
          </li>
          <li>
            <Link href="/catalog" className={linkClass}>
              Каталог товаров
            </Link>
          </li>
          <li>
            <Link href="/svo" className={linkClass}>
              Техника для СВО
            </Link>
          </li>
          <li>
            <Link href="/articles" className={`${linkClass} inline-block`}>
              Статьи
            </Link>
          </li>
        </ul>

        {/* Right cluster: phone + CTA + burger */}
        <div className="ml-auto flex min-w-0 items-center justify-end gap-2 sm:gap-3 md:gap-4">
          {/* Mobile — icon phone (secondary to CTA) */}
          <a
            href="tel:+79998414936"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border/70 bg-card/90 text-foreground-subtle shadow-sm transition-colors hover:border-border-strong hover:text-foreground-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/40 md:hidden"
            aria-label="Позвонить: +7 (999) 841-49-36"
          >
            <PhoneIcon />
          </a>

          <button
            type="button"
            onClick={openContact}
            title={CTA_LABEL}
            className={`${primaryBtnMobileBar} md:hidden`}
          >
            {CTA_LABEL}
          </button>

          {/* Desktop — muted phone + CTA */}
          <a
            href="tel:+79998414936"
            className="hidden text-[13px] font-normal tabular-nums tracking-wide text-foreground-subtle transition-colors hover:text-foreground-muted md:inline md:max-w-none"
          >
            +7 (999) 841-49-36
          </a>
          <button
            type="button"
            onClick={openContact}
            className={`${primaryBtnDesktop} hidden md:inline-flex`}
          >
            {CTA_LABEL}
          </button>

          <button
            type="button"
            className="flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-1.5 rounded-lg p-1.5 transition-colors hover:bg-card-muted/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/40 md:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
          >
            <span
              className={`block h-0.5 w-5 bg-foreground transition-all duration-200 ${mobileOpen ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-foreground transition-all duration-200 ${mobileOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-foreground transition-all duration-200 ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </nav>

      {mobileOpen ? (
        <div className="border-t border-border/60 bg-white/95 px-4 py-3 shadow-card backdrop-blur-xl md:hidden sm:px-6">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className={mobileLinkClass}
          >
            Главная
          </Link>
          <Link
            href="/catalog"
            onClick={() => setMobileOpen(false)}
            className={mobileLinkClass}
          >
            Каталог товаров
          </Link>
          <Link
            href="/svo"
            onClick={() => setMobileOpen(false)}
            className={mobileLinkClass}
          >
            Техника для СВО
          </Link>
          <Link
            href="/articles"
            onClick={() => setMobileOpen(false)}
            className={mobileLinkClass}
          >
            Статьи
          </Link>

          <a
            href="tel:+79998414936"
            className="mt-2 block rounded-lg px-3 py-2 text-sm text-foreground-subtle transition-colors hover:bg-card-muted/80 hover:text-foreground-muted"
          >
            +7 (999) 841-49-36
          </a>
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              openContact();
            }}
            className={primaryBtnDrawer}
          >
            {CTA_LABEL}
          </button>
        </div>
      ) : null}
    </header>
  );
}

"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { dispatchOpenContactModal } from "@/lib/contact-modal";
import Tooltip from "./Tooltip";

const CTA_LABEL = "Подобрать технику";

const linkClass =
  "rounded-lg px-3 py-1.5 text-[13px] font-medium tracking-wide text-foreground-muted transition-colors duration-[120ms] hover:bg-card-muted/80 hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/35 whitespace-nowrap";

const primaryBtnMobileBar =
  "btn-primary min-h-[44px] max-w-[min(11rem,calc(100vw-8.5rem))] min-w-0 shrink truncate text-[11px] leading-tight sm:max-w-[13.5rem] sm:text-xs";

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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.4 2 2 0 0 1 3.58 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [mobileOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-[#E2E8F0] bg-white/[0.88] text-foreground backdrop-blur-[16px] shadow-[0_4px_24px_-8px_rgba(15,23,20,0.08)]">
        <nav className="relative mx-auto flex h-16 max-w-7xl items-center gap-2 px-4 sm:gap-3 sm:px-6 md:h-[72px] lg:px-8">
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
            <li>
              <button type="button" onClick={() => dispatchOpenContactModal()} className={linkClass}>
                Контакты
              </button>
            </li>
          </ul>

          {/* Right cluster: phone + CTA + burger */}
          <div className="ml-auto flex min-w-0 items-center justify-end gap-2 sm:gap-3 md:gap-4">
            {/* Mobile — icon phone */}
            <Tooltip content="Позвонить: +7 (999) 841-49-36" position="bottom">
              <a
                href="tel:+79998414936"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border/70 bg-card/90 text-foreground-subtle shadow-sm transition-colors hover:border-border-strong hover:text-foreground-muted focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/40 md:hidden"
                aria-label="Позвонить: +7 (999) 841-49-36"
              >
                <PhoneIcon />
              </a>
            </Tooltip>

            <button
              type="button"
              onClick={() => dispatchOpenContactModal()}
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
              onClick={() => dispatchOpenContactModal()}
              className="btn-primary hidden md:inline-flex"
            >
              {CTA_LABEL}
            </button>

            {/* Burger */}
            <button
              type="button"
              className="flex h-10 w-10 shrink-0 flex-col items-center justify-center gap-1.5 rounded-lg p-1.5 transition-colors hover:bg-card-muted/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/40 md:hidden"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
            >
              <span
                className={`block h-0.5 w-5 bg-foreground transition-all duration-[180ms] ${mobileOpen ? "translate-y-2 rotate-45" : ""}`}
              />
              <span
                className={`block h-0.5 w-5 bg-foreground transition-all duration-[180ms] ${mobileOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-0.5 w-5 bg-foreground transition-all duration-[180ms] ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`}
              />
            </button>
          </div>
        </nav>
      </header>

      {/* Overlay */}
      <div
        aria-hidden="true"
        onClick={() => setMobileOpen(false)}
        className={[
          "fixed inset-0 z-[60] bg-[rgba(15,23,42,0.48)] transition-opacity duration-300 md:hidden",
          mobileOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        ].join(" ")}
      />

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Навигация"
        className={[
          "fixed top-0 right-0 z-[61] flex h-full w-[280px] flex-col bg-white shadow-[var(--shadow-lg)] transition-transform duration-300 md:hidden",
          mobileOpen ? "translate-x-0" : "translate-x-full",
        ].join(" ")}
      >
        {/* Drawer header */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b border-[#E2E8F0] px-5">
          <span className="text-sm font-semibold tracking-tight" style={{ color: 'var(--color-text)' }}>Меню</span>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Закрыть меню"
            className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-[#F1F5F9]"
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path d="M2 2L16 16M16 2L2 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Nav links */}
        <nav className="flex flex-1 flex-col overflow-y-auto px-3 py-4">
          {[
            { label: "Главная", href: "/" },
            { label: "Каталог", href: "/catalog" },
            { label: "Техника для СВО", href: "/svo" },
            { label: "Статьи", href: "/articles" },
          ].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className="flex items-center rounded-xl px-3 py-3.5 text-base font-medium transition-colors hover:bg-[#F1F5F9]"
              style={{ color: 'var(--color-text)' }}
            >
              {item.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => { setMobileOpen(false); dispatchOpenContactModal(); }}
            className="flex w-full items-center rounded-xl px-3 py-3.5 text-base font-medium transition-colors hover:bg-[#F1F5F9]"
            style={{ color: 'var(--color-text)' }}
          >
            Контакты
          </button>
        </nav>

        {/* Drawer footer */}
        <div className="shrink-0 border-t border-[#E2E8F0] px-4 py-4 space-y-3">
          <a
            href="tel:+79998414936"
            className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-[#F1F5F9]"
            style={{ color: 'var(--color-text-muted)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.4 2 2 0 0 1 3.58 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.16 6.16l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            +7 (999) 841-49-36
          </a>
          <button
            type="button"
            onClick={() => { setMobileOpen(false); dispatchOpenContactModal(); }}
            className="btn-primary w-full"
          >
            Подобрать технику
          </button>
        </div>
      </div>
    </>
  );
}

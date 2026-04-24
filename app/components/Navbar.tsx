"use client";

import Link from "next/link";
import { useState } from "react";

import { dispatchOpenContactModal } from "@/lib/contact-modal";

const openContact = () => dispatchOpenContactModal();

const linkClass =
  "px-3.5 py-1.5 rounded-md text-[13px] font-medium text-foreground-muted hover:text-foreground hover:bg-card-raised focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/40 transition-all duration-150 whitespace-nowrap";

const mobileLinkClass =
  "px-3 py-2.5 rounded-md text-sm font-medium text-foreground-muted hover:text-foreground hover:bg-card-raised focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/40 transition-all";

const primaryBtnClass =
  "px-4 py-1.5 rounded-full bg-primary text-primary-foreground text-[13px] font-semibold shadow-sm hover:bg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/60 active:scale-95 transition-all duration-150";

const primaryBtnMobileClass =
  "mt-2 px-4 py-2 rounded-full bg-primary text-primary-foreground text-sm font-semibold text-center shadow-sm hover:bg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/60 transition-all";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-card/90 text-foreground backdrop-blur-md shadow-card">
      <nav className="relative mx-auto flex h-16 max-w-7xl items-center justify-between px-6">

        {/* Left — logo */}
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/50 rounded-md"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-card-raised text-xs font-bold tracking-tight text-foreground transition-colors group-hover:bg-card-muted">
            TZ
          </div>
          <span className="hidden text-sm font-semibold tracking-tight text-foreground sm:inline">
            TechZone Motors
          </span>
        </Link>

        {/* Center — navigation links, absolutely centered */}
        <ul className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 md:flex">
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
            <Link
              href="/articles"
              className={`${linkClass} inline-block`}
            >
              Статьи
            </Link>
          </li>
        </ul>

        {/* Right — phone + CTA */}
        <div className="hidden shrink-0 items-center gap-4 md:flex">

          <a
            href="tel:+79998414936"
            className="text-sm font-medium tracking-wide text-foreground-muted transition-colors hover:text-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/40"
          >
            +7 (999) 841-49-36
          </a>
          <button
            type="button"
            onClick={openContact}
            className={primaryBtnClass}
          >
            Купить
          </button>
        </div>

        {/* Mobile burger */}
        <button
          type="button"
          className="flex flex-col gap-1.5 rounded-md p-1.5 transition-colors hover:bg-card-raised focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/40 md:hidden"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
        >
          <span className={`block h-0.5 w-5 bg-foreground transition-all duration-200 ${mobileOpen ? "translate-y-2 rotate-45" : ""}`} />
          <span className={`block h-0.5 w-5 bg-foreground transition-all duration-200 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block h-0.5 w-5 bg-foreground transition-all duration-200 ${mobileOpen ? "-translate-y-2 -rotate-45" : ""}`} />
        </button>
      </nav>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="flex flex-col gap-1 border-t border-border bg-card px-6 pt-2 pb-4 md:hidden">
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

          <button
            type="button"
            onClick={() => { setMobileOpen(false); openContact(); }}
            className={primaryBtnMobileClass}
          >
            Купить
          </button>
        </div>
      )}
    </header>
  );
}

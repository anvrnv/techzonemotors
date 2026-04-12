"use client";

import Link from "next/link";
import { useState } from "react";

import { dispatchOpenContactModal } from "@/lib/contact-modal";

const openContact = () => dispatchOpenContactModal();

/** Same line as SVO tile captions (`SvoPageClient`): caps, wide tracking, not heavy. */
const navCaption =
  "font-normal uppercase leading-snug tracking-[0.2em] text-[11px] sm:text-xs";

const navLinkInactive =
  "rounded-md px-3.5 py-1.5 text-white/60 transition-all duration-150 hover:bg-white/10 hover:text-white whitespace-nowrap";

const navLinkMobile =
  "rounded-md px-3 py-2.5 text-white/70 transition-all hover:bg-white/10 hover:text-white";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-md border-b border-white/10">
      <nav className="relative max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Left — logo */}
        <Link
          href="/"
          className="group flex shrink-0 items-center gap-2.5"
          aria-label="TechZone Motors — на главную"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/20 bg-white/10 transition-colors group-hover:bg-white/20">
            <span className={`text-white ${navCaption}`}>TZ</span>
          </div>
          <span className={`hidden text-white sm:inline ${navCaption}`}>
            TECHZONEMOTORS
          </span>
        </Link>

        {/* Center — navigation links, absolutely centered */}
        <ul className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          <li>
            <Link href="/" className={`${navCaption} ${navLinkInactive}`}>
              Главная
            </Link>
          </li>
          <li>
            <Link href="/catalog" className={`${navCaption} ${navLinkInactive}`}>
              Каталог товаров
            </Link>
          </li>
          <li>
            <Link href="/svo" className={`${navCaption} ${navLinkInactive}`}>
              Техника для СВО
            </Link>
          </li>
          <li>
            <Link
              href="/articles"
              className={`${navCaption} ${navLinkInactive} inline-block`}
            >
              Статьи
            </Link>
          </li>
        </ul>

        {/* Right — phone + CTA */}
        <div className="hidden md:flex items-center gap-4 shrink-0">

          <a
            href="tel:+79998414936"
            className={`${navCaption} tabular-nums text-white/80 transition-colors hover:text-white`}
          >
            +7 (999) 841-49-36
          </a>
          <button
            type="button"
            onClick={openContact}
            className={`rounded-full bg-white px-4 py-1.5 font-semibold text-[#1a1a1a] transition-all duration-150 hover:bg-white/90 active:scale-95 ${navCaption}`}
          >
            Купить
          </button>
        </div>

        {/* Mobile burger */}
        <button
          type="button"
          className="md:hidden flex flex-col gap-1.5 p-1.5 rounded-md hover:bg-white/10 transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-expanded={mobileOpen}
          aria-label={mobileOpen ? "Закрыть меню" : "Открыть меню"}
        >
          <span className={`block w-5 h-0.5 bg-white transition-all duration-200 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all duration-200 ${mobileOpen ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-0.5 bg-white transition-all duration-200 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </nav>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden bg-[#1a1a1a] border-t border-white/10 px-6 pb-4 pt-2 flex flex-col gap-1">
          <Link
            href="/"
            onClick={() => setMobileOpen(false)}
            className={`${navCaption} ${navLinkMobile}`}
          >
            Главная
          </Link>
          <Link
            href="/catalog"
            onClick={() => setMobileOpen(false)}
            className={`${navCaption} ${navLinkMobile}`}
          >
            Каталог товаров
          </Link>
          <Link
            href="/svo"
            onClick={() => setMobileOpen(false)}
            className={`${navCaption} ${navLinkMobile}`}
          >
            Техника для СВО
          </Link>
          <Link
            href="/articles"
            onClick={() => setMobileOpen(false)}
            className={`${navCaption} ${navLinkMobile}`}
          >
            Статьи
          </Link>

          <button
            type="button"
            onClick={() => {
              setMobileOpen(false);
              openContact();
            }}
            className={`mt-2 w-full rounded-full bg-white px-4 py-2 text-center font-semibold text-[#1a1a1a] transition-all hover:bg-white/90 ${navCaption}`}
          >
            Купить
          </button>
        </div>
      )}
    </header>
  );
}

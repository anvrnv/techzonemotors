"use client";

import Link from "next/link";
import { useState } from "react";

import { dispatchOpenContactModal } from "@/lib/contact-modal";

const openContact = () => dispatchOpenContactModal();

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a1a1a]/95 backdrop-blur-md border-b border-white/10">
      <nav className="relative max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Left — logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
          <div className="w-8 h-8 rounded-lg bg-white/10 border border-white/20 flex items-center justify-center group-hover:bg-white/20 transition-colors">
            <span className="text-white text-xs font-bold tracking-tight">TZ</span>
          </div>
          <span className="text-white font-semibold text-sm tracking-tight hidden sm:inline">
            TechZone Motors
          </span>
        </Link>

        {/* Center — navigation links, absolutely centered */}
        <ul className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
          <li>
            <Link
              href="/"
              className="px-3.5 py-1.5 rounded-md text-[13px] font-medium text-white/60 hover:text-white hover:bg-white/10 transition-all duration-150 whitespace-nowrap"
            >
              Главная
            </Link>
          </li>
          <li>
            <Link
              href="/catalog"
              className="px-3.5 py-1.5 rounded-md text-[13px] font-medium text-white/60 hover:text-white hover:bg-white/10 transition-all duration-150 whitespace-nowrap"
            >
              Каталог товаров
            </Link>
          </li>
          <li>
            <Link
              href="/svo"
              className="px-3.5 py-1.5 rounded-md text-[13px] font-medium text-white/60 hover:text-white hover:bg-white/10 transition-all duration-150 whitespace-nowrap"
            >
              Техника для СВО
            </Link>
          </li>
          <li>
            <Link
              href="/articles"
              className="px-3.5 py-1.5 rounded-md text-[13px] font-medium text-white/60 hover:text-white hover:bg-white/10 transition-all duration-150 whitespace-nowrap inline-block"
            >
              Статьи
            </Link>
          </li>
        </ul>

        {/* Right — phone + CTA */}
        <div className="hidden md:flex items-center gap-4 shrink-0">

          <a
            href="tel:+79998414936"
            className="text-white/80 hover:text-white text-sm font-medium tracking-wide transition-colors"
          >
            +7 (999) 841-49-36
          </a>
          <button
            type="button"
            onClick={openContact}
            className="px-4 py-1.5 rounded-full bg-white text-[#1a1a1a] text-[13px] font-semibold hover:bg-white/90 active:scale-95 transition-all duration-150"
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
            className="px-3 py-2.5 rounded-md text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all"
          >
            Главная
          </Link>
          <Link
            href="/catalog"
            onClick={() => setMobileOpen(false)}
            className="px-3 py-2.5 rounded-md text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all"
          >
            Каталог товаров
          </Link>
          <Link
            href="/svo"
            onClick={() => setMobileOpen(false)}
            className="px-3 py-2.5 rounded-md text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all"
          >
            Техника для СВО
          </Link>
          <Link
            href="/articles"
            onClick={() => setMobileOpen(false)}
            className="px-3 py-2.5 rounded-md text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all"
          >
            Статьи
          </Link>

          <button
            type="button"
            onClick={() => { setMobileOpen(false); openContact(); }}
            className="mt-2 px-4 py-2 rounded-full bg-white text-[#1a1a1a] text-sm font-semibold text-center hover:bg-white/90 transition-all"
          >
            Купить
          </button>
        </div>
      )}
    </header>
  );
}

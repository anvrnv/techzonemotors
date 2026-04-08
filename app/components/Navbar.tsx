"use client";

import Link from "next/link";
import { useState, useEffect, useRef } from "react";

import { dispatchOpenContactModal } from "@/lib/contact-modal";

const cities = ["Москва", "Петрозаводск"];

const openContact = () => dispatchOpenContactModal();

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [city, setCity] = useState<string | null>(null);
  const [cityOpen, setCityOpen] = useState(false);
  const cityRef = useRef<HTMLDivElement>(null);

  // Close city dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (cityRef.current && !cityRef.current.contains(e.target as Node)) {
        setCityOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

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
            <button
              onClick={openContact}
              className="px-3.5 py-1.5 rounded-md text-[13px] font-medium text-white/60 hover:text-white hover:bg-white/10 transition-all duration-150 whitespace-nowrap"
            >
              Связаться
            </button>
          </li>
        </ul>

        {/* Right — city picker + phone + CTA */}
        <div className="hidden md:flex items-center gap-4 shrink-0">

          {/* City picker */}
          <div className="relative" ref={cityRef}>
            <button
              onClick={() => setCityOpen((v) => !v)}
              aria-label="Выбрать город"
              className="w-[148px] flex items-center gap-1.5 text-white/60 hover:text-white transition-colors group"
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" className="shrink-0 group-hover:text-orange-400 transition-colors">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="currentColor" opacity="0.9" />
                <circle cx="12" cy="9" r="2.5" fill="#1a1a1a" />
              </svg>
              <span className="text-[12px] font-medium flex-1 text-left whitespace-nowrap">
                {city ?? "Город"}
              </span>
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className={`shrink-0 transition-transform duration-200 ${cityOpen ? "rotate-180" : ""}`}>
                <path d="M2 3.5L5 6.5L8 3.5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>

            {cityOpen && (
              <div className="absolute right-0 top-full mt-2 w-44 bg-[#242424] border border-white/10 rounded-xl shadow-2xl overflow-hidden z-50">
                <div className="px-3 py-2 text-[11px] text-white/30 font-medium uppercase tracking-wider border-b border-white/5">
                  Выберите город
                </div>
                {cities.map((c) => (
                  <button
                    key={c}
                    onClick={() => { setCity(c); setCityOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm transition-colors flex items-center justify-between ${
                      city === c ? "text-white bg-white/10" : "text-white/70 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {c}
                    {city === c && (
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                        <path d="M2.5 7L5.5 10L11.5 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Divider */}
          <span className="w-px h-5 bg-white/10" />

          <a
            href="tel:+79998414936"
            className="text-white/80 hover:text-white text-sm font-medium tracking-wide transition-colors"
          >
            +7 (999) 841-49-36
          </a>
          <button
            onClick={openContact}
            className="px-4 py-1.5 rounded-full bg-white text-[#1a1a1a] text-[13px] font-semibold hover:bg-white/90 active:scale-95 transition-all duration-150"
          >
            Купить
          </button>
        </div>

        {/* Mobile burger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-1.5 rounded-md hover:bg-white/10 transition-colors"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Открыть меню"
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
          <button
            onClick={() => { setMobileOpen(false); openContact(); }}
            className="px-3 py-2.5 rounded-md text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 transition-all text-left"
          >
            Связаться
          </button>

          {/* City selector in mobile */}
          <div className="px-3 pt-2 pb-1 border-t border-white/5 mt-1">
            <p className="text-[11px] text-white/30 uppercase tracking-wider mb-2">Город</p>
            <div className="flex gap-2">
              {cities.map((c) => (
                <button
                  key={c}
                  onClick={() => setCity(c)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium transition-all ${
                    city === c
                      ? "bg-white text-black"
                      : "bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          <button
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

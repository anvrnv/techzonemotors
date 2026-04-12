"use client";

import { dispatchOpenContactModal } from "@/lib/contact-modal";

export default function SvoDetailCta() {
  return (
    <button
      type="button"
      onClick={() => dispatchOpenContactModal()}
      className="inline-flex min-h-[48px] w-full max-w-sm items-center justify-center rounded-sm border border-zinc-600/90 bg-zinc-900/80 px-8 py-3 text-sm font-medium text-zinc-100 transition-colors hover:border-zinc-500 hover:bg-zinc-800/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-zinc-400/40 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] sm:w-auto"
    >
      Узнать подробнее
    </button>
  );
}

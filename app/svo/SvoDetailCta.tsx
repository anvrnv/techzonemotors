"use client";

import { dispatchOpenContactModal } from "@/lib/contact-modal";

export default function SvoDetailCta() {
  return (
    <button
      type="button"
      onClick={() => dispatchOpenContactModal()}
      className="inline-flex items-center justify-center min-h-[48px] px-8 py-3 rounded-full bg-green-600 text-white text-sm font-semibold hover:bg-green-500 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
    >
      Узнать подробнее
    </button>
  );
}

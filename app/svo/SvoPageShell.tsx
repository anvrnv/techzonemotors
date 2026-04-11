import type { ReactNode } from "react";

export default function SvoPageShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative min-h-screen text-white bg-[#0a0a0a]">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.45]"
        aria-hidden
        style={{
          backgroundImage: `repeating-linear-gradient(
            90deg,
            transparent 0,
            transparent 63px,
            rgba(255, 255, 255, 0.035) 63px,
            rgba(255, 255, 255, 0.035) 64px
          )`,
        }}
      />
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}

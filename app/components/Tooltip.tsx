"use client";

import { useEffect, useRef, useState } from "react";

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: "top" | "bottom" | "left" | "right";
}

const positionClasses: Record<NonNullable<TooltipProps["position"]>, string> = {
  top: "bottom-full left-1/2 -translate-x-1/2 mb-2",
  bottom: "top-full left-1/2 -translate-x-1/2 mt-2",
  left: "right-full top-1/2 -translate-y-1/2 mr-2",
  right: "left-full top-1/2 -translate-y-1/2 ml-2",
};

export default function Tooltip({
  content,
  children,
  position = "top",
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const wrapperRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!isVisible) return;
    const handleClick = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) {
        setIsVisible(false);
      }
    };
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [isVisible]);

  return (
    <span
      ref={wrapperRef}
      className="relative inline-flex items-center"
      onPointerEnter={(e) => { if (e.pointerType === 'touch') return; setIsVisible(true); }}
      onPointerLeave={(e) => { if (e.pointerType === 'touch') return; setIsVisible(false); }}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
      onClick={() => setIsVisible((v) => !v)}
    >
      {children}
      {isVisible && (
        <span
          role="tooltip"
          className={`absolute ${positionClasses[position]} z-[200] max-w-[220px] whitespace-nowrap rounded-lg bg-[#111827] px-2.5 py-1.5 text-xs text-white pointer-events-none`}
        >
          {content}
        </span>
      )}
    </span>
  );
}

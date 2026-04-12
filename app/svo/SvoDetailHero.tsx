"use client";

import Image from "next/image";
import { useId } from "react";

type Props = {
  imageUrl: string;
  imageAlt: string;
  dimensionLength?: string;
  dimensionHeight?: string;
};

export default function SvoDetailHero({
  imageUrl,
  imageAlt,
  dimensionLength,
  dimensionHeight,
}: Props) {
  const L = dimensionLength?.trim();
  const H = dimensionHeight?.trim();
  const gid = useId();
  const gradH = `${gid}-dim-h`;
  const gradV = `${gid}-dim-v`;
  const dimRailClass = "w-11 shrink-0 sm:w-12";

  return (
    <div className="relative w-full bg-[#0a0a0a]">
      <div className="flex w-full flex-col">
        <div className="flex h-[min(48vh,400px)] max-h-[min(52vh,440px)] min-h-[min(36vh,260px)] w-full min-h-0 flex-row">
          <div className="relative min-h-0 min-w-0 flex-1">
            <Image
              src={imageUrl}
              alt={imageAlt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 65vw"
              className="object-contain object-center"
            />
          </div>

          {H ? (
            <div className={`relative ${dimRailClass}`}>
              <svg
                className="absolute inset-0 h-full w-full text-zinc-500"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                aria-hidden
                focusable="false"
              >
                <defs>
                  <linearGradient
                    id={gradV}
                    x1="0%"
                    y1="0%"
                    x2="0%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
                    <stop
                      offset="50%"
                      stopColor="currentColor"
                      stopOpacity="0.95"
                    />
                    <stop
                      offset="100%"
                      stopColor="currentColor"
                      stopOpacity="0"
                    />
                  </linearGradient>
                </defs>
                <line
                  x1="35%"
                  y1="6%"
                  x2="35%"
                  y2="94%"
                  stroke={`url(#${gradV})`}
                  strokeWidth={1}
                  vectorEffect="nonScalingStroke"
                />
                <line
                  x1="22%"
                  y1="6%"
                  x2="48%"
                  y2="6%"
                  stroke="currentColor"
                  strokeOpacity={0.45}
                  strokeWidth={1}
                  vectorEffect="nonScalingStroke"
                />
                <line
                  x1="22%"
                  y1="94%"
                  x2="48%"
                  y2="94%"
                  stroke="currentColor"
                  strokeOpacity={0.45}
                  strokeWidth={1}
                  vectorEffect="nonScalingStroke"
                />
              </svg>
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center py-6">
                <p className="max-h-[85%] text-balance text-center text-[10px] font-normal uppercase leading-snug tracking-[0.2em] text-zinc-400 [writing-mode:vertical-rl] rotate-180">
                  {H}
                </p>
              </div>
            </div>
          ) : null}
        </div>

        {L ? (
          <div className="flex w-full min-w-0 flex-row">
            <div className="relative h-12 min-w-0 flex-1 sm:h-14">
              <svg
                className="absolute inset-0 h-full w-full text-zinc-500"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
                aria-hidden
              >
                <defs>
                  <linearGradient
                    id={gradH}
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="currentColor" stopOpacity="0" />
                    <stop
                      offset="50%"
                      stopColor="currentColor"
                      stopOpacity="0.95"
                    />
                    <stop
                      offset="100%"
                      stopColor="currentColor"
                      stopOpacity="0"
                    />
                  </linearGradient>
                </defs>
                <line
                  x1="4%"
                  y1="35%"
                  x2="96%"
                  y2="35%"
                  stroke={`url(#${gradH})`}
                  strokeWidth={1}
                  vectorEffect="nonScalingStroke"
                />
                <line
                  x1="4%"
                  y1="22%"
                  x2="4%"
                  y2="48%"
                  stroke="currentColor"
                  strokeOpacity={0.45}
                  strokeWidth={1}
                  vectorEffect="nonScalingStroke"
                />
                <line
                  x1="96%"
                  y1="22%"
                  x2="96%"
                  y2="48%"
                  stroke="currentColor"
                  strokeOpacity={0.45}
                  strokeWidth={1}
                  vectorEffect="nonScalingStroke"
                />
              </svg>
              <div className="pointer-events-none absolute inset-0 flex items-end justify-center pb-0.5 sm:pb-1">
                <p className="text-balance text-center text-[10px] font-normal uppercase leading-snug tracking-[0.2em] text-zinc-400">
                  {L}
                </p>
              </div>
            </div>
            {H ? <div className={dimRailClass} aria-hidden /> : null}
          </div>
        ) : null}
      </div>
    </div>
  );
}

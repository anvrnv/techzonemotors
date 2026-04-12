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
  const dimRailClass = "w-12 shrink-0 sm:w-[3.25rem]";

  const lengthLine = L ? `ДЛИНА ${L}` : "";
  const heightLine = H ? `ВЫСОТА ${H}` : "";

  return (
    <div className="relative w-full bg-[#0a0a0a]">
      <div className="flex w-full flex-col">
        <div className="flex h-[min(58vh,500px)] max-h-[min(64vh,540px)] min-h-[min(44vh,312px)] w-full flex-row gap-4 sm:gap-5">
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
                className="absolute inset-0 h-full w-full text-zinc-400"
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
                  y1="5%"
                  x2="35%"
                  y2="95%"
                  stroke={`url(#${gradV})`}
                  strokeWidth={1}
                  vectorEffect="nonScalingStroke"
                />
                <line
                  x1="20%"
                  y1="5%"
                  x2="50%"
                  y2="5%"
                  stroke="currentColor"
                  strokeOpacity={0.5}
                  strokeWidth={1}
                  vectorEffect="nonScalingStroke"
                />
                <line
                  x1="20%"
                  y1="95%"
                  x2="50%"
                  y2="95%"
                  stroke="currentColor"
                  strokeOpacity={0.5}
                  strokeWidth={1}
                  vectorEffect="nonScalingStroke"
                />
              </svg>
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center py-8">
                <p className="max-h-[88%] whitespace-nowrap text-center text-[11px] font-normal uppercase leading-snug tracking-[0.18em] text-zinc-300 [writing-mode:vertical-rl] rotate-180 sm:text-xs">
                  {heightLine}
                </p>
              </div>
            </div>
          ) : null}
        </div>

        {L ? (
          <div className="mt-4 flex w-full min-w-0 flex-row sm:mt-5">
            <div className="relative h-14 min-w-0 flex-1 sm:h-16">
              <svg
                className="absolute inset-0 h-full w-full text-zinc-400"
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
                  x1="3%"
                  y1="38%"
                  x2="97%"
                  y2="38%"
                  stroke={`url(#${gradH})`}
                  strokeWidth={1}
                  vectorEffect="nonScalingStroke"
                />
                <line
                  x1="3%"
                  y1="24%"
                  x2="3%"
                  y2="52%"
                  stroke="currentColor"
                  strokeOpacity={0.5}
                  strokeWidth={1}
                  vectorEffect="nonScalingStroke"
                />
                <line
                  x1="97%"
                  y1="24%"
                  x2="97%"
                  y2="52%"
                  stroke="currentColor"
                  strokeOpacity={0.5}
                  strokeWidth={1}
                  vectorEffect="nonScalingStroke"
                />
              </svg>
              <div className="pointer-events-none absolute inset-0 flex items-end justify-center pb-1 sm:pb-1.5">
                <p className="text-balance text-center text-[11px] font-normal uppercase leading-snug tracking-[0.18em] text-zinc-300 sm:text-xs">
                  {lengthLine}
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

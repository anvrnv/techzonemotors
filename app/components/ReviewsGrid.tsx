"use client";

import { useId } from "react";

import type { ReviewData } from "@/lib/reviews";

/** Row1 / Row3: 3+3+4; Row2 / Row4: 4+3+3 on `md:grid-cols-10`. */
const MD_COL_SPANS: readonly string[] = [
  "md:col-span-3",
  "md:col-span-3",
  "md:col-span-4",
  "md:col-span-4",
  "md:col-span-3",
  "md:col-span-3",
  "md:col-span-3",
  "md:col-span-3",
  "md:col-span-4",
  "md:col-span-4",
  "md:col-span-3",
  "md:col-span-3",
];

const STAR_PATH =
  "M12 2.5 14.47 9.02 21.5 9.02 15.76 13.24 18.23 20.26 12 16.04 5.77 20.26 8.24 13.24 2.5 9.02 9.53 9.02 Z";

function clampStarsDisplay(ratingTen: number): number {
  const v = ratingTen / 2;
  if (!Number.isFinite(v)) return 0;
  return Math.min(5, Math.max(0, v));
}

function StarIcon({
  mode,
  clipId,
  className,
}: {
  mode: "full" | "half" | "empty";
  /** Unique id for SVG `<clipPath>` when `mode === "half"`. */
  clipId: string;
  className?: string;
}) {
  if (mode === "full") {
    return (
      <svg
        className={className}
        viewBox="0 0 24 24"
        width={20}
        height={20}
        aria-hidden
      >
        <path d={STAR_PATH} fill="currentColor" />
      </svg>
    );
  }
  if (mode === "half") {
    return (
      <svg
        className={`text-foreground-subtle ${className ?? ""}`}
        viewBox="0 0 24 24"
        width={20}
        height={20}
        aria-hidden
      >
        <defs>
          <clipPath id={clipId}>
            <rect x="0" y="0" width="12" height="24" />
          </clipPath>
        </defs>
        <path
          d={STAR_PATH}
          fill="none"
          stroke="currentColor"
          strokeWidth={1.2}
        />
        <path
          d={STAR_PATH}
          className="text-accent"
          fill="currentColor"
          clipPath={`url(#${clipId})`}
        />
      </svg>
    );
  }
  return (
    <svg
      className={`text-foreground-subtle ${className ?? ""}`}
      viewBox="0 0 24 24"
      width={20}
      height={20}
      aria-hidden
    >
      <path
        d={STAR_PATH}
        fill="none"
        stroke="currentColor"
        strokeWidth={1.2}
      />
    </svg>
  );
}

function stableClipId(reactId: string, index: number) {
  return `star-${reactId.replace(/[^a-zA-Z0-9_-]/g, "")}-${index}`;
}

function StarRatingRow({
  starsDisplay,
  label,
}: {
  starsDisplay: number;
  label: string;
}) {
  const reactId = useId();
  const cells: ("full" | "half" | "empty")[] = [];
  for (let i = 1; i <= 5; i += 1) {
    if (starsDisplay >= i) {
      cells.push("full");
    } else if (starsDisplay >= i - 0.5) {
      cells.push("half");
    } else {
      cells.push("empty");
    }
  }
  return (
    <div
      className="flex shrink-0 gap-0.5 text-accent"
      role="img"
      aria-label={label}
    >
      {cells.map((mode, idx) => (
        <StarIcon
          key={idx}
          mode={mode}
          clipId={stableClipId(reactId, idx)}
        />
      ))}
    </div>
  );
}

export type ReviewsGridProps = {
  /** Always length 12; `null` renders an empty shell. */
  reviews: (ReviewData | null)[];
};

export default function ReviewsGrid({ reviews }: ReviewsGridProps) {
  const first = reviews.slice(0, 12);
  const slots: (ReviewData | null)[] = [
    ...first,
    ...Array.from({ length: Math.max(0, 12 - first.length) }, () => null),
  ];

  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-section">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Отзывы наших клиентов
        </h2>
        <p className="mt-2 text-base text-foreground-muted">
          Что говорят о нас покупатели
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-10 gap-4">
        {slots.map((review, index) => {
          const colSpan = MD_COL_SPANS[index] ?? "md:col-span-3";
          const shellClass = `${colSpan} flex min-h-[140px] flex-col gap-3 rounded-2xl border border-border bg-card p-5 shadow-card md:p-6`;

          if (!review) {
            return (
              <div
                key={`empty-${index}`}
                className={shellClass}
                aria-hidden
              >
                <div className="flex justify-end">
                  <StarRatingRow
                    starsDisplay={0}
                    label="Оценка 0 из 5"
                  />
                </div>
              </div>
            );
          }

          const starsDisplay = clampStarsDisplay(review.ratingTen);
          const halves = Math.round(starsDisplay * 2);
          const label =
            halves % 2 === 0
              ? `Оценка ${halves / 2} из 5`
              : `Оценка ${(halves / 2).toFixed(1)} из 5`;

          return (
            <div
              key={`${review.id}-${index}`}
              className={shellClass}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-semibold text-foreground">
                  {review.authorName}
                </span>
                <StarRatingRow starsDisplay={starsDisplay} label={label} />
              </div>
              <p className="text-sm leading-relaxed text-foreground-muted whitespace-pre-wrap">
                {review.text}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

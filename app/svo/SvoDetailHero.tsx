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
  const showOverlay = Boolean(L || H);

  return (
    <div className="relative w-full rounded-lg border border-white/[0.08] bg-black/30 overflow-hidden">
      <div className="flex min-h-[min(45vh,360px)] max-h-[min(52vh,440px)] items-center justify-center px-4 py-6 sm:px-6 sm:py-8">
        <img
          src={imageUrl}
          alt={imageAlt}
          className="max-h-[min(42vh,400px)] w-full object-contain"
        />
      </div>

      {showOverlay ? (
        <div className="pointer-events-none absolute inset-0 flex items-stretch justify-stretch">
          <svg
            className="h-full w-full text-zinc-500/85"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="none"
            aria-hidden
            focusable="false"
          >
            {L ? (
              <>
                <line
                  x1="12%"
                  y1="86%"
                  x2="88%"
                  y2="86%"
                  stroke="currentColor"
                  strokeWidth={1}
                  vectorEffect="nonScalingStroke"
                />
                <line
                  x1="12%"
                  y1="84%"
                  x2="12%"
                  y2="88%"
                  stroke="currentColor"
                  strokeWidth={1}
                  vectorEffect="nonScalingStroke"
                />
                <line
                  x1="88%"
                  y1="84%"
                  x2="88%"
                  y2="88%"
                  stroke="currentColor"
                  strokeWidth={1}
                  vectorEffect="nonScalingStroke"
                />
              </>
            ) : null}
            {H ? (
              <>
                <line
                  x1="90%"
                  y1="14%"
                  x2="90%"
                  y2="72%"
                  stroke="currentColor"
                  strokeWidth={1}
                  vectorEffect="nonScalingStroke"
                />
                <line
                  x1="88%"
                  y1="14%"
                  x2="92%"
                  y2="14%"
                  stroke="currentColor"
                  strokeWidth={1}
                  vectorEffect="nonScalingStroke"
                />
                <line
                  x1="88%"
                  y1="72%"
                  x2="92%"
                  y2="72%"
                  stroke="currentColor"
                  strokeWidth={1}
                  vectorEffect="nonScalingStroke"
                />
              </>
            ) : null}
          </svg>

          {L ? (
            <div className="absolute left-1/2 bottom-[6%] -translate-x-1/2 text-center">
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                Длина
              </p>
              <p className="text-xs text-zinc-300 mt-0.5 tabular-nums">{L}</p>
            </div>
          ) : null}
          {H ? (
            <div className="absolute right-[3%] top-1/2 -translate-y-1/2 text-right">
              <p className="text-[9px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                Высота
              </p>
              <p className="text-xs text-zinc-300 mt-1 tabular-nums">{H}</p>
            </div>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

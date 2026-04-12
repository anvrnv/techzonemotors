import Link from "next/link";

type Props = {
  title: string;
  /** When false, hide the in-page anchor to specs (no specs to show). */
  showSpecsAnchor?: boolean;
};

export default function SvoDetailHeader({
  title,
  showSpecsAnchor = true,
}: Props) {
  return (
    <header className="mb-8 lg:mb-6">
      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3 min-h-[2.75rem]">
        <div className="justify-self-start min-w-0">
          <Link
            href="/svo"
            className="inline-flex text-sm text-zinc-400 hover:text-orange-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] rounded px-1 py-0.5 -mx-1"
            aria-label="Назад к каталогу техники для СВО"
          >
            Назад
          </Link>
        </div>
        <h1 className="mx-auto max-w-full truncate px-2 text-center text-[11px] font-normal uppercase leading-snug tracking-[0.2em] text-white sm:text-xs">
          {title}
        </h1>
        <div className="justify-self-end min-w-0">
          {showSpecsAnchor ? (
            <a
              href="#svo-specs"
              className="inline-flex text-sm text-zinc-400 hover:text-orange-400 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] rounded px-1 py-0.5 -mx-1 whitespace-nowrap"
            >
              Ещё данные
            </a>
          ) : null}
        </div>
      </div>
    </header>
  );
}

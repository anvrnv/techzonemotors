import Link from "next/link";

import {
  svoDisplayTitle,
  svoTileAccessibleText,
  type SvoCatalogProduct,
} from "@/lib/svo-products";

type Props = {
  product: Pick<SvoCatalogProduct, "brand" | "model" | "name">;
  /** When false, hide the in-page anchor to specs (no specs to show). */
  showSpecsAnchor?: boolean;
};

export default function SvoDetailHeader({
  product,
  showSpecsAnchor = true,
}: Props) {
  const brand = product.brand?.trim() ?? "";
  const model = product.model?.trim() ?? "";
  const showSplit = Boolean(brand && model);
  const ariaTitle = svoTileAccessibleText(product);

  return (
    <header className="mb-8 lg:mb-6">
      <div className="grid min-h-[2.75rem] grid-cols-[1fr_auto_1fr] items-center gap-3">
        <div className="min-w-0 justify-self-start">
          <Link
            href="/svo"
            className="inline-flex rounded px-1 py-0.5 text-sm text-zinc-400 transition-colors -mx-1 hover:text-orange-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
            aria-label="Назад к каталогу техники для СВО"
          >
            Назад
          </Link>
        </div>
        <h1
          className="mx-auto max-w-full px-2 text-center text-sm font-normal uppercase leading-snug tracking-[0.2em] text-white sm:text-base line-clamp-2"
          aria-label={ariaTitle}
        >
          {showSplit ? (
            <>
              <span className="font-bold uppercase">{brand}</span>
              <span className="mx-0.5 font-normal normal-case"> / </span>
              <span className="font-normal normal-case">{model}</span>
            </>
          ) : (
            <span className="font-semibold uppercase">
              {svoDisplayTitle(product)}
            </span>
          )}
        </h1>
        <div className="min-w-0 justify-self-end">
          {showSpecsAnchor ? (
            <a
              href="#svo-specs"
              className="inline-flex whitespace-nowrap rounded px-1 py-0.5 text-sm text-zinc-400 transition-colors -mx-1 hover:text-orange-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
            >
              Ещё данные
            </a>
          ) : null}
        </div>
      </div>
    </header>
  );
}

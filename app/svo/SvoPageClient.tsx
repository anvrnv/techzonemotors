import Image from "next/image";
import Link from "next/link";

import SvoPageShell from "./SvoPageShell";
import { svoDisplayTitle, type SvoCatalogProduct } from "@/lib/svo-products";

/** Matches visible caption: "brand / model" when both set, else display title. */
function svoTileAccessibleText(product: SvoCatalogProduct): string {
  const brand = product.brand?.trim() ?? "";
  const model = product.model?.trim() ?? "";
  if (brand && model) return `${brand} / ${model}`;
  return svoDisplayTitle(product);
}

export default function SvoPageClient({
  products,
}: {
  products: SvoCatalogProduct[];
}) {
  const single = products.length === 1;
  const n = products.length;
  /** ≥4 товаров в 3 колонки → минимум 2 ряда; делим оставшуюся высоту экрана пополам между 1-м и 2-м рядом. */
  const lgTwoFractionalRows = n >= 4;
  /** 2–3 товара: один ряд на lg, но тянем его на доступную высоту под шапкой страницы. */
  const lgOneFractionalRow = n >= 2 && n <= 3;

  return (
    <SvoPageShell>
      {/*
        Минимальная высота колонки под viewport: Navbar h-16 (4rem) + main pt-14 (3.5rem) = 7.5rem «съедают»
        верх вьюпорта; без подзаголовка счётчика ужали lg-отступы шапки/обёртки — больше бюджета высоты у
        сетки (flex-1 min-h-0). Первые два lg-ряда при ≥4 товарах — 1fr/1fr; дальше auto.
      */}
      <div className="mx-auto w-full max-w-7xl px-6 pt-8 pb-12 flex flex-col lg:max-w-none lg:mx-0 lg:px-8 xl:px-12 lg:min-h-[calc(100dvh-7.5rem)] lg:pt-3 lg:pb-4 [@media(min-height:900px)]:lg:pt-2.5 [@media(min-height:900px)]:lg:pb-3.5">
        <header className="shrink-0 mb-6 text-center lg:mb-3 [@media(min-height:900px)]:lg:mb-2.5">
          <h1 className="text-white text-3xl font-bold tracking-tight lg:text-[1.35rem] lg:leading-tight [@media(min-height:900px)]:lg:text-[1.3rem] mx-auto max-w-prose">
            Техника для СВО
          </h1>
        </header>

        <div
          className={`grid flex-1 min-h-0 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-x-3 lg:gap-y-2.5 [@media(min-height:900px)]:lg:gap-y-2 ${
            lgTwoFractionalRows
              ? "lg:grid-rows-[minmax(0,1fr)_minmax(0,1fr)_auto]"
              : ""
          } ${lgOneFractionalRow ? "lg:grid-rows-[minmax(0,1fr)]" : ""}`}
        >
          {products.map((product) => {
            const label = svoTileAccessibleText(product);
            const brand = product.brand?.trim() ?? "";
            const model = product.model?.trim() ?? "";
            const showSplit = Boolean(brand && model);

            const imageShell = single
              ? "relative min-h-[clamp(14rem,22vh,18rem)] lg:min-h-[clamp(17rem,min(32vh,22rem),22rem)] px-2 py-4 lg:py-5"
              : lgTwoFractionalRows || lgOneFractionalRow
                ? "relative flex-1 min-h-[10rem] lg:min-h-0 px-2 py-4 lg:py-3 [@media(min-height:900px)]:lg:py-2.5"
                : "relative min-h-[clamp(14rem,22vh,18rem)] lg:min-h-[clamp(14rem,min(28vh,18rem),18rem)] px-2 py-4 lg:py-3 [@media(min-height:900px)]:lg:py-2.5";

            return (
              <Link
                key={product.id}
                href={`/svo/${product.slug}`}
                aria-label={label}
                className={`group flex h-full min-h-0 flex-col rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] ${
                  single ? "lg:col-span-3" : ""
                }`}
              >
                <article
                  className={`flex h-full min-h-0 flex-col overflow-hidden transition duration-200 group-hover:opacity-90 group-hover:brightness-110 group-focus-visible:opacity-90 group-focus-visible:brightness-110 ${
                    single ? "max-w-4xl mx-auto w-full" : ""
                  }`}
                >
                  <div className={imageShell}>
                    <Image
                      src={product.image}
                      alt={label}
                      fill
                      sizes={
                        single
                          ? "(max-width: 1024px) 100vw, 56rem"
                          : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 34vw"
                      }
                      className="object-contain object-center"
                    />
                  </div>
                  <div className="pt-1 pb-2 px-1">
                    <p className="text-center text-white text-[11px] sm:text-xs tracking-[0.2em] leading-snug line-clamp-2">
                      {showSplit ? (
                        <>
                          <span className="font-bold uppercase">{brand}</span>
                          <span className="font-normal mx-0.5 normal-case">
                            {" "}
                            /{" "}
                          </span>
                          <span className="font-normal normal-case">
                            {model}
                          </span>
                        </>
                      ) : (
                        <span className="font-semibold uppercase">
                          {svoDisplayTitle(product)}
                        </span>
                      )}
                    </p>
                  </div>
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </SvoPageShell>
  );
}

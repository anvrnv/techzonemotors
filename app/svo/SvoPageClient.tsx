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
        Высота колонки: flex-1 min-h-0 в цепочке main → обёртка /svo → SvoPageShell (навбар fixed, в потоке
        не съедает main — не дублируем его в min-h). Сетка flex-1 тянется на всё под заголовком; при ≥4
        товарах первые два lg-ряда — 1fr/1fr (делят дополнительную высоту поровну), третий — auto.
      */}
      <div
        className="mx-auto flex w-full max-w-7xl flex-1 min-h-0 flex-col px-6 pt-8 pb-12 lg:mx-0 lg:max-w-none lg:px-8 lg:pt-9 lg:pb-4 xl:px-12 [@media(min-height:900px)]:lg:pb-3.5"
        data-svo-measure="page-column"
      >
        <header
          className="mb-6 shrink-0 text-center lg:mb-4"
          data-svo-measure="page-header"
        >
          <h1
            className="mx-auto text-center text-white text-[11px] font-normal uppercase leading-snug tracking-[0.2em] sm:text-xs"
            data-svo-measure="page-title"
          >
            Техника для СВО
          </h1>
        </header>

        <div
          data-svo-measure="product-grid"
          className={`grid flex-1 min-h-0 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-x-3 lg:gap-y-2.5 [@media(min-height:900px)]:lg:gap-y-2 ${
            lgTwoFractionalRows
              ? "lg:grid-rows-[minmax(0,1fr)_minmax(0,1fr)_auto]"
              : ""
          } ${lgOneFractionalRow ? "lg:grid-rows-[minmax(0,1fr)]" : ""}`}
        >
          {products.map((product, index) => {
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
                data-svo-measure={`card-link-${index}`}
                className={`group flex h-full min-h-0 flex-col rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] ${
                  single ? "lg:col-span-3" : ""
                }`}
              >
                <article
                  className={`flex h-full min-h-0 flex-col overflow-hidden transition duration-200 group-hover:opacity-90 group-hover:brightness-110 group-focus-visible:opacity-90 group-focus-visible:brightness-110 ${
                    single ? "max-w-4xl mx-auto w-full" : ""
                  }`}
                  data-svo-measure={`card-article-${index}`}
                >
                  <div
                    className={imageShell}
                    data-svo-measure={`card-image-${index}`}
                  >
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
                  <div
                    className="pt-1 pb-2 px-1"
                    data-svo-measure={`card-caption-${index}`}
                  >
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

import Image from "next/image";
import Link from "next/link";

import SvoPageShell from "./SvoPageShell";
import { svoDisplayTitle, type SvoCatalogProduct } from "@/lib/svo-products";

function modelsForSaleLabel(count: number): string {
  const n = Math.abs(count) % 100;
  if (n >= 11 && n <= 14) {
    return `${count} моделей в продаже`;
  }
  const n1 = count % 10;
  if (n1 === 1) {
    return `${count} модель в продаже`;
  }
  if (n1 >= 2 && n1 <= 4) {
    return `${count} модели в продаже`;
  }
  return `${count} моделей в продаже`;
}

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

  return (
    <SvoPageShell>
      {/* ~900px tall viewport: tighter header + gaps so 6 tiles + navbar fit without scroll; slightly smaller h1 vs default lg */}
      <div className="max-w-7xl mx-auto px-6 pt-10 pb-14 lg:pt-4 lg:pb-5 [@media(min-height:900px)]:lg:pt-3 [@media(min-height:900px)]:lg:pb-4">
        <header className="mb-8 lg:mb-4 [@media(min-height:900px)]:lg:mb-3">
          <h1 className="text-white text-3xl font-bold tracking-tight lg:text-[1.35rem] lg:leading-tight [@media(min-height:900px)]:lg:text-[1.3rem]">
            Техника для СВО
          </h1>
          <p className="text-zinc-500 text-sm mt-3 lg:mt-2 lg:text-xs [@media(min-height:900px)]:lg:mt-1.5">
            {modelsForSaleLabel(products.length)}
          </p>
        </header>

        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7 lg:gap-x-3 lg:gap-y-2.5 [@media(min-height:900px)]:lg:gap-y-2`}
        >
          {products.map((product) => {
            const label = svoTileAccessibleText(product);
            const brand = product.brand?.trim() ?? "";
            const model = product.model?.trim() ?? "";
            const showSplit = Boolean(brand && model);

            const imageShell = single
              ? "relative min-h-[clamp(14rem,22vh,18rem)] lg:min-h-[clamp(17rem,min(32vh,22rem),22rem)] px-2 py-4 lg:py-5"
              : "relative min-h-[clamp(14rem,22vh,18rem)] lg:min-h-[clamp(14rem,min(28vh,18rem),18rem)] px-2 py-4 lg:py-3 [@media(min-height:900px)]:lg:py-2.5";

            return (
              <Link
                key={product.id}
                href={`/svo/${product.slug}`}
                aria-label={label}
                className={`group block rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] ${
                  single ? "lg:col-span-3" : ""
                }`}
              >
                <article
                  className={`h-full overflow-hidden transition duration-200 group-hover:opacity-90 group-hover:brightness-110 group-focus-visible:opacity-90 group-focus-visible:brightness-110 ${
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
                          : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
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

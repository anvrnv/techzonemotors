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

export default function SvoPageClient({
  products,
}: {
  products: SvoCatalogProduct[];
}) {
  return (
    <SvoPageShell>
      {/* ~900px viewport height: fit navbar (h-16) + main pt-14 + header + 2 rows × 3 cols = 6 tiles in max-w-7xl without page scroll; further rows scroll normally */}
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-16 lg:pt-5 lg:pb-6 [@media(min-height:900px)]:lg:pt-4 [@media(min-height:900px)]:lg:pb-5">
        <header className="mb-10 lg:mb-5 [@media(min-height:900px)]:lg:mb-4">
          <h1 className="text-white text-3xl font-bold tracking-tight lg:text-2xl [@media(min-height:900px)]:lg:text-[1.375rem]">
            Техника для СВО
          </h1>
          <p className="text-zinc-500 text-sm mt-3 lg:mt-2 lg:text-xs [@media(min-height:900px)]:lg:mt-1.5">
            {modelsForSaleLabel(products.length)}
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-x-4 lg:gap-y-3 [@media(min-height:900px)]:lg:gap-y-2.5">
          {products.map((product) => {
            const title = svoDisplayTitle(product);
            return (
              <Link
                key={product.id}
                href={`/svo/${product.slug}`}
                aria-label={title}
                className="group block rounded-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a]"
              >
                <article className="h-full overflow-hidden transition duration-200 group-hover:opacity-90 group-hover:brightness-110 group-focus-visible:opacity-90 group-focus-visible:brightness-110">
                  <div className="h-52 min-h-[13rem] flex items-center justify-center px-2 py-4 lg:min-h-0 lg:h-[9rem] lg:py-3 [@media(min-height:900px)]:lg:h-[8.25rem]">
                    <img
                      src={product.image}
                      alt=""
                      className="max-h-full w-full object-contain"
                    />
                  </div>
                  <div className="pt-1 pb-2">
                    <p className="text-white text-[11px] sm:text-xs font-semibold uppercase tracking-[0.2em] leading-snug line-clamp-2">
                      {title}
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

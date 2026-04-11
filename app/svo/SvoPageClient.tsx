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
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-16">
        <header className="mb-10">
          <h1 className="text-white text-3xl font-bold tracking-tight">
            Техника для СВО
          </h1>
          <p className="text-zinc-500 text-sm mt-3">
            {modelsForSaleLabel(products.length)}
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
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
                  <div className="h-52 min-h-[13rem] flex items-center justify-center px-2 py-4">
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

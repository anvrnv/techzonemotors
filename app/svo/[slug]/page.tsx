import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import SvoDetailCta from "../SvoDetailCta";
import SvoPageShell from "../SvoPageShell";
import SvoPriceBlock from "../SvoPriceBlock";
import {
  getSvoCatalogProducts,
  getSvoProductBySlug,
  svoDisplayTitle,
} from "@/lib/svo-products";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const products = await getSvoCatalogProducts();
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await getSvoProductBySlug(slug);
  if (!product) {
    return { title: "Техника СВО | TechZone Motors" };
  }
  const title = svoDisplayTitle(product);
  const description = product.description?.trim() || undefined;
  return {
    title: `${title} | TechZone Motors`,
    description,
    openGraph: {
      title,
      description,
    },
  };
}

export default async function SvoProductPage({ params }: Props) {
  const { slug } = await params;
  const product = await getSvoProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const title = svoDisplayTitle(product);
  const description = product.description?.trim();

  return (
    <SvoPageShell>
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link
          href="/svo"
          className="inline-flex text-sm text-zinc-500 hover:text-orange-400 transition-colors mb-10 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0a0a] rounded"
        >
          ← К каталогу СВО
        </Link>

        <div className="rounded-2xl border border-white/[0.08] bg-zinc-900/40 overflow-hidden">
          <div className="min-h-[min(70vw,420px)] max-h-[560px] flex items-center justify-center bg-black/30 px-6 py-10">
            <img
              src={product.image}
              alt={title}
              className="max-h-[min(70vw,520px)] w-full object-contain"
            />
          </div>

          <div className="px-6 py-8 md:px-10 md:py-10 border-t border-white/[0.06]">
            <h1 className="text-white text-2xl md:text-3xl font-bold tracking-tight">
              {title}
            </h1>

            {description ? (
              <p className="text-zinc-400 text-base leading-relaxed mt-5 whitespace-pre-wrap">
                {description}
              </p>
            ) : null}

            <div className="mt-6">
              <SvoPriceBlock
                priceRegular={product.priceRegular}
                priceDiscount={product.priceDiscount}
                large
              />
            </div>

            <div className="mt-8">
              <SvoDetailCta />
            </div>
          </div>
        </div>
      </div>
    </SvoPageShell>
  );
}

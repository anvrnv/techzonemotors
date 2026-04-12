import type { Metadata } from "next";
import { notFound } from "next/navigation";

import SvoDetailCta from "../SvoDetailCta";
import SvoDetailHeader from "../SvoDetailHeader";
import SvoDetailHero from "../SvoDetailHero";
import SvoPageShell from "../SvoPageShell";
import SvoPriceBlock from "../SvoPriceBlock";
import SvoSpecsRow from "../SvoSpecsRow";
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
  const hasSpecsRow = Boolean(
    [
      product.specTorque,
      product.specFuelConsumption,
      product.specMaxSpeed,
      product.specVolume,
    ].some((s) => s?.trim()),
  );

  return (
    <SvoPageShell>
      <div className="mx-auto flex w-full max-w-7xl flex-1 min-h-0 flex-col px-6 py-10 lg:mx-0 lg:max-w-none lg:px-8 lg:py-8 xl:px-12">
        <SvoDetailHeader title={title} showSpecsAnchor={hasSpecsRow} />

        <div className="mt-2 grid min-w-0 gap-10 lg:mt-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(16rem,22rem)] lg:items-start lg:gap-12 xl:grid-cols-[minmax(0,1.45fr)_minmax(17rem,24rem)]">
          <div className="min-w-0">
            <SvoDetailHero
              imageUrl={product.image}
              imageAlt={title}
              dimensionLength={product.dimensionLength}
              dimensionHeight={product.dimensionHeight}
            />
          </div>

          <div className="flex min-w-0 flex-col gap-8 lg:pt-1">
            {description ? (
              <p className="m-0 text-base leading-relaxed text-zinc-400 whitespace-pre-wrap">
                {description}
              </p>
            ) : null}

            <div className="flex flex-col gap-6">
              <SvoPriceBlock
                priceRegular={product.priceRegular}
                priceDiscount={product.priceDiscount}
                large
              />
              <SvoDetailCta />
            </div>
          </div>
        </div>

        {hasSpecsRow ? (
          <section
            id="svo-specs"
            tabIndex={-1}
            aria-label="Технические данные"
            className="scroll-mt-24 mt-14 border-t border-white/[0.08] pt-10 outline-none lg:mt-16 lg:pt-12"
          >
            <SvoSpecsRow
              specTorque={product.specTorque}
              specFuelConsumption={product.specFuelConsumption}
              specMaxSpeed={product.specMaxSpeed}
              specVolume={product.specVolume}
            />
          </section>
        ) : null}
      </div>
    </SvoPageShell>
  );
}

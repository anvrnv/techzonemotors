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
      <div className="max-w-4xl mx-auto px-6 py-10 lg:py-8">
        <SvoDetailHeader title={title} showSpecsAnchor={hasSpecsRow} />

        <SvoDetailHero
          imageUrl={product.image}
          imageAlt={title}
          dimensionLength={product.dimensionLength}
          dimensionHeight={product.dimensionHeight}
        />

        {description ? (
          <p className="text-zinc-400 text-base leading-relaxed mt-8 whitespace-pre-wrap">
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

        {hasSpecsRow ? (
          <section
            id="svo-specs"
            tabIndex={-1}
            aria-label="Технические данные"
            className="scroll-mt-24 outline-none mt-12 pt-8 border-t border-white/[0.08]"
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

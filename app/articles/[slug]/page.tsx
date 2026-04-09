import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import ArticleBody from "../ArticleBody";
import { getArticleBySlug, getArticleSlugs } from "@/lib/articles";

export const revalidate = 60;

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article?.title) {
    return { title: "Статья | TechZone Motors" };
  }
  const description = article.excerpt?.trim() || undefined;
  return {
    title: `${article.title} | TechZone Motors`,
    description,
    openGraph: {
      title: article.title,
      description,
      type: "article",
    },
  };
}

export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article?.title || !article.slug || !Array.isArray(article.body)) {
    notFound();
  }

  return (
    <div className="bg-[#111111] min-h-screen">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <Link
          href="/articles"
          className="inline-flex text-sm text-zinc-500 hover:text-orange-400 transition-colors mb-8"
        >
          ← Ко всем статьям
        </Link>

        <header className="mb-10 pb-8 border-b border-white/10">
          <h1 className="text-white text-3xl md:text-4xl font-bold tracking-tight leading-tight">
            {article.title}
          </h1>
          {article.excerpt ? (
            <p className="text-zinc-400 text-base leading-relaxed mt-4">
              {article.excerpt}
            </p>
          ) : null}
        </header>

        <ArticleBody value={article.body} />
      </div>
    </div>
  );
}

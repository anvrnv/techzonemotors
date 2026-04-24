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
    <div className="min-h-screen bg-background">
      <div className="page-shell section-block">
        <div className="mx-auto max-w-4xl">
          <Link
            href="/articles"
            className="mb-10 inline-flex text-sm text-foreground-subtle transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/50"
          >
            ← Ко всем статьям
          </Link>

          <header className="mb-12 border-b border-border pb-10 md:mb-14 md:pb-12">
            <h1 className="section-heading text-pretty">{article.title}</h1>
            {article.excerpt ? (
              <p className="mt-4 text-base leading-relaxed text-foreground-muted">
                {article.excerpt}
              </p>
            ) : null}
          </header>

          <ArticleBody value={article.body} />
        </div>
      </div>
    </div>
  );
}

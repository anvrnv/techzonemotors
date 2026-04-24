import type { Metadata } from "next";
import Link from "next/link";

import { getArticlesList } from "@/lib/articles";

export const metadata: Metadata = {
  title: "Статьи | TechZone Motors",
  description:
    "Полезные материалы и новости TechZone Motors — гайды, обзоры и обновления.",
};

export const revalidate = 60;

export default async function ArticlesPage() {
  const articles = await getArticlesList();
  const valid = articles.filter((a) => a.slug && a.title);

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-7xl px-6 py-section">
        <h1 className="mb-2 text-3xl font-bold tracking-tight text-foreground">
          Статьи
        </h1>
        <p className="mb-10 text-sm text-foreground-muted">
          Полезные материалы и новости TechZone Motors
        </p>

        {valid.length === 0 ? (
          <div className="rounded-xl border border-border bg-card-raised px-8 py-14 text-center">
            <p className="text-sm leading-relaxed text-foreground-muted">
              Пока нет опубликованных статей. Загляните позже или свяжитесь с нами
              по телефону.
            </p>
          </div>
        ) : (
          <ul className="flex flex-col gap-4">
            {valid.map((article) => (
              <li key={article.slug}>
                <article className="rounded-xl border border-border bg-card p-6 shadow-card transition-all duration-200 hover:border-border-strong hover:shadow-elevated md:p-7">
                  <h2 className="mb-2 text-lg font-semibold leading-snug text-foreground">
                    {article.title}
                  </h2>
                  {article.excerpt ? (
                    <p className="mb-4 line-clamp-3 text-sm leading-relaxed text-foreground-muted">
                      {article.excerpt}
                    </p>
                  ) : null}
                  <Link
                    href={`/articles/${article.slug}`}
                    className="inline-flex text-sm font-medium text-accent transition-colors hover:text-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring/50"
                  >
                    Читать
                  </Link>
                </article>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

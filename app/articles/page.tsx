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
    <div className="bg-[#111111] min-h-screen">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-white text-3xl font-bold tracking-tight mb-2">
          Статьи
        </h1>
        <p className="text-zinc-400 text-sm mb-10">
          Полезные материалы и новости TechZone Motors
        </p>

        {valid.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-zinc-900/40 px-8 py-14 text-center">
            <p className="text-zinc-400 text-sm leading-relaxed">
              Пока нет опубликованных статей. Загляните позже или свяжитесь с нами
              по телефону.
            </p>
          </div>
        ) : (
          <ul className="flex flex-col gap-4">
            {valid.map((article) => (
              <li key={article.slug}>
                <article className="rounded-xl border border-white/5 bg-zinc-800/50 hover:border-white/15 hover:bg-zinc-800/70 transition-all duration-200 p-6 md:p-7">
                  <h2 className="text-white text-lg font-semibold leading-snug mb-2">
                    {article.title}
                  </h2>
                  {article.excerpt ? (
                    <p className="text-zinc-400 text-sm leading-relaxed mb-4 line-clamp-3">
                      {article.excerpt}
                    </p>
                  ) : null}
                  <Link
                    href={`/articles/${article.slug}`}
                    className="inline-flex text-orange-400 text-sm font-medium hover:text-orange-300 transition-colors"
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

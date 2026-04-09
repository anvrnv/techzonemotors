import {
  articleBySlugQuery,
  articlesListQuery,
  articleSlugsQuery,
} from "@/lib/sanity/queries";
import type { SanityArticleDetail, SanityArticleListRow } from "@/lib/sanity/types";
import { getSanityClient } from "@/lib/sanity/client";

export async function getArticlesList(): Promise<SanityArticleListRow[]> {
  const client = getSanityClient();
  if (!client) {
    return [];
  }
  try {
    const rows = await client.fetch<SanityArticleListRow[]>(articlesListQuery);
    return rows ?? [];
  } catch {
    return [];
  }
}

export async function getArticleBySlug(
  slug: string,
): Promise<SanityArticleDetail | null> {
  const client = getSanityClient();
  if (!client) {
    return null;
  }
  try {
    return await client.fetch<SanityArticleDetail | null>(articleBySlugQuery, {
      slug,
    });
  } catch {
    return null;
  }
}

export async function getArticleSlugs(): Promise<string[]> {
  const client = getSanityClient();
  if (!client) {
    return [];
  }
  try {
    const rows = await client.fetch<{ slug: string | null }[]>(
      articleSlugsQuery,
    );
    return (rows ?? [])
      .map((r) => r.slug)
      .filter((s): s is string => Boolean(s));
  } catch {
    return [];
  }
}

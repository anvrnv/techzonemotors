import { getSanityClient } from "@/lib/sanity/client";
import { reviewsQuery } from "@/lib/sanity/queries";
import type { SanityReviewRow } from "@/lib/sanity/types";

export type ReviewData = {
  id: string;
  authorName: string;
  text: string;
  /** Integer 0–10 from CMS; UI uses `ratingTen / 2` for star display (0–5). */
  ratingTen: number;
};

function emptyGrid(): (ReviewData | null)[] {
  return Array.from({ length: 12 }, () => null);
}

function mapRow(row: SanityReviewRow): ReviewData | null {
  const authorName =
    typeof row.authorName === "string" ? row.authorName.trim() : "";
  const text = typeof row.text === "string" ? row.text.trim() : "";
  const raw = row.ratingTen;
  const ratingTen =
    typeof raw === "number" && Number.isFinite(raw) ? Math.round(raw) : NaN;
  if (!row.id || !authorName || !text) {
    return null;
  }
  if (!Number.isInteger(ratingTen) || ratingTen < 0 || ratingTen > 10) {
    return null;
  }
  return { id: row.id, authorName, text, ratingTen };
}

/** Fetches up to 12 published reviews, ordered by `sortOrder`, pads to 12 slots with `null`. */
export async function getReviewsForGrid(): Promise<(ReviewData | null)[]> {
  const client = getSanityClient();
  if (!client) {
    return emptyGrid();
  }
  try {
    const rows = await client.fetch<SanityReviewRow[] | null>(reviewsQuery);
    const list = rows ?? [];
    const filled: ReviewData[] = [];
    for (const row of list) {
      if (filled.length >= 12) break;
      const item = mapRow(row);
      if (item) {
        filled.push(item);
      }
    }
    const out: (ReviewData | null)[] = [...filled];
    while (out.length < 12) {
      out.push(null);
    }
    return out;
  } catch {
    return emptyGrid();
  }
}

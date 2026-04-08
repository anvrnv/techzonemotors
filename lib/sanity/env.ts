/** Next.js подставляет env при старте. Для `tsx`‑скриптов см. `scripts/bootstrap-env.ts`. */
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

export const dataset =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";

/**
 * Studio / CLI need a string project id; use this only for config tooling,
 * not for deciding whether the Next.js app should call Sanity.
 */
export const SANITY_STUDIO_PROJECT_PLACEHOLDER = "missing-project-id";

export function resolveProjectIdForSanityTools(): string {
  return projectId || SANITY_STUDIO_PROJECT_PLACEHOLDER;
}

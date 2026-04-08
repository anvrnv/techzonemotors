import { createImageUrlBuilder } from "@sanity/image-url";

import { dataset, projectId } from "./env";

const builder = projectId
  ? createImageUrlBuilder({ projectId, dataset })
  : null;

/** Sanity image field value from GROQ (has asset reference). */
export function urlForImage(
  source: Record<string, unknown> | null | undefined,
  width = 1200,
): string | null {
  if (!builder || !source) {
    return null;
  }
  return builder.image(source).width(width).quality(85).url();
}

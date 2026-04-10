import type { SchemaTypeDefinition } from "sanity";

import { articleType } from "./article";
import { blockContentType } from "./blockContent";
import { homeCarouselSettingsType } from "./homeCarouselSettings";
import { productType } from "./product";
import { reviewType } from "./review";
import { svoProductType } from "./svoProduct";

export const schemaTypes: SchemaTypeDefinition[] = [
  blockContentType,
  homeCarouselSettingsType,
  productType,
  svoProductType,
  articleType,
  reviewType,
];

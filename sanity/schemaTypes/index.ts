import type { SchemaTypeDefinition } from "sanity";

import { articleType } from "./article";
import { blockContentType } from "./blockContent";
import { homeCarouselSettingsType } from "./homeCarouselSettings";
import { productType } from "./product";
import { svoProductType } from "./svoProduct";

export const schemaTypes: SchemaTypeDefinition[] = [
  blockContentType,
  homeCarouselSettingsType,
  productType,
  svoProductType,
  articleType,
];

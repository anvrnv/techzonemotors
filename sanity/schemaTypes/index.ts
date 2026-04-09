import type { SchemaTypeDefinition } from "sanity";

import { homeCarouselSettingsType } from "./homeCarouselSettings";
import { productType } from "./product";
import { svoProductType } from "./svoProduct";

export const schemaTypes: SchemaTypeDefinition[] = [
  homeCarouselSettingsType,
  productType,
  svoProductType,
];

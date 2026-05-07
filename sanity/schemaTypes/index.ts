import type { SchemaTypeDefinition } from "sanity";

import { articleType } from "./article";
import { blockContentType } from "./blockContent";
import { productType } from "./product";
import { reviewType } from "./review";
import { svoProductType } from "./svoProduct";

export const schemaTypes: SchemaTypeDefinition[] = [
  blockContentType,
  productType,
  svoProductType,
  articleType,
  reviewType,
];

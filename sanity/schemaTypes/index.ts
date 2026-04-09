import type { SchemaTypeDefinition } from "sanity";

import { productType } from "./product";
import { svoProductType } from "./svoProduct";

export const schemaTypes: SchemaTypeDefinition[] = [productType, svoProductType];

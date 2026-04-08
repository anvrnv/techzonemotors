import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";

import { schemaTypes } from "./sanity/schemaTypes";
import { dataset, resolveProjectIdForSanityTools } from "./lib/sanity/env";

export default defineConfig({
  name: "default",
  title: "Techzone Motors",
  basePath: "/studio",
  projectId: resolveProjectIdForSanityTools(),
  dataset,
  schema: { types: schemaTypes },
  plugins: [structureTool()],
});

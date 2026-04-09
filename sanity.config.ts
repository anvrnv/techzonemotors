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
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Контент")
          .items([
            S.listItem()
              .title("Карусель главной")
              .child(
                S.document()
                  .schemaType("homeCarouselSettings")
                  .documentId("homeCarouselSettings")
                  .title("Карусель главной"),
              ),
            S.listItem()
              .title("Каталог товаров")
              .child(S.documentTypeList("product").title("Каталог товаров")),
            S.listItem()
              .title("Техника для СВО")
              .child(
                S.documentTypeList("svoProduct").title("Техника для СВО"),
              ),
          ]),
    }),
  ],
});

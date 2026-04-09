import { defineField, defineType } from "sanity";

export const homeCarouselSettingsType = defineType({
  name: "homeCarouselSettings",
  title: "Карусель главной",
  type: "document",
  fields: [
    defineField({
      name: "items",
      title: "Товары",
      type: "array",
      of: [
        {
          type: "reference",
          to: [{ type: "product" }],
        },
      ],
      options: { layout: "list" },
    }),
  ],
});

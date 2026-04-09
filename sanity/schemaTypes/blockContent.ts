import { defineArrayMember, defineType } from "sanity";

/** Shared Portable Text for articles: headings, lists, marks, links, images. */
export const blockContentType = defineType({
  name: "blockContent",
  title: "Текст статьи",
  type: "array",
  of: [
    defineArrayMember({
      type: "block",
      styles: [
        { title: "Обычный", value: "normal" },
        { title: "Заголовок H2", value: "h2" },
        { title: "Заголовок H3", value: "h3" },
      ],
      lists: [
        { title: "Маркированный", value: "bullet" },
        { title: "Нумерованный", value: "number" },
      ],
      marks: {
        decorators: [
          { title: "Жирный", value: "strong" },
          { title: "Курсив", value: "em" },
        ],
        annotations: [
          {
            name: "link",
            type: "object",
            title: "Ссылка",
            fields: [
              {
                name: "href",
                type: "url",
                title: "URL",
                validation: (Rule) =>
                  Rule.uri({ scheme: ["http", "https", "mailto", "tel"] }),
              },
            ],
          },
        ],
      },
    }),
    defineArrayMember({
      type: "image",
      options: { hotspot: true },
      fields: [
        {
          name: "alt",
          type: "string",
          title: "Альтернативный текст",
          description: "Важно для доступности и SEO",
        },
      ],
    }),
  ],
});

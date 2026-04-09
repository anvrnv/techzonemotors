import { defineField, defineType } from "sanity";

export const articleType = defineType({
  name: "article",
  title: "Статья",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Заголовок",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Краткое описание",
      type: "text",
      rows: 3,
      description: "Для списка статей и meta description (до ~300 символов)",
      validation: (Rule) => Rule.max(300),
    }),
    defineField({
      name: "sortOrder",
      title: "Порядок в списке",
      type: "number",
      description: "Меньше — выше в списке",
      initialValue: 0,
    }),
    defineField({
      name: "body",
      title: "Текст",
      type: "blockContent",
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "excerpt" },
  },
  orderings: [
    {
      title: "Порядок, затем заголовок",
      name: "sortOrderAsc",
      by: [
        { field: "sortOrder", direction: "asc" },
        { field: "title", direction: "asc" },
      ],
    },
  ],
});

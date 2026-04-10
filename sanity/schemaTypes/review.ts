import { defineField, defineType } from "sanity";

export const reviewType = defineType({
  name: "review",
  title: "Отзыв",
  type: "document",
  fields: [
    defineField({
      name: "authorName",
      title: "Имя автора",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "text",
      title: "Текст отзыва",
      type: "text",
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "ratingTen",
      title: "Оценка (0–10)",
      type: "number",
      description:
        "В интерфейсе: 10 → 5 звёзд, 7 → 3,5 звезды (делим на 2). Только целые числа.",
      validation: (Rule) =>
        Rule.required().integer().min(0).max(10),
    }),
    defineField({
      name: "sortOrder",
      title: "Порядок в сетке",
      type: "number",
      description: "Меньше — выше в списке (до 12 отзывов на главной)",
      initialValue: 0,
    }),
  ],
  preview: {
    select: { title: "authorName", subtitle: "text", rating: "ratingTen" },
    prepare({ title, subtitle, rating }) {
      return {
        title: title ?? "Без имени",
        subtitle:
          subtitle && rating != null
            ? (() => {
                const s = String(subtitle);
                const head = s.slice(0, 60);
                const tail = s.length > 60 ? "…" : "";
                return `${head}${tail} · ${rating}/10`;
              })()
            : subtitle
              ? String(subtitle).slice(0, 80)
              : undefined,
      };
    },
  },
  orderings: [
    {
      title: "Порядок, затем имя",
      name: "sortOrderAsc",
      by: [
        { field: "sortOrder", direction: "asc" },
        { field: "authorName", direction: "asc" },
        { field: "_id", direction: "asc" },
      ],
    },
  ],
});

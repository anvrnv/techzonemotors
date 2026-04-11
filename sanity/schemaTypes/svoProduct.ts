import { defineField, defineType } from "sanity";

export const svoProductType = defineType({
  name: "svoProduct",
  title: "Техника СВО",
  type: "document",
  fields: [
    defineField({
      name: "brand",
      title: "Бренд",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "model",
      title: "Модель",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: (doc) =>
          [doc.brand, doc.model].filter(Boolean).join(" ").trim(),
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "name",
      title: "Название",
      type: "string",
      description:
        "Необязательно. На сайте заголовок карточки — «Бренд — Модель»; это поле можно использовать как внутреннюю заметку.",
    }),
    defineField({
      name: "description",
      title: "Описание",
      type: "text",
      rows: 4,
    }),
    defineField({
      name: "image",
      title: "Фото",
      type: "image",
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "sortOrder",
      title: "Порядок в списке",
      type: "number",
      initialValue: 0,
    }),
    defineField({
      name: "priceRegular",
      title: "Цена без скидки",
      type: "string",
      description: 'Например: "89 990 ₽"',
    }),
    defineField({
      name: "priceDiscount",
      title: "Цена со скидкой",
      type: "string",
      description: 'Например: "78 990 ₽"',
    }),
  ],
  preview: {
    select: {
      brand: "brand",
      model: "model",
      media: "image",
    },
    prepare({ brand, model, media }) {
      const b = typeof brand === "string" ? brand.trim() : "";
      const m = typeof model === "string" ? model.trim() : "";
      const title =
        b && m ? `${b} — ${m}` : b || m || "Без названия";
      const subtitle = [b, m].filter(Boolean).join(" ");
      return {
        title,
        subtitle: subtitle || undefined,
        media,
      };
    },
  },
});

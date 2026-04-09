import { defineField, defineType } from "sanity";

export const svoProductType = defineType({
  name: "svoProduct",
  title: "Техника СВО",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Название",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
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
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "priceDiscount",
      title: "Цена со скидкой",
      type: "string",
      description: 'Например: "78 990 ₽"',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "image",
      regular: "priceRegular",
      discount: "priceDiscount",
    },
    prepare({ title, media, regular, discount }) {
      return {
        title,
        media,
        subtitle: [regular, discount].filter(Boolean).join(" → "),
      };
    },
  },
});

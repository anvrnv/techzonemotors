import { DEFAULT_CATALOG_IMAGE_URL, type CatalogProduct } from "@/lib/catalog-product";

/**
 * Сайт использует `image` (локальный путь). Сид с `--with-remote-images` берёт
 * `seedRemoteImageUrl`, если задан, иначе абсолютный `image`.
 */
export type CatalogFallbackRow = CatalogProduct & {
  seedRemoteImageUrl?: string;
};

export const fallbackCatalogProducts: CatalogFallbackRow[] = [
  {
    id: "fallback-1",
    name: "Питбайк Kayo TT140",
    description:
      "Мощный питбайк для трека и бездорожья. Двигатель 140cc с воздушным охлаждением.",
    price: "89 990 ₽",
    image: DEFAULT_CATALOG_IMAGE_URL,
    seedRemoteImageUrl:
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=900&q=85",
  },
  {
    id: "fallback-2",
    name: "Питбайк Apollo RFZ 125",
    description:
      "Классический питбайк с надёжной рамой. Идеален для начинающих гонщиков.",
    price: "64 990 ₽",
    image: DEFAULT_CATALOG_IMAGE_URL,
    seedRemoteImageUrl:
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=900&q=85",
  },
  {
    id: "fallback-3",
    name: "Питбайк BSE J1 140",
    description:
      "Спортивный питбайк с улучшенной подвеской. Подходит для соревнований и тренировок.",
    price: "79 500 ₽",
    image: DEFAULT_CATALOG_IMAGE_URL,
    seedRemoteImageUrl:
      "https://images.unsplash.com/photo-1558981359-219d6364c9c8?w=900&q=85",
  },
  {
    id: "fallback-4",
    name: "Питбайк Motoland FX 125",
    description:
      "Лёгкий и маневренный питбайк для городских трасс. Отличное соотношение цены и качества.",
    price: "58 000 ₽",
    image: DEFAULT_CATALOG_IMAGE_URL,
    seedRemoteImageUrl:
      "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=900&q=85",
  },
  {
    id: "fallback-5",
    name: "Питбайк Kayo K2 160",
    description:
      "Флагманская модель с двигателем 160cc. Максимальная мощность для опытных гонщиков.",
    price: "109 990 ₽",
    image: DEFAULT_CATALOG_IMAGE_URL,
    seedRemoteImageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85",
  },
  {
    id: "fallback-6",
    name: "Питбайк Geon X-Road 125",
    description:
      "Универсальный питбайк для езды по любым дорогам. Надёжный и долговечный.",
    price: "67 500 ₽",
    image: DEFAULT_CATALOG_IMAGE_URL,
    seedRemoteImageUrl:
      "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=900&q=85",
  },
  {
    id: "fallback-7",
    name: "Питбайк BSE S2 140",
    description:
      "Стильный питбайк с хромированными деталями. Привлекает взгляды на любом треке.",
    price: "85 000 ₽",
    image: DEFAULT_CATALOG_IMAGE_URL,
    seedRemoteImageUrl:
      "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?w=900&q=85",
  },
  {
    id: "fallback-8",
    name: "Питбайк Kayo AU160",
    description:
      "Автоматическая коробка передач — идеален для новичков и подростков.",
    price: "88 000 ₽",
    image: DEFAULT_CATALOG_IMAGE_URL,
    seedRemoteImageUrl:
      "https://images.unsplash.com/photo-1525160354320-d8e92641b563?w=900&q=85",
  },
  {
    id: "fallback-9",
    name: "Питбайк Apollo DB-X18",
    description:
      "Классический дизайн с современной начинкой. Для любителей стиля и скорости.",
    price: "69 990 ₽",
    image: DEFAULT_CATALOG_IMAGE_URL,
    seedRemoteImageUrl:
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=900&q=85",
  },
  {
    id: "fallback-10",
    name: "Питбайк BSE Z5 125",
    description:
      "Компактный питбайк с современным дизайном. Подходит для детей и подростков.",
    price: "55 500 ₽",
    image: DEFAULT_CATALOG_IMAGE_URL,
    seedRemoteImageUrl:
      "https://images.unsplash.com/photo-1558981285-6f0c8a05b7ed?w=900&q=85",
  },
  {
    id: "fallback-11",
    name: "Питбайк Kayo K4 140",
    description:
      "Обновлённая модель с усиленной рамой. Отличный выбор для мотокросса.",
    price: "94 990 ₽",
    image: DEFAULT_CATALOG_IMAGE_URL,
    seedRemoteImageUrl:
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=900&q=80",
  },
  {
    id: "fallback-12",
    name: "Питбайк Geon Dakar 140",
    description:
      "Эндуро-стиль с мощным двигателем. Покоряет любое бездорожье.",
    price: "82 000 ₽",
    image: DEFAULT_CATALOG_IMAGE_URL,
    seedRemoteImageUrl:
      "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=900&q=80",
  },
  {
    id: "fallback-13",
    name: "Питбайк Motoland PB140",
    description:
      "Спортивная модель с инвертированными вилками. Для продвинутых гонщиков.",
    price: "99 990 ₽",
    image: DEFAULT_CATALOG_IMAGE_URL,
    seedRemoteImageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80",
  },
  {
    id: "fallback-14",
    name: "Питбайк BRZ X5 140",
    description:
      "Гидравлические тормоза и усиленная подвеска. Максимальный контроль на трассе.",
    price: "76 500 ₽",
    image: DEFAULT_CATALOG_IMAGE_URL,
    seedRemoteImageUrl:
      "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=900&q=80",
  },
  {
    id: "fallback-15",
    name: "Питбайк Pit Pro 140",
    description:
      "Надёжный питбайк для начинающих. Прочная рама и проверенный двигатель.",
    price: "72 000 ₽",
    image: DEFAULT_CATALOG_IMAGE_URL,
    seedRemoteImageUrl:
      "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?w=900&q=80",
  },
  {
    id: "fallback-16",
    name: "Питбайк Motoland X140",
    description:
      "Питбайк с улучшенными тормозами и широкими покрышками. Высокая надёжность.",
    price: "78 000 ₽",
    image: DEFAULT_CATALOG_IMAGE_URL,
    seedRemoteImageUrl:
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=900&q=80",
  },
];

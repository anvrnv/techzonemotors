import { DEFAULT_CATALOG_IMAGE_URL } from "@/lib/catalog-product";

/**
 * Статический список СВО при отсутствии Sanity / ошибке / пустом ответе.
 * `image` — локальная заглушка; `seedRemoteImageUrl` — для `scripts/seed-sanity-svo.ts --with-remote-images`.
 */
export type SvoFallbackRow = {
  id: string;
  name: string;
  description: string;
  priceRegular: string;
  priceDiscount: string;
  image: string;
  seedRemoteImageUrl?: string;
};

export const fallbackSvoProducts: SvoFallbackRow[] = [
  {
    id: "fallback-svo-1",
    name: "Питбайк Kayo TT140",
    description:
      "Мощный питбайк для трека и бездорожья. Двигатель 140cc с воздушным охлаждением.",
    priceRegular: "89 990 ₽",
    priceDiscount: "78 990 ₽",
    image: DEFAULT_CATALOG_IMAGE_URL,
    seedRemoteImageUrl:
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=900&q=85",
  },
  {
    id: "fallback-svo-2",
    name: "Питбайк Apollo RFZ 125",
    description:
      "Классический питбайк с надёжной рамой. Идеален для начинающих гонщиков.",
    priceRegular: "64 990 ₽",
    priceDiscount: "56 990 ₽",
    image: DEFAULT_CATALOG_IMAGE_URL,
    seedRemoteImageUrl:
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=900&q=85",
  },
  {
    id: "fallback-svo-3",
    name: "Питбайк BSE J1 140",
    description:
      "Спортивный питбайк с улучшенной подвеской. Подходит для соревнований и тренировок.",
    priceRegular: "79 990 ₽",
    priceDiscount: "70 990 ₽",
    image: DEFAULT_CATALOG_IMAGE_URL,
    seedRemoteImageUrl:
      "https://images.unsplash.com/photo-1558981359-219d6364c9c8?w=900&q=85",
  },
  {
    id: "fallback-svo-4",
    name: "Питбайк Motoland FX 125",
    description:
      "Лёгкий и маневренный питбайк для городских трасс. Отличное соотношение цены и качества.",
    priceRegular: "57 990 ₽",
    priceDiscount: "50 990 ₽",
    image: DEFAULT_CATALOG_IMAGE_URL,
    seedRemoteImageUrl:
      "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=900&q=85",
  },
  {
    id: "fallback-svo-5",
    name: "Питбайк Kayo K2 160",
    description:
      "Флагманская модель с двигателем 160cc. Максимальная мощность для опытных гонщиков.",
    priceRegular: "109 990 ₽",
    priceDiscount: "96 990 ₽",
    image: DEFAULT_CATALOG_IMAGE_URL,
    seedRemoteImageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85",
  },
  {
    id: "fallback-svo-6",
    name: "Питбайк Geon X-Road 125",
    description:
      "Универсальный питбайк для езды по любым дорогам. Надёжный и долговечный.",
    priceRegular: "67 990 ₽",
    priceDiscount: "59 990 ₽",
    image: DEFAULT_CATALOG_IMAGE_URL,
    seedRemoteImageUrl:
      "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=900&q=85",
  },
  {
    id: "fallback-svo-7",
    name: "Питбайк BSE S2 140",
    description:
      "Стильный питбайк с хромированными деталями. Привлекает взгляды на любом треке.",
    priceRegular: "84 990 ₽",
    priceDiscount: "74 990 ₽",
    image: DEFAULT_CATALOG_IMAGE_URL,
    seedRemoteImageUrl:
      "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?w=900&q=85",
  },
  {
    id: "fallback-svo-8",
    name: "Питбайк Kayo AU160",
    description:
      "Автоматическая коробка передач — идеален для новичков и подростков.",
    priceRegular: "87 990 ₽",
    priceDiscount: "77 990 ₽",
    image: DEFAULT_CATALOG_IMAGE_URL,
    seedRemoteImageUrl:
      "https://images.unsplash.com/photo-1525160354320-d8e92641b563?w=900&q=85",
  },
  {
    id: "fallback-svo-9",
    name: "Питбайк Apollo DB-X18",
    description:
      "Классический дизайн с современной начинкой. Для любителей стиля и скорости.",
    priceRegular: "69 990 ₽",
    priceDiscount: "61 990 ₽",
    image: DEFAULT_CATALOG_IMAGE_URL,
    seedRemoteImageUrl:
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=900&q=85",
  },
  {
    id: "fallback-svo-10",
    name: "Питбайк BSE Z5 125",
    description:
      "Компактный питбайк с современным дизайном. Подходит для детей и подростков.",
    priceRegular: "54 990 ₽",
    priceDiscount: "47 990 ₽",
    image: DEFAULT_CATALOG_IMAGE_URL,
    seedRemoteImageUrl:
      "https://images.unsplash.com/photo-1558981285-6f0c8a05b7ed?w=900&q=85",
  },
  {
    id: "fallback-svo-11",
    name: "Питбайк Kayo K4 140",
    description:
      "Обновлённая модель с усиленной рамой. Отличный выбор для мотокросса.",
    priceRegular: "94 990 ₽",
    priceDiscount: "83 990 ₽",
    image: DEFAULT_CATALOG_IMAGE_URL,
    seedRemoteImageUrl:
      "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=900&q=80",
  },
  {
    id: "fallback-svo-12",
    name: "Питбайк Geon Dakar 140",
    description:
      "Эндуро-стиль с мощным двигателем. Покоряет любое бездорожье.",
    priceRegular: "81 990 ₽",
    priceDiscount: "71 990 ₽",
    image: DEFAULT_CATALOG_IMAGE_URL,
    seedRemoteImageUrl:
      "https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=900&q=80",
  },
  {
    id: "fallback-svo-13",
    name: "Питбайк Motoland PB140",
    description:
      "Спортивная модель с инвертированными вилками. Для продвинутых гонщиков.",
    priceRegular: "99 990 ₽",
    priceDiscount: "87 990 ₽",
    image: DEFAULT_CATALOG_IMAGE_URL,
    seedRemoteImageUrl:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=80",
  },
  {
    id: "fallback-svo-14",
    name: "Питбайк BRZ X5 140",
    description:
      "Гидравлические тормоза и усиленная подвеска. Максимальный контроль на трассе.",
    priceRegular: "76 990 ₽",
    priceDiscount: "67 990 ₽",
    image: DEFAULT_CATALOG_IMAGE_URL,
    seedRemoteImageUrl:
      "https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=900&q=80",
  },
  {
    id: "fallback-svo-15",
    name: "Питбайк Pit Pro 140",
    description:
      "Надёжный питбайк для начинающих. Прочная рама и проверенный двигатель.",
    priceRegular: "71 990 ₽",
    priceDiscount: "63 990 ₽",
    image: DEFAULT_CATALOG_IMAGE_URL,
    seedRemoteImageUrl:
      "https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?w=900&q=80",
  },
  {
    id: "fallback-svo-16",
    name: "Питбайк Motoland X140",
    description:
      "Питбайк с улучшенными тормозами и широкими покрышками. Высокая надёжность.",
    priceRegular: "77 990 ₽",
    priceDiscount: "68 990 ₽",
    image: DEFAULT_CATALOG_IMAGE_URL,
    seedRemoteImageUrl:
      "https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=900&q=80",
  },
];

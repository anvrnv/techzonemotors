import { DEFAULT_CATALOG_IMAGE_URL } from "@/lib/catalog-product";

/**
 * Статический список СВО при отсутствии Sanity / ошибке / пустом ответе.
 * Ровно 9 позиций, уникальные slug. `image` — локальная заглушка;
 * `seedRemoteImageUrl` — для `scripts/seed-sanity-svo.ts --with-remote-images`.
 */
export type SvoFallbackRow = {
  id: string;
  slug: string;
  brand: string;
  model: string;
  name?: string;
  description: string;
  priceRegular?: string;
  priceDiscount?: string;
  image: string;
  seedRemoteImageUrl?: string;
};

export const fallbackSvoProducts: SvoFallbackRow[] = [
  {
    id: "fallback-svo-1",
    slug: "kayo-tt140",
    brand: "Kayo",
    model: "TT140",
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
    slug: "apollo-rfz-125",
    brand: "Apollo",
    model: "RFZ 125",
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
    slug: "bse-j1-140",
    brand: "BSE",
    model: "J1 140",
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
    slug: "motoland-fx-125",
    brand: "Motoland",
    model: "FX 125",
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
    slug: "kayo-k2-160",
    brand: "Kayo",
    model: "K2 160",
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
    slug: "geon-x-road-125",
    brand: "Geon",
    model: "X-Road 125",
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
    slug: "bse-s2-140",
    brand: "BSE",
    model: "S2 140",
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
    slug: "kayo-au160",
    brand: "Kayo",
    model: "AU160",
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
    slug: "apollo-db-x18",
    brand: "Apollo",
    model: "DB-X18",
    description:
      "Классический дизайн с современной начинкой. Для любителей стиля и скорости.",
    priceRegular: "69 990 ₽",
    priceDiscount: "61 990 ₽",
    image: DEFAULT_CATALOG_IMAGE_URL,
    seedRemoteImageUrl:
      "https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=900&q=85",
  },
];

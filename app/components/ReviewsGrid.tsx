const reviews = [
  {
    id: 1,
    name: "Алексей М.",
    stars: 5,
    text: "Заказал Kayo TT140, доставили за 3 дня. Качество отличное, сборка аккуратная. Однозначно рекомендую этот магазин!",
    colSpan: "md:col-span-3",
  },
  {
    id: 2,
    name: "Дмитрий К.",
    stars: 5,
    text: "Брал Apollo RFZ для сына. Ребёнок в восторге! Техника надёжная, цена честная. Спасибо TechZone Motors!",
    colSpan: "md:col-span-3",
  },
  {
    id: 3,
    name: "Светлана Р.",
    stars: 4,
    text: "Хороший выбор моделей, удобный сайт. Менеджер помог определиться с выбором. Всё понравилось, вернусь снова.",
    colSpan: "md:col-span-4",
  },
  {
    id: 4,
    name: "Игорь В.",
    stars: 5,
    text: "Уже второй раз покупаю здесь питбайк. Сервис на высшем уровне, всегда на связи. Лучший магазин в городе!",
    colSpan: "md:col-span-4",
  },
  {
    id: 5,
    name: "Мария Т.",
    stars: 5,
    text: "Подарили мужу BSE J1 на день рождения. Он в восторге! Упакован надёжно, доставка без нареканий.",
    colSpan: "md:col-span-3",
  },
  {
    id: 6,
    name: "Сергей Н.",
    stars: 4,
    text: "Хорошее соотношение цены и качества. Питбайк пришёл с небольшой задержкой, но техподдержка всё объяснила.",
    colSpan: "md:col-span-3",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5 text-amber-400 text-lg">
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i}>{i < count ? "★" : "☆"}</span>
      ))}
    </div>
  );
}

export default function ReviewsGrid() {
  return (
    <section className="w-full max-w-7xl mx-auto px-6 py-16">
      <div className="text-center mb-10">
        <h2 className="text-white text-3xl font-bold tracking-tight">
          Отзывы наших клиентов
        </h2>
        <p className="text-zinc-400 mt-2 text-base">
          Что говорят о нас покупатели
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-10 gap-4">
        {reviews.map((review) => (
          <div
            key={review.id}
            className={`${review.colSpan} bg-zinc-800/60 border border-white/10 rounded-2xl p-5 md:p-6 flex flex-col gap-3`}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-white font-semibold">{review.name}</span>
              <StarRating count={review.stars} />
            </div>
            <p className="text-zinc-300 text-sm leading-relaxed">{review.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

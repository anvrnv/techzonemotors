export default function SvoPriceBlock({
  priceRegular,
  priceDiscount,
  large = false,
}: {
  priceRegular?: string;
  priceDiscount?: string;
  large?: boolean;
}) {
  const reg = priceRegular?.trim();
  const disc = priceDiscount?.trim();

  const display = disc ?? reg;
  if (!display) {
    return null;
  }

  const sizeClass = large
    ? "text-sm font-bold uppercase leading-snug tracking-[0.2em] sm:text-base"
    : "text-xs font-bold uppercase leading-snug tracking-[0.2em] sm:text-sm";

  return (
    <div
      className={`flex flex-wrap items-baseline gap-x-3 gap-y-1 ${large ? "" : "mt-1"}`}
    >
      <span className={`whitespace-nowrap text-white ${sizeClass}`}>
        {display}
      </span>
    </div>
  );
}

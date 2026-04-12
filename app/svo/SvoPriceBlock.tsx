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
  if (!reg && !disc) {
    return null;
  }
  return (
    <div className={`flex flex-wrap items-baseline gap-x-3 gap-y-1 ${large ? "" : "mt-1"}`}>
      {reg ? (
        <span
          className={`text-zinc-500 line-through ${large ? "text-base" : "text-xs"}`}
        >
          {reg}
        </span>
      ) : null}
      {disc ? (
        <span
          className={`font-semibold tracking-tight text-zinc-100 ${large ? "text-2xl" : "text-base"}`}
        >
          {disc}
        </span>
      ) : null}
    </div>
  );
}

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
    <div className={`flex items-center gap-2 flex-wrap ${large ? "" : "mt-1"}`}>
      {reg ? (
        <span
          className={`text-zinc-500 line-through ${large ? "text-lg" : "text-xs"}`}
        >
          {reg}
        </span>
      ) : null}
      {disc ? (
        <span
          className={`text-green-400 font-bold ${large ? "text-2xl" : "text-base"}`}
        >
          {disc}
        </span>
      ) : null}
    </div>
  );
}

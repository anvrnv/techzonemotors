type Props = {
  specTorque?: string;
  specFuelConsumption?: string;
  specMaxSpeed?: string;
  specVolume?: string;
};

const specLineClass =
  "text-[10px] font-normal uppercase leading-snug tracking-[0.2em] text-zinc-400";

export default function SvoSpecsRow({
  specTorque,
  specFuelConsumption,
  specMaxSpeed,
  specVolume,
}: Props) {
  const entries = [
    { label: "Крутящий момент", value: specTorque },
    { label: "Расход", value: specFuelConsumption },
    { label: "Макс. скорость", value: specMaxSpeed },
    { label: "Объём", value: specVolume },
  ]
    .map((e) => ({
      label: e.label,
      value: e.value?.trim() ?? "",
    }))
    .filter((e) => e.value.length > 0);

  if (entries.length === 0) {
    return null;
  }

  return (
    <ul className="m-0 flex list-none flex-wrap items-center justify-center gap-x-6 gap-y-3 p-0 sm:justify-start lg:gap-x-10">
      {entries.map((item) => (
        <li key={item.label} className="text-center sm:text-left">
          <span className={specLineClass}>
            {item.label}
            <span className="mx-2 text-zinc-600" aria-hidden>
              ·
            </span>
            {item.value}
          </span>
        </li>
      ))}
    </ul>
  );
}

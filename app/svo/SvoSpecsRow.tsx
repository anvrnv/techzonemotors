type Props = {
  specTorque?: string;
  specFuelConsumption?: string;
  specMaxSpeed?: string;
  specVolume?: string;
};

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
    <ul className="m-0 list-none flex flex-wrap items-baseline justify-center gap-y-2 p-0 sm:justify-start">
      {entries.map((item) => (
        <li
          key={item.label}
          className="flex items-baseline before:mr-2 before:text-zinc-600 before:text-xs before:leading-none before:content-['·'] first:before:hidden"
        >
          <span className="inline-flex flex-col sm:flex-row sm:items-baseline sm:gap-2 text-center sm:text-left">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
              {item.label}
            </span>
            <span className="text-sm text-zinc-200 sm:mt-0 mt-0.5">
              {item.value}
            </span>
          </span>
        </li>
      ))}
    </ul>
  );
}

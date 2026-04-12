import { Fragment } from "react";

type Props = {
  specTorque?: string;
  specFuelConsumption?: string;
  specMaxSpeed?: string;
  specVolume?: string;
};

const itemClass =
  "text-xs font-normal uppercase leading-snug tracking-[0.2em] text-zinc-300 sm:text-sm";

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
    <ul className="m-0 flex list-none flex-wrap items-center justify-center gap-y-3 p-0">
      {entries.map((item, index) => (
        <Fragment key={item.label}>
          {index > 0 ? (
            <li
              className="mx-3 list-none text-zinc-600 select-none sm:mx-4"
              aria-hidden
            >
              ·
            </li>
          ) : null}
          <li className="list-none text-center">
            <span className={itemClass}>
              <span className="font-bold">{item.label}</span>{" "}
              <span className="font-normal">{item.value}</span>
            </span>
          </li>
        </Fragment>
      ))}
    </ul>
  );
}

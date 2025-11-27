import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import type { CardRarity } from "@lib";

interface StatCardProps {
  icon: IconProp;
  label: string;
  value: string | number;
  rarity?: CardRarity;
}

export default function StatCard({
  icon,
  label,
  value,
  rarity,
}: Readonly<StatCardProps>) {
  if (rarity) {
    return (
      <div
        className={`rounded-lg border p-3 text-center`}
        style={{
          borderColor: `color-mix(in oklch, var(--color-rarity-${rarity}) 30%, transparent)`,
          background: `linear-gradient(to bottom right, color-mix(in oklch, var(--color-rarity-${rarity}) 20%, transparent), color-mix(in oklch, var(--color-rarity-${rarity}) 20%, black 80%))`,
        }}
      >
        <div className="mb-1 flex justify-center">
          <FontAwesomeIcon
            icon={icon}
            className="h-5 w-5"
            style={{ color: `var(--color-rarity-${rarity})` }}
          />
        </div>
        <p className="text-xs text-stone-400">{label}</p>
        <p
          className="text-2xl"
          style={{ color: `var(--color-rarity-${rarity})` }}
        >
          {value}
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-purple-500/30 bg-gradient-to-br from-purple-600/20 to-purple-900/20 p-3 text-center">
      <div className="mb-1 flex justify-center">
        <FontAwesomeIcon icon={icon} className="h-5 w-5 text-purple-400" />
      </div>
      <p className="text-xs text-stone-400">{label}</p>
      <p className="text-2xl text-purple-300">{value}</p>
    </div>
  );
}

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";

interface CombatStatCardProps {
  icon: IconProp;
  label: string;
  value: string | number;
  colorScheme: "red" | "green" | "blue" | "cyan";
}

const colorClasses = {
  red: {
    border: "border-red-500/30",
    bg: "bg-gradient-to-br from-red-600/20 to-red-900/20",
    icon: "text-red-400",
    text: "text-red-300",
  },
  green: {
    border: "border-green-500/30",
    bg: "bg-gradient-to-br from-green-600/20 to-green-900/20",
    icon: "text-green-400",
    text: "text-green-300",
  },
  blue: {
    border: "border-blue-500/30",
    bg: "bg-gradient-to-br from-blue-600/20 to-blue-900/20",
    icon: "text-blue-400",
    text: "text-blue-300",
  },
  cyan: {
    border: "border-cyan-500/30",
    bg: "bg-gradient-to-br from-cyan-600/20 to-cyan-900/20",
    icon: "text-cyan-400",
    text: "text-cyan-300",
  },
};

export default function CombatStatCard({
  icon,
  label,
  value,
  colorScheme,
}: Readonly<CombatStatCardProps>) {
  const colors = colorClasses[colorScheme];

  return (
    <div className={`rounded-lg border ${colors.border} ${colors.bg} p-3`}>
      <div className="mb-1 flex items-center gap-2">
        <FontAwesomeIcon icon={icon} className={`h-4 w-4 ${colors.icon}`} />
        <p className="text-xs uppercase tracking-wide text-stone-400">
          {label}
        </p>
      </div>
      <p className={`text-2xl tracking-tighter ${colors.text}`}>{value}</p>
    </div>
  );
}

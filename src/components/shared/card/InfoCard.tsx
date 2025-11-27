import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import type { ReactNode } from "react";

interface InfoCardProps {
  icon: IconProp;
  label: string;
  children: ReactNode;
}

export default function InfoCard({
  icon,
  label,
  children,
}: Readonly<InfoCardProps>) {
  return (
    <div className="w-full rounded-lg border border-stone-600/50 bg-stone-800/50 p-3">
      <div className="mb-2 flex items-center gap-2">
        <FontAwesomeIcon icon={icon} className="h-4 w-4 text-stone-400" />
        <p className="text-xs uppercase tracking-wide text-stone-400">
          {label}
        </p>
      </div>
      {children}
    </div>
  );
}

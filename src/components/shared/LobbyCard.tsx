import type { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Card } from "@heroui/react";
import { useNavigate } from "react-router-dom";

interface LobbyCardProps {
  to: string;
  title: string;
  icon: IconProp;
  gradientClasses: string;
}

export default function LobbyCard({
  to,
  title,
  icon,
  gradientClasses,
}: Readonly<LobbyCardProps>) {
  const navigate = useNavigate();

  return (
    <Card
      isPressable
      onPress={() => navigate(to)}
      className="w-full p-6 bg-background-secondary border-1 border-muted group hover:scale-[1.02] transition-transform duration-300"
    >
      <div className="flex flex-col items-center gap-5">
        <div
          className={`h-16 w-16 rounded-full bg-gradient-to-br ${gradientClasses} flex items-center justify-center group-hover:-translate-y-1 transition-transform duration-300`}
        >
          <FontAwesomeIcon icon={icon} size="xl" className="text-white" />
        </div>
        <span className="text-xl font-bold text-foreground">{title}</span>
      </div>
    </Card>
  );
}

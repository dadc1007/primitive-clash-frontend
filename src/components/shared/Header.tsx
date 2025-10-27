import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Badge, Card } from "@heroui/react";
import { useAuth } from "@hooks";
import prehistoricWarrior from "@assets/prehistoric-warrior-avatar.jpg";

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="relative z-10 p-4 bg-background-secondary border-b-1 border-muted">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Player info */}
        <div className="flex items-center gap-5">
          <Badge
            content={user?.level}
            placement="bottom-right"
            classNames={{
              badge: "bg-trophies border-black text-black",
            }}
          >
            <Avatar
              size="lg"
              isBordered
              src={prehistoricWarrior}
              classNames={{
                base: "ring-trophies ring-offset-trophies",
              }}
            />
          </Badge>
          <div>
            <h2 className="text-foreground font-bold">{user?.username}</h2>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon
                icon={["fas", "trophy"]}
                className="text-trophies"
              />
              <p className="text-trophies">{user?.trophies}</p>
            </div>
          </div>
        </div>

        {/* Resources */}
        <div className="flex items-center gap-4">
          <Card className="bg-background-secondary border-1 border-trophies px-4 py-2 flex items-center gap-2">
            <FontAwesomeIcon
              icon={["fas", "coins"]}
              className="text-trophies"
            />
            <span className="font-bold text-foreground">{user?.gold}</span>
          </Card>
          <Card className="bg-background-secondary border-1 border-gems px-4 py-2 flex items-center gap-2">
            <FontAwesomeIcon icon={["fas", "gem"]} className="text-gems" />
            <span className="font-bold text-foreground">{user?.gems}</span>
          </Card>
        </div>
      </div>
    </header>
  );
}

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Avatar, Badge, Card } from "@heroui/react";
import { useAuth } from "@hooks";
import prehistoricWarrior from "@assets/prehistoric-warrior-avatar.jpg";

export default function Header() {
  const { user } = useAuth();

  return (
    <header className="relative z-10 p-4 border-b-2 glass-panel-amber">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Player info */}
        <div className="flex items-center gap-5">
          <Badge
            content={5}
            placement="bottom-right"
            classNames={{
              badge: "bg-amber-500 border-black",
            }}
          >
            <Avatar
              size="lg"
              isBordered
              src={prehistoricWarrior}
              classNames={{
                base: "ring-amber-500 ring-offset-amber-500",
              }}
            />
          </Badge>
          <div>
            <h2 className="text-white font-bold">{user?.username}</h2>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon
                icon={["fas", "trophy"]}
                className="text-amber-500"
              />
              <p className="text-amber-500">0</p>
            </div>
          </div>
        </div>

        {/* Resources */}
        <div className="flex items-center gap-4">
          <Card className="border-2 bg-stone-800/90 border-amber-700/50 px-4 py-2 flex items-center gap-2">
            <FontAwesomeIcon
              icon={["fas", "coins"]}
              className="text-yellow-500"
            />
            <span className="font-bold text-amber-100">{user?.gold}</span>
          </Card>
          <Card className="border-2 bg-stone-800/90 border-purple-700/50 px-4 py-2 flex items-center gap-2">
            <FontAwesomeIcon
              icon={["fas", "gem"]}
              className="text-purple-400"
            />
            <span className="font-bold text-amber-100">{user?.gems}</span>
          </Card>
        </div>
      </div>
    </header>
  );
}

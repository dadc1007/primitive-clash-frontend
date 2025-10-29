import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button, Image } from "@heroui/react";
import arena from "@assets/arena.jpg";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { LobbyCard } from "@components/shared";

export default function LobbyPage() {
  return (
    <div className="space-y-10">
      <div className="flex flex-col items-center mx-auto">
        <Image isBlurred src={arena} height={400} width={400} />
        <Button
          color="primary"
          size="lg"
          startContent={
            //   <FontAwesomeIcon icon={["fas", "magnifying-glass"]} />
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          }
        >
          Batalla
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-4 mx-auto">
        <LobbyCard
          to="/collection"
          title="Coleccion"
          icon={["fas", "layer-group"]}
          gradientClasses="from-amber-600 to-orange-700"
        />
        <LobbyCard
          to="/shop"
          title="Tienda"
          icon={["fas", "store"]}
          gradientClasses="from-blue-600 to-blue-800"
        />
        <LobbyCard
          to="/friends"
          title="Amigos"
          icon={["fas", "users"]}
          gradientClasses="from-green-600 to-green-800"
        />
        <LobbyCard
          to="/history"
          title="Historial"
          icon={["fas", "clock-rotate-left"]}
          gradientClasses="from-purple-600 to-purple-800"
        />
      </div>
    </div>
  );
}

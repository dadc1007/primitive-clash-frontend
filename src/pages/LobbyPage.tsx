import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert, Button, Image } from "@heroui/react";
import arena from "@assets/arena.jpg";
import { LobbyCard } from "@components/shared";
import { useNavigate } from "react-router-dom";
import { useAuth, useMatchmaking } from "@hooks";
import { useEffect } from "react";
import { log } from "@utils";

export default function LobbyPage() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const { isSearching, matchData, startSearch, disconnect, error } =
    useMatchmaking(`${import.meta.env.VITE_HUB_URL}/matchmaking`);

  useEffect(() => {
    if (matchData) {
      log("Partida encontrada:", matchData);
      const dataToSend = `${matchData.sessionId}|${matchData.userId}|${`${
        import.meta.env.VITE_HUB_URL
      }/game`}`;
      navigate("/game", { state: { connectionData: dataToSend } });
    }
  }, [matchData, navigate]);

  const handleSearch = async () => {
    if (!user) return;
    if (isSearching) {
      await disconnect();
    } else {
      await startSearch(user.userId);
    }
  };

  return (
    <div className="space-y-10">
      <div className="flex flex-col items-center mx-auto">
        <Image isBlurred src={arena} height={400} width={400} />
        <Button
          color="primary"
          size="lg"
          startContent={
            !isSearching && (
              <FontAwesomeIcon icon={["fas", "magnifying-glass"]} />
            )
          }
          onPress={handleSearch}
          isLoading={isSearching}
        >
          {isSearching ? "Buscando partida..." : "Buscar Batalla"}
        </Button>

        {error && (
          <Alert
            color="danger"
            title={error || "Ocurrió un error inesperado."}
          />
        )}
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

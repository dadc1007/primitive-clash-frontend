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

      const token = localStorage.getItem("msalAccessToken");
      const dataToSend = `${matchData.sessionId}|${matchData.userId}|${token}|${
        import.meta.env.VITE_HUB_URL
      }/game`;

      navigate("/game", { state: { connectionData: dataToSend } });
    }
  }, [matchData, navigate]);

  const handleSearch = async () => {
    if (!user) return;

    if (isSearching) {
      await disconnect();
    } else {
      await startSearch();
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
      <div className="flex items-center justify-center">
        <LobbyCard
          to="/collection"
          title="Coleccion"
          icon={["fas", "layer-group"]}
          gradientClasses="from-amber-600 to-orange-700"
        />
      </div>
    </div>
  );
}

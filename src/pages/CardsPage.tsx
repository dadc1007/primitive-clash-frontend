import { Elixir, GameCard } from "@components/shared";
import MainLayout from "@layouts/MainLayout";
import primitiveWarrior from "@assets/prehistoric-warrior.jpg";
import { Button, CircularProgress } from "@heroui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useAuth, useDeck } from "@hooks";
import { useEffect } from "react";
import { logError } from "@utils";

export default function CardsPage() {
  const { user } = useAuth();
  const userId = user?.userId ?? "";
  const { data, isLoading, isError, error } = useDeck(userId);

  useEffect(() => {
    if (isError && error) {
      logError(`Error al cargar el mazo del usuario ${userId}:`, error.message);
    }
  }, [isError, error, userId]);

  const gameCards = data?.cards.map((card) => (
    <GameCard
      key={card.playerCardId}
      imageUrl={primitiveWarrior}
      level={card.level}
      rarity={card.rarity}
      elixir={card.elixirCost}
    />
  ));

  return (
    <MainLayout
      content={
        <div className="space-y-10">
          {/* Header */}
          <div className="flex items-center w-full relative">
            <Button
              size="lg"
              variant="light"
              startContent={
                <FontAwesomeIcon icon={["fas", "arrow-left"]}></FontAwesomeIcon>
              }
            >
              Volver
            </Button>
            <h2
              className={`text-5xl font-bold tracking-tighter absolute left-1/2 -translate-x-1/2 z-10`}
              style={{ fontFamily: "var(--font-bebas)" }}
            >
              Mi mazo
            </h2>
          </div>

          {isLoading && (
            <div className="flex flex-col items-center justify-center h-[70vh]">
              <CircularProgress
                color="default"
                size="lg"
                label="Cargando tu mazo..."
              />
            </div>
          )}

          {!isLoading && (isError || !data) && (
            <div className="flex flex-col items-center justify-center gap-1 h-[70vh]">
              <FontAwesomeIcon icon={["fas", "xmark"]} size="3x" />
              <p>Hubo un error al cargar el mazo. Intenta nuevamente.</p>
            </div>
          )}

          {/* Deck */}
          {!isError && data && (
            <div className="space-y-10">
              <div className="grid grid-cols-4 gap-6">{gameCards}</div>
              <div className="flex items-center justify-center gap-3 p-4 text-center text-white border-2 rounded-large glass-panel-amber">
                <p>Costo medio de elixir: {data.averageElixirCost}</p>
                <div className="h-4 w-4">
                  <Elixir />
                </div>
              </div>
            </div>
          )}
        </div>
      }
    />
  );
}

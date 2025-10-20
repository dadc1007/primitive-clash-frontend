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
              className="text-primary-foreground"
              startContent={
                <FontAwesomeIcon icon={["fas", "arrow-left"]}></FontAwesomeIcon>
              }
            >
              Volver
            </Button>
            <h2
              className={`text-5xl font-bold text-primary-foreground tracking-tighter absolute left-1/2 -translate-x-1/2 z-10`}
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
                className="text-primary-foreground"
                classNames={{
                  indicator: "text-primary-foreground",
                  track: "text-primary-foreground/10",
                }}
              />
            </div>
          )}

          {!isLoading && (isError || !data) && (
            <div className="flex flex-col items-center justify-center gap-1 h-[70vh]">
              <FontAwesomeIcon
                icon={["fas", "xmark"]}
                size="3x"
                className="text-primary-foreground"
              />
              <p className="text-primary-foreground">
                Hubo un error al cargar el mazo. Intenta nuevamente.
              </p>
            </div>
          )}

          {/* Deck */}
          {!isError && data && (
            <div className="space-y-10">
              <div className="grid grid-cols-4 gap-6">{gameCards}</div>
              <div className="flex items-center justify-center gap-3 border-2 rounded-large border-amber-600/50 bg-gradient-to-br from-stone-800/90 to-stone-900/90 p-4 text-center backdrop-blur-sm text-white">
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

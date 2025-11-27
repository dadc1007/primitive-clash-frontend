import { Card, CardFooter, Image, useDisclosure } from "@heroui/react";
import type { CardRarity } from "@lib";
import { rarityClasses } from "@utils/rarityMapping.utils";
import { useCard } from "@hooks";
import { CardDetailsModal, Elixir } from "@components/shared/card";

interface GameCardProps {
  cardId: string;
  imageUrl: string;
  level: number;
  rarity: CardRarity;
  elixir: number;
}

export default function GameCard({
  cardId,
  imageUrl,
  level,
  rarity,
  elixir,
}: Readonly<GameCardProps>) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { border, shadow } = rarityClasses[rarity];
  const { data: cardDetails } = useCard(cardId);

  return (
    <>
      <div className="relative w-full h-64" onClick={onOpen}>
        <div className="w-8 h-8 absolute z-20 -translate-x-1/5 -translate-y-1/5">
          <Elixir cost={elixir} />
        </div>
        <Card
          isFooterBlurred
          isPressable
          className={`h-full w-full border-1.5 ${border} transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl ${shadow}`}
          radius="lg"
          onPress={onOpen}
        >
          <Image className="h-full w-full object-cover" src={imageUrl} />
          <CardFooter className="justify-center border-white/20 border-1 overflow-hidden py-1 absolute rounded-large bottom-1 w-[calc(100%_-_8px)] ml-1 z-10">
            <p className="text-tiny text-white/80">Nivel {level}</p>
          </CardFooter>
        </Card>
      </div>
      {cardDetails && (
        <CardDetailsModal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          imageUrl={imageUrl}
          name={cardDetails.name}
          elixir={cardDetails.elixirCost}
          rarity={cardDetails.rarity}
          type={cardDetails.type}
          targets={cardDetails.targets}
          damage={cardDetails.damage}
          hp={cardDetails.attackDetails?.hp ?? 0}
          range={cardDetails.attackDetails?.range ?? 0}
          visionRange={cardDetails.troopDetails?.visionRange ?? 0}
        />
      )}
    </>
  );
}

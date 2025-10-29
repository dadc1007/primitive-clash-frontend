import { Card, CardFooter, Image } from "@heroui/react";
import type { CardRarity } from "@lib";
import { rarityClasses } from "@utils/rarityMapping.utils";
import Elixir from "./Elixir";

interface GameCardProps {
  imageUrl: string;
  level: number;
  rarity: CardRarity;
  elixir: number;
}

export default function GameCard({
  imageUrl,
  level,
  rarity,
  elixir,
}: Readonly<GameCardProps>) {
  const { border, shadow } = rarityClasses[rarity];
  console.log(imageUrl);

  return (
    <div className="relative w-full h-64">
      <div className="w-8 h-8 absolute z-20 -translate-x-1/5 -translate-y-1/5">
        <Elixir cost={elixir} />
      </div>
      <Card
        isFooterBlurred
        isPressable
        className={`h-full w-full border-1.5 ${border} transition-all duration-300 ease-in-out hover:scale-[1.02] hover:shadow-2xl ${shadow}`}
        radius="lg"
      >
        <Image className="h-full w-full object-cover" src={imageUrl} />
        <CardFooter className="justify-center border-white/20 border-1 overflow-hidden py-1 absolute rounded-large bottom-1 w-[calc(100%_-_8px)] ml-1 z-10">
          <p className="text-tiny text-white/80">Nivel {level}</p>
        </CardFooter>
      </Card>
    </div>
  );
}

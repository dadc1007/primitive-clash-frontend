import {
  Chip,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@heroui/react";
import type { CardRarity, CardType, UnitClass } from "@lib";
import { translateRarity, translateCardType, translateUnitClass } from "@utils";
import StatCard from "./StatCard";
import InfoCard from "./InfoCard";
import CombatStatCard from "./CombatStatCard";

interface CardDetailsModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  imageUrl: string;
  name: string;
  elixir: number;
  rarity: CardRarity;
  type: CardType;
  targets: UnitClass[];
  damage: number;
  hp: number;
  range: number;
  visionRange: number;
}

export default function CardDetailsModal({
  isOpen,
  onOpenChange,
  imageUrl,
  name,
  elixir,
  rarity,
  type,
  targets,
  damage,
  hp,
  range,
  visionRange,
}: Readonly<CardDetailsModalProps>) {
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      backdrop="blur"
      classNames={{
        closeButton: "z-10",
        wrapper: "dark",
      }}
    >
      <ModalContent className="dark">
        <ModalHeader className="relative h-48 p-0 overflow-hidden rounded-t-lg">
          <img
            src={imageUrl}
            alt="Card background"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-black/20" />
          <h2 className="absolute bottom-4 left-4 font-bold text-2xl text-white z-10 tracking-tighter">
            {name}
          </h2>
        </ModalHeader>
        <ModalBody className="flex flex-col items-center space-y-4 mt-3 mb-3">
          <div className="w-full grid grid-cols-2 gap-3">
            <StatCard icon={["fas", "droplet"]} label="Elixir" value={elixir} />
            <StatCard
              icon={["fas", "star"]}
              label="Rareza"
              value={translateRarity(rarity)}
              rarity={rarity}
            />
          </div>

          <InfoCard icon={["fas", "layer-group"]} label="Tipo">
            <p className="text-xl capitalize text-white">
              {translateCardType(type)}
            </p>
          </InfoCard>

          <InfoCard icon={["fas", "bullseye"]} label="Objetivos">
            <div className="flex flex-wrap gap-2">
              {targets.map((target) => (
                <Chip key={target} size="sm">
                  {translateUnitClass(target)}
                </Chip>
              ))}
            </div>
          </InfoCard>

          <div className="w-full grid grid-cols-2 gap-3">
            <CombatStatCard
              icon={["fas", "hand-fist"]}
              label="Daño"
              value={damage}
              colorScheme="red"
            />
            <CombatStatCard
              icon={["fas", "heart"]}
              label="Vida"
              value={hp}
              colorScheme="green"
            />
            <CombatStatCard
              icon={["fas", "bullseye"]}
              label="Rango"
              value={range}
              colorScheme="blue"
            />
            <CombatStatCard
              icon={["fas", "eye"]}
              label="Visión"
              value={visionRange}
              colorScheme="cyan"
            />
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

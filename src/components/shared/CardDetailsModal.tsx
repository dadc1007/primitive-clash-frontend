import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { CardRarity } from "@lib";

interface CardDetailsModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
  imageUrl: string;
  name: string;
  elixir: number;
  rarity: CardRarity;
  type: string;
  targets: string[];
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
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="relative h-48 p-0 overflow-hidden rounded-t-lg">
              <img
                src={imageUrl}
                alt="Card background"
                className="absolute inset-0 w-full h-full object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <h2 className="absolute bottom-4 left-4 font-bold text-2xl text-white z-10">
                {name}
              </h2>
            </ModalHeader>
            <ModalBody className="flex flex-col items-center space-y-4 mt-3 mb-3">
              <div className="w-full grid grid-cols-2 gap-3">
                <div className="rounded-lg border border-purple-500/30 bg-gradient-to-br from-purple-600/20 to-purple-900/20 p-3 text-center">
                  <div className="mb-1 flex justify-center">
                    <FontAwesomeIcon
                      icon={["fas", "droplet"]}
                      className="h-5 w-5 fill-purple-400 text-purple-400"
                    />
                  </div>
                  <p className="text-xs text-stone-400">Elixir</p>
                  <p className="font-[family-name:var(--font-bebas)] text-2xl text-purple-300">
                    {elixir}
                  </p>
                </div>
                <div className="rounded-lg border border-accent/30 bg-gradient-to-br from-accent/20 to-amber-900/20 p-3 text-center">
                  <div className="mb-1 flex justify-center">
                    <FontAwesomeIcon
                      icon={["fas", "star"]}
                      className="h-5 w-5 fill-accent text-accent"
                    />
                  </div>
                  <p className="text-xs text-stone-400">Rareza</p>
                  <p className="font-[family-name:var(--font-bebas)] text-lg capitalize text-accent">
                    {rarity}
                  </p>
                </div>
              </div>

              {/* Type */}
              <div className="w-full rounded-lg border border-stone-600/50 bg-stone-800/50 p-3">
                <div className="mb-2 flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={["fas", "layer-group"]}
                    className="h-4 w-4 text-stone-400"
                  />
                  <p className="text-xs uppercase tracking-wide text-stone-400">
                    Tipo
                  </p>
                </div>
                <p className="font-[family-name:var(--font-bebas)] text-xl capitalize text-white">
                  {type}
                </p>
              </div>

              {/* Targets */}
              <div className="w-full rounded-lg border border-stone-600/50 bg-stone-800/50 p-3">
                <div className="mb-2 flex items-center gap-2">
                  <FontAwesomeIcon
                    icon={["fas", "bullseye"]}
                    className="h-4 w-4 text-stone-400"
                  />
                  <p className="text-xs uppercase tracking-wide text-stone-400">
                    Objetivos
                  </p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {targets.map((target) => (
                    <span
                      key={target}
                      className="rounded-full border border-accent/50 bg-accent/20 px-3 py-1 text-sm capitalize text-accent"
                    >
                      {target}
                    </span>
                  ))}
                </div>
              </div>

              {/* Combat Stats Grid */}
              <div className="w-full grid grid-cols-2 gap-3">
                {/* Damage */}
                <div className="rounded-lg border border-red-500/30 bg-gradient-to-br from-red-600/20 to-red-900/20 p-3">
                  <div className="mb-1 flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={["fas", "hand-fist"]}
                      className="h-4 w-4 text-red-400"
                    />
                    <p className="text-xs uppercase tracking-wide text-stone-400">
                      Daño
                    </p>
                  </div>
                  <p className="font-[family-name:var(--font-bebas)] text-2xl text-red-300">
                    {damage}
                  </p>
                </div>

                {/* Health */}
                <div className="rounded-lg border border-green-500/30 bg-gradient-to-br from-green-600/20 to-green-900/20 p-3">
                  <div className="mb-1 flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={["fas", "heart"]}
                      className="h-4 w-4 text-green-400"
                    />
                    <p className="text-xs uppercase tracking-wide text-stone-400">
                      Vida
                    </p>
                  </div>
                  <p className="font-[family-name:var(--font-bebas)] text-2xl text-green-300">
                    {hp}
                  </p>
                </div>

                {/* Range */}
                <div className="rounded-lg border border-blue-500/30 bg-gradient-to-br from-blue-600/20 to-blue-900/20 p-3">
                  <div className="mb-1 flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={["fas", "bullseye"]}
                      className="h-4 w-4 text-blue-400"
                    />
                    <p className="text-xs uppercase tracking-wide text-stone-400">
                      Rango
                    </p>
                  </div>
                  <p className="font-[family-name:var(--font-bebas)] text-2xl text-blue-300">
                    {range}
                  </p>
                </div>

                {/* Vision */}
                <div className="rounded-lg border border-cyan-500/30 bg-gradient-to-br from-cyan-600/20 to-cyan-900/20 p-3">
                  <div className="mb-1 flex items-center gap-2">
                    <FontAwesomeIcon
                      icon={["fas", "eye"]}
                      className="h-4 w-4 text-cyan-400"
                    />
                    <p className="text-xs uppercase tracking-wide text-stone-400">
                      Visión
                    </p>
                  </div>
                  <p className="font-[family-name:var(--font-bebas)] text-2xl text-cyan-300">
                    {visionRange}
                  </p>
                </div>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
}

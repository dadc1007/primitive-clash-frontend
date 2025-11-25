export type CardRarity = "Common" | "Rare" | "Epic" | "Legendary";
export type CardType = "Troop" | "Building" | "Spell";
export type UnitClass = "Ground" | "Air" | "Buildings";

export interface RarityClassMap {
  border: string;
  shadow: string;
}

export interface CardResponse {
  id: string;
  name: string;
  elixirCost: number;
  rarity: CardRarity;
  type: CardType;
  damage: number;
  targets: UnitClass[];
  attackDetails?: AttackDetails;
  troopDetails?: TroopDetails;
}

export interface AttackDetails {
  hp: number;
  range: number;
  unitClass: UnitClass;
}

export interface TroopDetails {
  visionRange: number;
}

import type { CardRarity, RarityClassMap } from "@lib";

export const rarityClasses: Record<CardRarity, RarityClassMap> = {
  Common: {
    border: "border-rarity-Common",
    shadow: "hover:shadow-rarity-Common/50",
  },
  Rare: {
    border: "border-rarity-Rare",
    shadow: "hover:shadow-rarity-Rare/50",
  },
  Epic: {
    border: "border-rarity-Epic",
    shadow: "hover:shadow-rarity-Epic/50",
  },
  Legendary: {
    border: "border-rarity-Legendary",
    shadow: "hover:shadow-rarity-Legendary/50",
  },
};

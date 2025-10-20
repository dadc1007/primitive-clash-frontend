import type { CardRarity, RarityClassMap } from "@lib";

export const rarityClasses: Record<CardRarity, RarityClassMap> = {
  Common: {
    border: "border-blue-500",
    shadow: "hover:shadow-blue-500/50",
  },
  Rare: {
    border: "border-orange-500",
    shadow: "hover:shadow-orange-500/50",
  },
  Epic: { border: "border-purple-500", shadow: "hover:shadow-purple-500/50" },
  Legendary: {
    border: "border-amber-400",
    shadow: "hover:shadow-amber-500/50",
  },
};

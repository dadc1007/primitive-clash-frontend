import type { CardRarity, CardType, UnitClass } from "@lib";

export const translateRarity = (rarity: CardRarity): string => {
  const translations: Record<CardRarity, string> = {
    Common: "Común",
    Rare: "Rara",
    Epic: "Épica",
    Legendary: "Legendaria",
  };
  return translations[rarity] || rarity;
};

export const translateCardType = (type: CardType): string => {
  const translations: Record<CardType, string> = {
    Troop: "Tropa",
    Building: "Edificio",
    Spell: "Hechizo",
  };
  return translations[type] || type;
};

export const translateUnitClass = (unitClass: UnitClass): string => {
  const translations: Record<UnitClass, string> = {
    Ground: "Terrestre",
    Air: "Aéreo",
    Buildings: "Edificios",
  };
  return translations[unitClass] || unitClass;
};

/**
 * @file rarityMapping.utils.test.ts
 * @description Tests para mapeo de raridades a clases CSS de Tailwind
 * 
 * Valida:
 * - Clases correctas de borde y sombra para cada raridad
 * - Estilos específicos: Common, Rare, Epic, Legendary
 * - Consistencia en nombres de clases con configuración de Tailwind
 */
import { describe, it, expect } from "vitest";
import { rarityClasses } from "../rarityMapping.utils";
import type { CardRarity } from "@lib";

describe("rarityMapping.utils", () => {
  describe("rarityClasses", () => {
    it("should have correct classes for Common rarity", () => {
      const common = rarityClasses["Common" as CardRarity];
      expect(common).toEqual({
        border: "border-rarity-Common",
        shadow: "hover:shadow-rarity-Common/50",
      });
    });

    it("should have correct classes for Rare rarity", () => {
      const rare = rarityClasses["Rare" as CardRarity];
      expect(rare).toEqual({
        border: "border-rarity-Rare",
        shadow: "hover:shadow-rarity-Rare/50",
      });
    });

    it("should have correct classes for Epic rarity", () => {
      const epic = rarityClasses["Epic" as CardRarity];
      expect(epic).toEqual({
        border: "border-rarity-Epic",
        shadow: "hover:shadow-rarity-Epic/50",
      });
    });

    it("should have correct classes for Legendary rarity", () => {
      const legendary = rarityClasses["Legendary" as CardRarity];
      expect(legendary).toEqual({
        border: "border-rarity-Legendary",
        shadow: "hover:shadow-rarity-Legendary/50",
      });
    });

    it("should have all four rarity levels defined", () => {
      const rarities = Object.keys(rarityClasses);
      expect(rarities).toHaveLength(4);
      expect(rarities).toContain("Common");
      expect(rarities).toContain("Rare");
      expect(rarities).toContain("Epic");
      expect(rarities).toContain("Legendary");
    });

    it("each rarity should have border and shadow properties", () => {
      Object.values(rarityClasses).forEach((rarity) => {
        expect(rarity).toHaveProperty("border");
        expect(rarity).toHaveProperty("shadow");
        expect(typeof rarity.border).toBe("string");
        expect(typeof rarity.shadow).toBe("string");
      });
    });
  });
});

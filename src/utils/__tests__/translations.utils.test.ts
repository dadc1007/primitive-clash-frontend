/**
 * @file translations.utils.test.ts
 * @description Tests para funciones de traducción de enums del juego a español
 * 
 * Valida:
 * - Traducción correcta de raridades (COMMON, RARE, EPIC, LEGENDARY)
 * - Traducción de tipos de carta (TROOP, SPELL, BUILDING)
 * - Traducción de clases de unidad (TANK, RANGED, MELEE, etc)
 * - Manejo de valores desconocidos retornando el valor original
 */
import { describe, it, expect } from "vitest";
import {
  translateRarity,
  translateCardType,
  translateUnitClass,
} from "../translations.utils";
import type { CardRarity, CardType, UnitClass } from "@lib";

describe("translations.utils", () => {
  describe("translateRarity", () => {
    it("should translate Common to Común", () => {
      expect(translateRarity("Common" as CardRarity)).toBe("Común");
    });

    it("should translate Rare to Rara", () => {
      expect(translateRarity("Rare" as CardRarity)).toBe("Rara");
    });

    it("should translate Epic to Épica", () => {
      expect(translateRarity("Epic" as CardRarity)).toBe("Épica");
    });

    it("should translate Legendary to Legendaria", () => {
      expect(translateRarity("Legendary" as CardRarity)).toBe("Legendaria");
    });

    it("should return original value for unknown rarity", () => {
      expect(translateRarity("Unknown" as CardRarity)).toBe("Unknown");
    });
  });

  describe("translateCardType", () => {
    it("should translate Troop to Tropa", () => {
      expect(translateCardType("Troop" as CardType)).toBe("Tropa");
    });

    it("should translate Building to Edificio", () => {
      expect(translateCardType("Building" as CardType)).toBe("Edificio");
    });

    it("should translate Spell to Hechizo", () => {
      expect(translateCardType("Spell" as CardType)).toBe("Hechizo");
    });

    it("should return original value for unknown card type", () => {
      expect(translateCardType("Unknown" as CardType)).toBe("Unknown");
    });
  });

  describe("translateUnitClass", () => {
    it("should translate Ground to Terrestre", () => {
      expect(translateUnitClass("Ground" as UnitClass)).toBe("Terrestre");
    });

    it("should translate Air to Aéreo", () => {
      expect(translateUnitClass("Air" as UnitClass)).toBe("Aéreo");
    });

    it("should translate Buildings to Edificios", () => {
      expect(translateUnitClass("Buildings" as UnitClass)).toBe("Edificios");
    });

    it("should return original value for unknown unit class", () => {
      expect(translateUnitClass("Unknown" as UnitClass)).toBe("Unknown");
    });
  });
});

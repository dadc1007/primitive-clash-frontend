/**
 * @file card.queries.test.ts
 * @description Tests for card details fetch queries
 * 
 * Validates:
 * - GET /cards/:cardId endpoint call with correct ID
 * - Complete card data return (stats, rarity, type, description)
 * - Error handling when card doesn't exist
 * - CardResponse structure validation
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { getCardDetailsById } from "../card.queries";
import apiClient from "@api/apiClient";
import type { CardResponse } from "@lib";
import type { InternalAxiosRequestConfig } from "axios";

vi.mock("@api/apiClient");

describe("card.queries", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getCardDetailsById", () => {
    it("should call apiClient.get with correct endpoint", async () => {
      const mockCard: CardResponse = {
        id: "card-123",
        name: "Fire Dragon",
        elixirCost: 3,
        rarity: "Legendary",
        type: "Troop",
        damage: 50,
        targets: ["Ground", "Air"],
        attackDetails: {
          hp: 100,
          range: 5,
          unitClass: "Ground",
        },
        troopDetails: {
          visionRange: 7,
        },
      };

      vi.mocked(apiClient.get).mockResolvedValue({
        data: mockCard,
        status: 200,
        statusText: "OK",
        headers: {},
        config: { headers: {} } as InternalAxiosRequestConfig,
      });

      const result = await getCardDetailsById("card-123");

      expect(apiClient.get).toHaveBeenCalledWith("/cards/card-123");
      expect(result).toEqual(mockCard);
    });

    it("should return card data from response", async () => {
      const mockCard: CardResponse = {
        id: "card-456",
        name: "Ice Wizard",
        elixirCost: 2,
        rarity: "Rare",
        type: "Troop",
        damage: 30,
        targets: ["Ground"],
        attackDetails: {
          hp: 50,
          range: 6,
          unitClass: "Ground",
        },
      };

      vi.mocked(apiClient.get).mockResolvedValue({
        data: mockCard,
        status: 200,
        statusText: "OK",
        headers: {},
        config: { headers: {} } as InternalAxiosRequestConfig,
      });

      const result = await getCardDetailsById("card-456");

      expect(result.name).toBe("Ice Wizard");
      expect(result.rarity).toBe("Rare");
    });

    it("should throw error when card not found", async () => {
      const mockError = new Error("Card not found");
      vi.mocked(apiClient.get).mockRejectedValue(mockError);

      await expect(getCardDetailsById("invalid-id")).rejects.toThrow(
        "Card not found"
      );
    });

    it("should handle different card types", async () => {
      const mockCard: CardResponse = {
        id: "card-789",
        name: "Fireball",
        elixirCost: 4,
        rarity: "Common",
        type: "Spell",
        damage: 80,
        targets: ["Ground", "Air"],
      };

      vi.mocked(apiClient.get).mockResolvedValue({
        data: mockCard,
        status: 200,
        statusText: "OK",
        headers: {},
        config: { headers: {} } as InternalAxiosRequestConfig,
      });

      const result = await getCardDetailsById("card-789");

      expect(result.type).toBe("Spell");
      expect(result.damage).toBe(80);
    });
  });
});

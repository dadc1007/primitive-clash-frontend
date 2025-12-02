/**
 * @file deck.queries.test.ts
 * @description Tests para queries de obtención de deck de usuario
 * 
 * Valida:
 * - Llamada a endpoint GET /decks/:userId con ID de usuario
 * - Retorno de deck completo con todas sus cartas
 * - Estructura correcta de DeckResponse con array de cartas
 * - Manejo de errores cuando usuario no tiene deck
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { getDeckByUserId } from "../deck.queries";
import apiClient from "@api/apiClient";
import type { DeckResponse } from "@lib";

vi.mock("@api/apiClient");

describe("deck.queries", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getDeckByUserId", () => {
    it("should call apiClient.get with correct endpoint", async () => {
      const mockDeck: DeckResponse = {
        id: "deck-123",
        userId: "user-123",
        name: "My Deck",
        cards: [
          {
            id: "card-1",
            name: "Dragon",
            description: "A dragon",
            imageUrl: "https://example.com/dragon.jpg",
            level: 5,
            elixirCost: 3,
            health: 100,
            damage: 50,
            attackSpeed: 1.5,
            rarity: "LEGENDARY",
            cardType: "TROOP",
            unitClass: "TANK",
            targets: ["Ground"],
          },
        ],
        createdAt: "2024-01-01T00:00:00Z",
        updatedAt: "2024-01-01T00:00:00Z",
      };

      vi.mocked(apiClient.get).mockResolvedValue({
        data: mockDeck,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as any,
      });

      const result = await getDeckByUserId("user-123");

      expect(apiClient.get).toHaveBeenCalledWith("/decks/user/user-123");
      expect(result).toEqual(mockDeck);
    });

    it("should return deck with cards from response", async () => {
      const mockDeck: DeckResponse = {
        id: "deck-456",
        userId: "user-456",
        name: "Spell Deck",
        cards: [
          {
            id: "card-2",
            name: "Fireball",
            description: "A fireball",
            imageUrl: "https://example.com/fireball.jpg",
            level: 3,
            elixirCost: 4,
            health: 0,
            damage: 80,
            attackSpeed: 0,
            rarity: "COMMON",
            cardType: "SPELL",
            unitClass: "NONE",
            targets: ["Ground", "Air"],
          },
          {
            id: "card-3",
            name: "Lightning",
            description: "Lightning strike",
            imageUrl: "https://example.com/lightning.jpg",
            level: 2,
            elixirCost: 6,
            health: 0,
            damage: 120,
            attackSpeed: 0,
            rarity: "RARE",
            cardType: "SPELL",
            unitClass: "NONE",
            targets: ["Ground", "Air"],
          },
        ],
        createdAt: "2024-01-02T00:00:00Z",
        updatedAt: "2024-01-02T00:00:00Z",
      };

      vi.mocked(apiClient.get).mockResolvedValue({
        data: mockDeck,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as any,
      });

      const result = await getDeckByUserId("user-456");

      expect(result.name).toBe("Spell Deck");
      expect(result.cards).toHaveLength(2);
      expect(result.cards[0].name).toBe("Fireball");
    });

    it("should throw error when deck not found", async () => {
      const mockError = new Error("Deck not found");
      vi.mocked(apiClient.get).mockRejectedValue(mockError);

      await expect(getDeckByUserId("invalid-user-id")).rejects.toThrow(
        "Deck not found"
      );
    });

    it("should handle empty deck", async () => {
      const mockDeck: DeckResponse = {
        id: "deck-789",
        userId: "user-789",
        name: "Empty Deck",
        cards: [],
        createdAt: "2024-01-03T00:00:00Z",
        updatedAt: "2024-01-03T00:00:00Z",
      };

      vi.mocked(apiClient.get).mockResolvedValue({
        data: mockDeck,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as any,
      });

      const result = await getDeckByUserId("user-789");

      expect(result.cards).toHaveLength(0);
      expect(result.name).toBe("Empty Deck");
    });
  });
});

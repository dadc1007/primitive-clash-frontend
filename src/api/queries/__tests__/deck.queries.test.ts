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
        deckId: "deck-123",
        size: 1,
        averageElixirCost: 3,
        cards: [
          {
            playerCardId: "player-card-1",
            cardId: "card-1",
            rarity: "Legendary",
            elixirCost: 3,
            level: 5,
            imageUrl: "https://example.com/dragon.jpg",
          },
        ],
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
        deckId: "deck-456",
        size: 2,
        averageElixirCost: 5,
        cards: [
          {
            playerCardId: "player-card-2",
            cardId: "card-2",
            rarity: "Common",
            elixirCost: 4,
            level: 3,
            imageUrl: "https://example.com/fireball.jpg",
          },
          {
            playerCardId: "player-card-3",
            cardId: "card-3",
            rarity: "Rare",
            elixirCost: 6,
            level: 2,
            imageUrl: "https://example.com/lightning.jpg",
          },
        ],
      };

      vi.mocked(apiClient.get).mockResolvedValue({
        data: mockDeck,
        status: 200,
        statusText: "OK",
        headers: {},
        config: {} as any,
      });

      const result = await getDeckByUserId("user-456");

      expect(result.deckId).toBe("deck-456");
      expect(result.cards).toHaveLength(2);
      expect(result.cards[0].cardId).toBe("card-2");
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
        deckId: "deck-789",
        size: 0,
        averageElixirCost: 0,
        cards: [],
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
      expect(result.size).toBe(0);
    });
  });
});

import type { CardRarity } from "./card.types";

export interface DeckResponse {
  deckId: string;
  size: number;
  averageElixirCost: number;
  cards: CardInDeckResponse[];
}

export interface CardInDeckResponse {
  playerCardId: string;
  cardName: string;
  rarity: CardRarity;
  elixirCost: number;
  level: number;
  imageUrl: string;
}

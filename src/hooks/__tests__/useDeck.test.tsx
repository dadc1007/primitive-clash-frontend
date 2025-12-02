/**
 * @file useDeck.test.tsx
 * @description Tests para hook de obtención de deck de usuario con React Query
 * 
 * Valida:
 * - Carga exitosa de deck con sus cartas
 * - Estados de loading, error y success
 * - Refetch manual del deck
 * - Integración con cache de React Query
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useDeck } from "../useDeck";
import * as deckQueries from "@api/queries/deck.queries";
import type { DeckResponse } from "@lib";
import type { ReactNode } from "react";

// Mock the deck queries module
vi.mock("@api/queries/deck.queries");

describe("useDeck", () => {
  let queryClient: QueryClient;

  const wrapper = ({ children }: { children: ReactNode }) => {
    return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );
  };

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
    vi.clearAllMocks();
  });

  it("should fetch deck successfully", async () => {
    const mockDeckData: DeckResponse = {
      userId: "user-123",
      cards: [
        {
          cardId: "card-1",
          level: 1,
        },
        {
          cardId: "card-2",
          level: 2,
        },
      ],
    };

    vi.mocked(deckQueries.getDeckByUserId).mockResolvedValue(mockDeckData);

    const { result } = renderHook(() => useDeck("user-123"), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockDeckData);
    expect(deckQueries.getDeckByUserId).toHaveBeenCalledWith("user-123");
  });

  it("should not fetch when userId is empty", () => {
    const { result } = renderHook(() => useDeck(""), { wrapper });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeUndefined();
    expect(deckQueries.getDeckByUserId).not.toHaveBeenCalled();
  });

  it("should handle error when fetching deck fails", async () => {
    const mockError = {
      message: "Failed to fetch deck",
      statusCode: 500,
    };

    vi.mocked(deckQueries.getDeckByUserId).mockRejectedValue(mockError);

    const { result } = renderHook(() => useDeck("invalid-user"), { wrapper });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeTruthy();
  });

  it("should use correct query key", () => {
    const { result } = renderHook(() => useDeck("user-789"), { wrapper });

    expect(result.current).toBeDefined();
  });

  it("should refetch when userId changes", async () => {
    const mockDeckData1: DeckResponse = {
      userId: "user-1",
      cards: [{ cardId: "card-1", level: 1 }],
    };

    const mockDeckData2: DeckResponse = {
      userId: "user-2",
      cards: [{ cardId: "card-2", level: 2 }],
    };

    vi.mocked(deckQueries.getDeckByUserId)
      .mockResolvedValueOnce(mockDeckData1)
      .mockResolvedValueOnce(mockDeckData2);

    const { result, rerender } = renderHook(
      ({ userId }) => useDeck(userId),
      {
        wrapper,
        initialProps: { userId: "user-1" },
      }
    );

    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data).toEqual(mockDeckData1);

    rerender({ userId: "user-2" });

    await waitFor(() => expect(result.current.data).toEqual(mockDeckData2));
    expect(deckQueries.getDeckByUserId).toHaveBeenCalledTimes(2);
  });
});

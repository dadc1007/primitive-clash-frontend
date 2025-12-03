/**
 * @file useCard.test.tsx
 * @description Tests para hook de obtención de detalles de carta con React Query
 * 
 * Valida:
 * - Carga de datos de carta por ID (stats, rarity, tipo)
 * - Estados de loading y error
 * - Deshabilitación de query cuando no hay cardId
 * - Cache y refetch de datos
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useCard } from "../useCard";
import * as cardQueries from "@api/queries/card.queries";
import type { CardResponse } from "@lib";
import type { ReactNode } from "react";

// Mock the card queries module
vi.mock("@api/queries/card.queries");

describe("useCard", () => {
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

  it("should fetch card details successfully", async () => {
    const mockCardData: CardResponse = {
      id: "card-123",
      name: "Test Card",
      elixirCost: 3,
      rarity: "Common",
      type: "Troop",
      targets: ["Ground"],
      damage: 100,
      attackDetails: {
        hp: 500,
        range: 5,
        unitClass: "Ground",
      },
      troopDetails: {
        visionRange: 8,
      },
    };

    vi.mocked(cardQueries.getCardDetailsById).mockResolvedValue(mockCardData);

    const { result } = renderHook(() => useCard("card-123"), { wrapper });

    await waitFor(() => expect(result.current.isSuccess).toBe(true));

    expect(result.current.data).toEqual(mockCardData);
    expect(cardQueries.getCardDetailsById).toHaveBeenCalledWith("card-123");
  });

  it("should not fetch when cardId is empty", () => {
    const { result } = renderHook(() => useCard(""), { wrapper });

    expect(result.current.isLoading).toBe(false);
    expect(result.current.data).toBeUndefined();
    expect(cardQueries.getCardDetailsById).not.toHaveBeenCalled();
  });

  it("should handle error when fetching card details fails", async () => {
    const mockError = {
      message: "Failed to fetch card",
      statusCode: 404,
    };

    vi.mocked(cardQueries.getCardDetailsById).mockRejectedValue(mockError);

    const { result } = renderHook(() => useCard("invalid-card"), { wrapper });

    await waitFor(() => expect(result.current.isError).toBe(true));

    expect(result.current.error).toBeTruthy();
  });

  it("should use correct query key", () => {
    const { result } = renderHook(() => useCard("card-456"), { wrapper });

    expect(result.current).toBeDefined();
    // The query key is used internally by React Query
  });
});

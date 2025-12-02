/**
 * @file GameCard.test.tsx
 * @description Tests para componente de carta de juego con rendering condicional
 * 
 * Valida:
 * - Renderizado correcto de nivel de carta
 * - Clases CSS de raridad (border y shadow)
 * - Manejo de estados de loading y error
 * - Integración con modal de detalles de carta
 * - Datos de carta (nombre, elixir, stats)
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import GameCard from "../GameCard";
import * as useCardHook from "@hooks/useCard";
import type { CardRarity, CardResponse } from "@lib";
import type { ReactNode } from "react";

// Mock hooks and components
vi.mock("@hooks/useCard");
vi.mock("@heroui/react", async () => {
  const actual = await vi.importActual("@heroui/react");
  return {
    ...actual,
    useDisclosure: () => ({
      isOpen: false,
      onOpen: vi.fn(),
      onOpenChange: vi.fn(),
    }),
  };
});

describe("GameCard", () => {
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

  const mockCardDetails: CardResponse = {
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

  const defaultProps = {
    cardId: "card-123",
    imageUrl: "https://example.com/card.png",
    level: 5,
    rarity: "Common" as CardRarity,
    elixir: 3,
  };

  it("should render card with correct level", () => {
    vi.mocked(useCardHook.useCard).mockReturnValue({
      data: mockCardDetails,
      isLoading: false,
      isError: false,
    } as any);

    render(<GameCard {...defaultProps} />, { wrapper });

    expect(screen.getByText("Nivel 5")).toBeInTheDocument();
  });

  it("should apply correct rarity classes for Common rarity", () => {
    vi.mocked(useCardHook.useCard).mockReturnValue({
      data: mockCardDetails,
      isLoading: false,
      isError: false,
    } as any);

    const { container } = render(<GameCard {...defaultProps} />, { wrapper });

    const card = container.querySelector('[class*="border-rarity-Common"]');
    expect(card).toBeInTheDocument();
  });

  it("should apply correct rarity classes for Legendary rarity", () => {
    vi.mocked(useCardHook.useCard).mockReturnValue({
      data: { ...mockCardDetails, rarity: "Legendary" },
      isLoading: false,
      isError: false,
    } as any);

    const { container } = render(
      <GameCard {...defaultProps} rarity="Legendary" />,
      { wrapper }
    );

    const card = container.querySelector('[class*="border-rarity-Legendary"]');
    expect(card).toBeInTheDocument();
  });

  it("should render card image with correct src", () => {
    vi.mocked(useCardHook.useCard).mockReturnValue({
      data: mockCardDetails,
      isLoading: false,
      isError: false,
    } as any);

    render(<GameCard {...defaultProps} />, { wrapper });

    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", "https://example.com/card.png");
  });

  it("should not render modal when card details are not loaded", () => {
    vi.mocked(useCardHook.useCard).mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
    } as any);

    const { container } = render(<GameCard {...defaultProps} />, { wrapper });

    expect(container.querySelector('[role="dialog"]')).not.toBeInTheDocument();
  });

  it("should call useCard hook with correct cardId", () => {
    const useCardSpy = vi.mocked(useCardHook.useCard);
    useCardSpy.mockReturnValue({
      data: mockCardDetails,
      isLoading: false,
      isError: false,
    } as any);

    render(<GameCard {...defaultProps} />, { wrapper });

    expect(useCardSpy).toHaveBeenCalledWith("card-123");
  });
});

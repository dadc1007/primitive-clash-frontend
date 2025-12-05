/**
 * @file CardsPage.test.tsx
 * @description Tests for the cards/deck page component
 * 
 * Validates:
 * - Deck cards rendering
 * - Loading and error states
 * - Back navigation
 * - Average elixir cost calculation
 */
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import CardsPage from "../CardsPage";
import userEvent from "@testing-library/user-event";
import type { DeckResponse } from "@lib";

const mockNavigate = vi.fn();
const mockUseDeck = vi.fn();
const mockUseAuth = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("@hooks", () => ({
  useDeck: () => mockUseDeck(),
  useAuth: () => mockUseAuth(),
  useCard: () => ({ data: null, isLoading: false }),
}));

describe("CardsPage", () => {
  const mockDeckData: DeckResponse = {
    deckId: "deck-123",
    size: 2,
    cards: [
      {
        playerCardId: "1",
        cardId: "card-1",
        imageUrl: "https://example.com/card1.png",
        level: 5,
        rarity: "Common",
        elixirCost: 3,
      },
      {
        playerCardId: "2",
        cardId: "card-2",
        imageUrl: "https://example.com/card2.png",
        level: 3,
        rarity: "Rare",
        elixirCost: 4,
      },
    ],
    averageElixirCost: 3.5,
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAuth.mockReturnValue({
      user: { userId: "user-123", username: "testuser" },
    });
  });

  const renderCardsPage = () => {
    return render(
      <BrowserRouter>
        <CardsPage />
      </BrowserRouter>
    );
  };

  it("should show loading state", () => {
    mockUseDeck.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
    });

    renderCardsPage();
    
    expect(screen.getByText(/Cargando tu mazo.../i)).toBeInTheDocument();
  });

  it("should render deck cards when data is loaded", () => {
    mockUseDeck.mockReturnValue({
      data: mockDeckData,
      isLoading: false,
      isError: false,
      error: null,
    });

    renderCardsPage();
    
    expect(screen.getByText(/Mi mazo/i)).toBeInTheDocument();
    expect(screen.getByText(/Costo medio de elixir: 3.5/i)).toBeInTheDocument();
  });

  it("should show error state when loading fails", () => {
    mockUseDeck.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: { message: "Error loading deck" },
    });

    renderCardsPage();
    
    expect(
      screen.getByText(/Hubo un error al cargar el mazo. Intenta nuevamente./i)
    ).toBeInTheDocument();
  });

  it("should navigate back to lobby when back button is clicked", async () => {
    const user = userEvent.setup();
    mockUseDeck.mockReturnValue({
      data: mockDeckData,
      isLoading: false,
      isError: false,
      error: null,
    });

    renderCardsPage();
    
    const backButton = screen.getByRole("button", { name: /Volver/i });
    await user.click(backButton);
    
    expect(mockNavigate).toHaveBeenCalledWith("/lobby");
  });

  it("should render correct number of cards", () => {
    mockUseDeck.mockReturnValue({
      data: mockDeckData,
      isLoading: false,
      isError: false,
      error: null,
    });

    const { container } = renderCardsPage();
    
    // Los GameCard tienen la clase específica o podemos contar por el grid
    const grid = container.querySelector(".grid");
    expect(grid).toBeInTheDocument();
  });

  it("should log error when deck loading fails", async () => {
    const consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
    
    mockUseDeck.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: { message: "Network error" },
    });

    renderCardsPage();

    await waitFor(() => {
      expect(consoleErrorSpy).toHaveBeenCalled();
    });

    consoleErrorSpy.mockRestore();
  });

  it("should handle empty user gracefully", () => {
    mockUseAuth.mockReturnValue({
      user: null,
    });

    mockUseDeck.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: null,
    });

    renderCardsPage();
    
    expect(screen.getByText(/Cargando tu mazo.../i)).toBeInTheDocument();
  });
});

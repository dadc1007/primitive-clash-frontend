/**
 * @file LobbyPage.test.tsx
 * @description Tests for the lobby page component
 * 
 * Validates:
 * - Lobby elements rendering
 * - Match search functionality
 * - Navigation when match is found
 * - Error handling
 */
import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { BrowserRouter } from "react-router-dom";
import LobbyPage from "../LobbyPage";
import userEvent from "@testing-library/user-event";

const mockNavigate = vi.fn();
const mockUseMatchmaking = vi.fn();
const mockUseAuth = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("@hooks", () => ({
  useMatchmaking: (url: string) => mockUseMatchmaking(url),
  useAuth: () => mockUseAuth(),
}));

describe("LobbyPage", () => {
  const mockStartSearch = vi.fn();
  const mockDisconnect = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAuth.mockReturnValue({
      user: { userId: "user-123", username: "testuser" },
    });
  });

  const renderLobbyPage = () => {
    return render(
      <BrowserRouter>
        <LobbyPage />
      </BrowserRouter>
    );
  };

  it("should render search button in idle state", () => {
    mockUseMatchmaking.mockReturnValue({
      isSearching: false,
      matchData: null,
      startSearch: mockStartSearch,
      disconnect: mockDisconnect,
      error: null,
    });

    renderLobbyPage();
    
    expect(screen.getByRole("button", { name: /Buscar Batalla/i })).toBeInTheDocument();
  });

  it("should show searching state when searching for match", () => {
    mockUseMatchmaking.mockReturnValue({
      isSearching: true,
      matchData: null,
      startSearch: mockStartSearch,
      disconnect: mockDisconnect,
      error: null,
    });

    renderLobbyPage();
    
    expect(screen.getByRole("button", { name: /Buscando partida.../i })).toBeInTheDocument();
  });

  it("should call startSearch when button is clicked", async () => {
    const user = userEvent.setup();
    mockUseMatchmaking.mockReturnValue({
      isSearching: false,
      matchData: null,
      startSearch: mockStartSearch,
      disconnect: mockDisconnect,
      error: null,
    });

    renderLobbyPage();
    
    const button = screen.getByRole("button", { name: /Buscar Batalla/i });
    await user.click(button);
    
    expect(mockStartSearch).toHaveBeenCalled();
  });

  it("should show button as disabled while searching", () => {
    mockUseMatchmaking.mockReturnValue({
      isSearching: true,
      matchData: null,
      startSearch: mockStartSearch,
      disconnect: mockDisconnect,
      error: null,
    });

    renderLobbyPage();
    
    const button = screen.getByRole("button", { name: /Buscando partida.../i });
    expect(button).toBeDisabled();
  });

  it("should navigate to game when match is found", async () => {
    const mockMatchData = {
      sessionId: "session-123",
      userId: "user-123",
    };

    mockUseMatchmaking.mockReturnValue({
      isSearching: false,
      matchData: mockMatchData,
      startSearch: mockStartSearch,
      disconnect: mockDisconnect,
      error: null,
    });

    renderLobbyPage();

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith(
        "/game",
        expect.objectContaining({
          state: expect.objectContaining({
            connectionData: expect.stringContaining("session-123"),
          }),
        })
      );
    });
  });

  it("should display error message when error occurs", () => {
    mockUseMatchmaking.mockReturnValue({
      isSearching: false,
      matchData: null,
      startSearch: mockStartSearch,
      disconnect: mockDisconnect,
      error: "Failed to connect to server",
    });

    renderLobbyPage();
    
    expect(screen.getByText(/Failed to connect to server/i)).toBeInTheDocument();
  });

  it("should render collection card link", () => {
    mockUseMatchmaking.mockReturnValue({
      isSearching: false,
      matchData: null,
      startSearch: mockStartSearch,
      disconnect: mockDisconnect,
      error: null,
    });

    renderLobbyPage();
    
    expect(screen.getByText(/Coleccion/i)).toBeInTheDocument();
  });

  it("should not start search when user is null", async () => {
    const user = userEvent.setup();
    mockUseAuth.mockReturnValue({
      user: null,
    });

    mockUseMatchmaking.mockReturnValue({
      isSearching: false,
      matchData: null,
      startSearch: mockStartSearch,
      disconnect: mockDisconnect,
      error: null,
    });

    renderLobbyPage();
    
    const button = screen.getByRole("button", { name: /Buscar Batalla/i });
    await user.click(button);
    
    expect(mockStartSearch).not.toHaveBeenCalled();
  });

  it("should render arena image", () => {
    mockUseMatchmaking.mockReturnValue({
      isSearching: false,
      matchData: null,
      startSearch: mockStartSearch,
      disconnect: mockDisconnect,
      error: null,
    });

    const { container } = renderLobbyPage();
    
    const image = container.querySelector("img");
    expect(image).toBeInTheDocument();
  });
});

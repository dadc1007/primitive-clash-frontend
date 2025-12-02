/**
 * @file LobbyCard.test.tsx
 * @description Tests para tarjeta de navegación del lobby con iconos FontAwesome
 * 
 * Valida:
 * - Renderizado de título y descripción
 * - Display correcto de iconos FontAwesome
 * - Navegación mediante react-router-dom al hacer clic
 * - Estilos y clases CSS aplicadas
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import LobbyCard from "../LobbyCard";
import { BrowserRouter } from "react-router-dom";

// Mock de useNavigate
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock de FontAwesomeIcon
vi.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: ({ icon }: { icon: string[] }) => (
    <span data-testid="icon">{icon[1]}</span>
  ),
}));

describe("LobbyCard", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const defaultProps = {
    to: "/cards",
    title: "My Cards",
    icon: ["fas", "cards"] as any,
    gradientClasses: "from-blue-500 to-purple-600",
  };

  it("should render title", () => {
    render(
      <BrowserRouter>
        <LobbyCard {...defaultProps} />
      </BrowserRouter>
    );

    expect(screen.getByText("My Cards")).toBeInTheDocument();
  });

  it("should render icon", () => {
    render(
      <BrowserRouter>
        <LobbyCard {...defaultProps} />
      </BrowserRouter>
    );

    const icon = screen.getByTestId("icon");
    expect(icon).toHaveTextContent("cards");
  });

  it("should navigate when clicked", () => {
    render(
      <BrowserRouter>
        <LobbyCard {...defaultProps} />
      </BrowserRouter>
    );

    const card = screen.getByText("My Cards").closest("button");
    fireEvent.click(card!);

    expect(mockNavigate).toHaveBeenCalledWith("/cards");
  });

  it("should render with different props", () => {
    render(
      <BrowserRouter>
        <LobbyCard
          to="/battle"
          title="Battle"
          icon={["fas", "swords"] as any}
          gradientClasses="from-red-500 to-orange-600"
        />
      </BrowserRouter>
    );

    expect(screen.getByText("Battle")).toBeInTheDocument();
    const icon = screen.getByTestId("icon");
    expect(icon).toHaveTextContent("swords");
  });

  it("should apply gradient classes", () => {
    const { container } = render(
      <BrowserRouter>
        <LobbyCard {...defaultProps} />
      </BrowserRouter>
    );

    const gradientDiv = container.querySelector(".bg-gradient-to-br");
    expect(gradientDiv).toHaveClass("from-blue-500", "to-purple-600");
  });
});

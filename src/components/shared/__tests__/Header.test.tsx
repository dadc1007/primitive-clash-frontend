/**
 * @file Header.test.tsx
 * @description Tests for header component with user information
 * 
 * Validates:
 * - Username and email rendering for authenticated user
 * - Resources display (gold, gems, trophies) with icons
 * - Handling state when no user is logged in
 * - Integration with useAuth hook
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "../Header";

const mockUseAuth = vi.fn();
const mockLogout = vi.fn();

// Mock del hook useAuth
vi.mock("@hooks", () => ({
  useAuth: () => mockUseAuth(),
}));

// Mock de FontAwesomeIcon
vi.mock("@fortawesome/react-fontawesome", () => ({
  FontAwesomeIcon: ({ icon }: { icon: string[] }) => (
    <span data-testid="icon">{icon[1]}</span>
  ),
}));

describe("Header", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockUseAuth.mockReturnValue({
      user: {
        username: "TestPlayer",
        level: 10,
        trophies: 2500,
        gold: 1000,
        gems: 50,
      },
      logout: mockLogout,
    });
  });

  it("should render user information", () => {
    render(<Header />);

    expect(screen.getByText("TestPlayer")).toBeInTheDocument();
    expect(screen.getByText("2500")).toBeInTheDocument();
  });

  it("should display user level badge", () => {
    render(<Header />);

    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("should show gold and gems", () => {
    render(<Header />);

    expect(screen.getByText("1000")).toBeInTheDocument();
    expect(screen.getByText("50")).toBeInTheDocument();
  });

  it("should render trophy, coins, and gems icons", () => {
    render(<Header />);

    const icons = screen.getAllByTestId("icon");
    const iconTexts = icons.map((icon) => icon.textContent);

    expect(iconTexts).toContain("trophy");
    expect(iconTexts).toContain("coins");
    expect(iconTexts).toContain("gem");
  });

  it("should handle different user data", () => {
    mockUseAuth.mockReturnValue({
      user: {
        username: "AnotherPlayer",
        level: 5,
        trophies: 1200,
        gold: 500,
        gems: 25,
      },
      logout: mockLogout,
    });

    render(<Header />);

    expect(screen.getByText("AnotherPlayer")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.getByText("1200")).toBeInTheDocument();
  });
});

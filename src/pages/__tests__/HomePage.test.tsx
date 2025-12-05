/**
 * @file HomePage.test.tsx
 * @description Tests for the home page component
 * 
 * Validates:
 * - Title and description rendering
 * - Button navigation functionality
 */
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import HomePage from "../HomePage";
import userEvent from "@testing-library/user-event";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("HomePage", () => {
  const renderHomePage = () => {
    return render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
  };

  it("should render title correctly", () => {
    renderHomePage();
    
    expect(screen.getByText(/PRIMITIVE/i)).toBeInTheDocument();
    expect(screen.getByText(/CLASH/i)).toBeInTheDocument();
  });

  it("should render description text", () => {
    renderHomePage();
    
    expect(
      screen.getByText(/Entra a la arena prehistórica y lucha por la supervivencia/i)
    ).toBeInTheDocument();
  });

  it("should render start button", () => {
    renderHomePage();
    
    const button = screen.getByRole("button", { name: /Iniciar aventura/i });
    expect(button).toBeInTheDocument();
  });

  it("should navigate to login when button is clicked", async () => {
    const user = userEvent.setup();
    renderHomePage();
    
    const button = screen.getByRole("button", { name: /Iniciar aventura/i });
    await user.click(button);
    
    expect(mockNavigate).toHaveBeenCalledWith("/login");
  });

  it("should have correct styling classes", () => {
    const { container } = renderHomePage();
    
    const mainDiv = container.querySelector(".min-h-screen");
    expect(mainDiv).toBeInTheDocument();
    expect(mainDiv).toHaveClass("flex", "flex-col", "items-center");
  });
});

/**
 * @file MainLayout.test.tsx
 * @description Tests for the main layout component
 * 
 * Validates:
 * - Header component rendering
 * - Outlet rendering for child routes
 * - Layout structure
 */
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import MainLayout from "../MainLayout";

vi.mock("@components/shared", () => ({
  Header: () => <div data-testid="mock-header">Header Component</div>,
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    Outlet: () => <div data-testid="mock-outlet">Child Route Content</div>,
  };
});

describe("MainLayout", () => {
  const renderMainLayout = () => {
    return render(
      <BrowserRouter>
        <MainLayout />
      </BrowserRouter>
    );
  };

  it("should render Header component", () => {
    renderMainLayout();
    
    expect(screen.getByTestId("mock-header")).toBeInTheDocument();
    expect(screen.getByText("Header Component")).toBeInTheDocument();
  });

  it("should render Outlet for child routes", () => {
    renderMainLayout();
    
    expect(screen.getByTestId("mock-outlet")).toBeInTheDocument();
    expect(screen.getByText("Child Route Content")).toBeInTheDocument();
  });

  it("should have correct layout structure", () => {
    const { container } = renderMainLayout();
    
    const mainDiv = container.querySelector(".min-h-screen");
    expect(mainDiv).toBeInTheDocument();
    expect(mainDiv).toHaveClass("relative", "overflow-hidden");
  });

  it("should have max-width container for content", () => {
    const { container } = renderMainLayout();
    
    const contentContainer = container.querySelector(".max-w-4xl");
    expect(contentContainer).toBeInTheDocument();
    expect(contentContainer).toHaveClass("mx-auto", "px-4", "py-6");
  });

  it("should render both Header and Outlet together", () => {
    renderMainLayout();
    
    expect(screen.getByTestId("mock-header")).toBeInTheDocument();
    expect(screen.getByTestId("mock-outlet")).toBeInTheDocument();
  });
});

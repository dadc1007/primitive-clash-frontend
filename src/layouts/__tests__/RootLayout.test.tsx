/**
 * @file RootLayout.test.tsx
 * @description Tests for the root layout component
 * 
 * Validates:
 * - AuthProvider rendering
 * - Outlet rendering
 * - Provider structure
 */
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { BrowserRouter } from "react-router-dom";
import RootLayout from "../RootLayout";

vi.mock("@providers/AuthContext", () => ({
  AuthProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-auth-provider">{children}</div>
  ),
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    Outlet: () => <div data-testid="mock-outlet">Child Content</div>,
  };
});

describe("RootLayout", () => {
  const renderRootLayout = () => {
    return render(
      <BrowserRouter>
        <RootLayout />
      </BrowserRouter>
    );
  };

  it("should render AuthProvider", () => {
    renderRootLayout();
    
    expect(screen.getByTestId("mock-auth-provider")).toBeInTheDocument();
  });

  it("should render Outlet inside AuthProvider", () => {
    renderRootLayout();
    
    expect(screen.getByTestId("mock-outlet")).toBeInTheDocument();
    expect(screen.getByText("Child Content")).toBeInTheDocument();
  });

  it("should wrap Outlet with AuthProvider", () => {
    renderRootLayout();
    
    const authProvider = screen.getByTestId("mock-auth-provider");
    const outlet = screen.getByTestId("mock-outlet");
    
    expect(authProvider).toContainElement(outlet);
  });
});

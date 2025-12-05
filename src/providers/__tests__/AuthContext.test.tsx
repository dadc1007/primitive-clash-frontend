/**
 * @file AuthContext.test.tsx
 * @description Tests for authentication context provider
 * 
 * Validates:
 * - Context provider functionality
 * - useAuthContext hook returns correct values
 * - Error thrown when used outside provider
 */
import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { AuthProvider, useAuthContext } from "../AuthContext";

const mockUseAuth = vi.fn();

vi.mock("@hooks", () => ({
  useAuth: () => mockUseAuth(),
}));

// Componente de prueba para consumir el contexto
function TestConsumer() {
  const auth = useAuthContext();
  return (
    <div>
      <div data-testid="auth-data">
        {auth.user ? auth.user.username : "No user"}
      </div>
    </div>
  );
}

describe("AuthContext", () => {
  it("should provide auth context to children", () => {
    mockUseAuth.mockReturnValue({
      user: { userId: "123", username: "testuser" },
      login: vi.fn(),
      logout: vi.fn(),
    });

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    expect(screen.getByTestId("auth-data")).toHaveTextContent("testuser");
  });

  it("should provide null user when not authenticated", () => {
    mockUseAuth.mockReturnValue({
      user: null,
      login: vi.fn(),
      logout: vi.fn(),
    });

    render(
      <AuthProvider>
        <TestConsumer />
      </AuthProvider>
    );

    expect(screen.getByTestId("auth-data")).toHaveTextContent("No user");
  });

  it("should render children correctly", () => {
    mockUseAuth.mockReturnValue({
      user: null,
      login: vi.fn(),
      logout: vi.fn(),
    });

    render(
      <AuthProvider>
        <div data-testid="child-content">Child Content</div>
      </AuthProvider>
    );

    expect(screen.getByTestId("child-content")).toBeInTheDocument();
    expect(screen.getByText("Child Content")).toBeInTheDocument();
  });

  it("should throw error when useAuthContext is used outside provider", () => {
    // Suprimir console.error para esta prueba
    const consoleErrorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    expect(() => {
      render(<TestConsumer />);
    }).toThrow("useAuthContext debe usarse dentro de un AuthProvider");

    consoleErrorSpy.mockRestore();
  });

  it("should provide complete auth object", () => {
    const mockLogin = vi.fn();
    const mockLogout = vi.fn();

    mockUseAuth.mockReturnValue({
      user: { userId: "123", username: "testuser" },
      login: mockLogin,
      logout: mockLogout,
      isLoading: false,
    });

    function CompleteTestConsumer() {
      const auth = useAuthContext();
      return (
        <div>
          <div data-testid="user">{auth.user?.username}</div>
          <button onClick={auth.login}>Login</button>
          <button onClick={auth.logout}>Logout</button>
        </div>
      );
    }

    render(
      <AuthProvider>
        <CompleteTestConsumer />
      </AuthProvider>
    );

    expect(screen.getByTestId("user")).toHaveTextContent("testuser");
    expect(screen.getByRole("button", { name: "Login" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Logout" })).toBeInTheDocument();
  });
});

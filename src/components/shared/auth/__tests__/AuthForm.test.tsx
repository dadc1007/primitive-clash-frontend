/**
 * @file AuthForm.test.tsx
 * @description Tests para formulario de autenticación con validación y manejo de errores
 * 
 * Valida:
 * - Renderizado de campos de email y contraseña
 * - Envío de formulario con datos correctos
 * - Display de mensajes de error de validación y API
 * - Integración con useAuth hook para login
 * - Renderizado de footer con link
 */
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import AuthForm from "../AuthForm";

const mockLogin = vi.fn();

vi.mock("@hooks/useAuth", () => ({
  useAuth: () => ({
    login: mockLogin,
  }),
}));

describe("AuthForm", () => {
  const mockOnSubmit = vi.fn();

  const defaultProps = {
    title: "Login",
    subtitle: "Enter your credentials",
    buttonText: "Sign In",
    footerText: "Don't have an account?",
    footerLinkHref: "/signup",
    footerLinkText: "Sign up",
    children: <input type="email" placeholder="Email" />,
    onSubmit: mockOnSubmit,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render title", () => {
    render(
      <BrowserRouter>
        <AuthForm {...defaultProps} />
      </BrowserRouter>
    );

    expect(screen.getByText("Login")).toBeInTheDocument();
  });

  it("should render subtitle", () => {
    render(
      <BrowserRouter>
        <AuthForm {...defaultProps} />
      </BrowserRouter>
    );

    expect(screen.getByText("Enter your credentials")).toBeInTheDocument();
  });

  it("should render submit button with text", () => {
    render(
      <BrowserRouter>
        <AuthForm {...defaultProps} />
      </BrowserRouter>
    );

    expect(screen.getByRole("button", { name: "Sign In" })).toBeInTheDocument();
  });

  it("should render footer text and link", () => {
    render(
      <BrowserRouter>
        <AuthForm {...defaultProps} />
      </BrowserRouter>
    );

    expect(screen.getByText("Don't have an account?")).toBeInTheDocument();
    expect(screen.getByText("Sign up")).toBeInTheDocument();
  });

  it("should render children", () => {
    render(
      <BrowserRouter>
        <AuthForm {...defaultProps} />
      </BrowserRouter>
    );

    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
  });

  it("should call onSubmit when form is submitted", () => {
    render(
      <BrowserRouter>
        <AuthForm {...defaultProps} />
      </BrowserRouter>
    );

    const form = screen.getByRole("button", { name: "Sign In" }).closest("form");
    fireEvent.submit(form!);

    expect(mockOnSubmit).toHaveBeenCalled();
  });

  it("should display error message when error prop is provided", () => {
    const error = {
      message: "Invalid credentials",
      status: 401,
      code: "UNAUTHORIZED",
    };

    render(
      <BrowserRouter>
        <AuthForm {...defaultProps} error={error} />
      </BrowserRouter>
    );

    expect(screen.getByText("Invalid credentials")).toBeInTheDocument();
  });

  it("should disable button when isLoading is true", () => {
    render(
      <BrowserRouter>
        <AuthForm {...defaultProps} isLoading={true} />
      </BrowserRouter>
    );

    const button = screen.getByRole("button", { name: /sign in/i });
    expect(button).toBeDisabled();
  });

  it("should call login when Microsoft login button is clicked", async () => {
    render(
      <BrowserRouter>
        <AuthForm {...defaultProps} />
      </BrowserRouter>
    );

    const msButton = screen.getByText("Login con Microsoft");
    fireEvent.click(msButton);

    expect(mockLogin).toHaveBeenCalled();
  });

  it("should handle login errors", async () => {
    mockLogin.mockRejectedValue(new Error("Login failed"));
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    render(
      <BrowserRouter>
        <AuthForm {...defaultProps} />
      </BrowserRouter>
    );

    const msButton = screen.getByText("Login con Microsoft");
    fireEvent.click(msButton);

    await vi.waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Error durante el login",
        expect.any(Error)
      );
    });

    consoleSpy.mockRestore();
  });
});

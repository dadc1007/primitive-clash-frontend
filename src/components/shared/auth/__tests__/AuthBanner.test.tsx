/**
 * @file AuthBanner.test.tsx
 * @description Tests para banner de autenticación con estilos condicionales
 * 
 * Valida:
 * - Renderizado de título y slogan
 * - Display de imagen de fondo
 * - Estilos diferentes para tipo login vs signup
 * - Clases CSS aplicadas según el tipo de banner
 */
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import AuthBanner from "../AuthBanner";

describe("AuthBanner", () => {
  const defaultProps = {
    title: "Welcome Back",
    slogan: "Ready for battle?",
    imageUrl: "/images/banner.jpg",
    type: "login" as const,
  };

  it("should render title", () => {
    render(<AuthBanner {...defaultProps} />);

    expect(screen.getByText("Welcome Back")).toBeInTheDocument();
  });

  it("should render slogan", () => {
    render(<AuthBanner {...defaultProps} />);

    expect(screen.getByText("Ready for battle?")).toBeInTheDocument();
  });

  it("should render image with alt text", () => {
    render(<AuthBanner {...defaultProps} />);

    const image = screen.getByAltText("Banner decorativo del juego");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/images/banner.jpg");
  });

  it("should apply login styles", () => {
    const { container } = render(<AuthBanner {...defaultProps} />);

    const bannerDiv = container.querySelector(".bg-primary");
    expect(bannerDiv).toBeInTheDocument();
  });

  it("should apply signup styles", () => {
    const { container } = render(
      <AuthBanner {...defaultProps} type="signup" />
    );

    const bannerDiv = container.querySelector(".bg-secondary");
    expect(bannerDiv).toBeInTheDocument();
  });

  it("should render different title for signup", () => {
    render(
      <AuthBanner
        title="Join the Battle"
        slogan="Create your account"
        imageUrl="/images/signup.jpg"
        type="signup"
      />
    );

    expect(screen.getByText("Join the Battle")).toBeInTheDocument();
    expect(screen.getByText("Create your account")).toBeInTheDocument();
  });

  it("should apply correct text color classes for login", () => {
    const { container } = render(<AuthBanner {...defaultProps} />);

    const titleElement = screen.getByText("Welcome Back");
    expect(titleElement).toHaveClass("text-primary-foreground");
  });

  it("should apply correct text color classes for signup", () => {
    const { container } = render(
      <AuthBanner {...defaultProps} type="signup" />
    );

    const titleElement = screen.getByText("Welcome Back");
    expect(titleElement).toHaveClass("text-secondary-foreground");
  });

  it("should render with complex title containing multiple words", () => {
    render(
      <AuthBanner
        title="Welcome to Primitive Clash"
        slogan="Epic battles await"
        imageUrl="/test.jpg"
        type="login"
      />
    );

    expect(screen.getByText("Welcome to Primitive Clash")).toBeInTheDocument();
  });

  it("should render with long slogan", () => {
    const longSlogan = "This is a very long slogan that should still render correctly in the banner component";
    render(
      <AuthBanner
        title="Test"
        slogan={longSlogan}
        imageUrl="/test.jpg"
        type="signup"
      />
    );

    expect(screen.getByText(longSlogan)).toBeInTheDocument();
  });
});

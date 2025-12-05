/**
 * @file Elixir.test.tsx
 * @description Tests for elixir cost display component
 * 
 * Validates:
 * - Numeric cost rendering
 * - Zero cost handling
 * - Undefined cost behavior
 * - Elixir badge visual styling
 */
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Elixir from "../Elixir";

describe("Elixir", () => {
  it("should render elixir cost", () => {
    render(<Elixir cost={3} />);

    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("should render with cost 0", () => {
    render(<Elixir cost={0} />);

    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("should render undefined when no cost provided", () => {
    const { container } = render(<Elixir />);

    const paragraph = container.querySelector("p");
    expect(paragraph).toBeInTheDocument();
    expect(paragraph?.textContent).toBe("");
  });

  it("should render high cost values", () => {
    render(<Elixir cost={10} />);

    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("should have correct styling classes", () => {
    const { container } = render(<Elixir cost={5} />);

    const elixirDiv = container.querySelector(".bg-purple-500");
    expect(elixirDiv).toBeInTheDocument();
    expect(elixirDiv).toHaveClass("rounded-[50%_50%_50%_0]");
  });
});

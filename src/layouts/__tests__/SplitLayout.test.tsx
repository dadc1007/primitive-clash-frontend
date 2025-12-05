/**
 * @file SplitLayout.test.tsx
 * @description Tests for the split layout component
 * 
 * Validates:
 * - Left and right content rendering
 * - Two-column structure
 * - Responsive layout
 */
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import SplitLayout from "../SplitLayout";

describe("SplitLayout", () => {
  it("should render left content", () => {
    const leftContent = <div data-testid="left-content">Left Side</div>;
    const rightContent = <div>Right Side</div>;

    render(
      <SplitLayout leftContent={leftContent} rightContent={rightContent} />
    );

    expect(screen.getByTestId("left-content")).toBeInTheDocument();
    expect(screen.getByText("Left Side")).toBeInTheDocument();
  });

  it("should render right content", () => {
    const leftContent = <div>Left Side</div>;
    const rightContent = <div data-testid="right-content">Right Side</div>;

    render(
      <SplitLayout leftContent={leftContent} rightContent={rightContent} />
    );

    expect(screen.getByTestId("right-content")).toBeInTheDocument();
    expect(screen.getByText("Right Side")).toBeInTheDocument();
  });

  it("should render both contents simultaneously", () => {
    const leftContent = <div>Left Side</div>;
    const rightContent = <div>Right Side</div>;

    render(
      <SplitLayout leftContent={leftContent} rightContent={rightContent} />
    );

    expect(screen.getByText("Left Side")).toBeInTheDocument();
    expect(screen.getByText("Right Side")).toBeInTheDocument();
  });

  it("should have correct layout structure", () => {
    const leftContent = <div>Left</div>;
    const rightContent = <div>Right</div>;

    const { container } = render(
      <SplitLayout leftContent={leftContent} rightContent={rightContent} />
    );

    const mainContainer = container.querySelector(".min-h-screen.flex");
    expect(mainContainer).toBeInTheDocument();
  });

  it("should have two columns with w-1/2 class", () => {
    const leftContent = <div>Left</div>;
    const rightContent = <div>Right</div>;

    const { container } = render(
      <SplitLayout leftContent={leftContent} rightContent={rightContent} />
    );

    const columns = container.querySelectorAll(".w-1\\/2");
    expect(columns).toHaveLength(2);
  });

  it("should center content in both columns", () => {
    const leftContent = <div>Left</div>;
    const rightContent = <div>Right</div>;

    const { container } = render(
      <SplitLayout leftContent={leftContent} rightContent={rightContent} />
    );

    const columns = container.querySelectorAll(".items-center.justify-center");
    expect(columns.length).toBeGreaterThanOrEqual(2);
  });

  it("should handle complex content", () => {
    const leftContent = (
      <div>
        <h1>Title</h1>
        <p>Description</p>
      </div>
    );
    const rightContent = (
      <div>
        <button>Click me</button>
        <input type="text" />
      </div>
    );

    render(
      <SplitLayout leftContent={leftContent} rightContent={rightContent} />
    );

    expect(screen.getByText("Title")).toBeInTheDocument();
    expect(screen.getByText("Description")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
    expect(screen.getByRole("textbox")).toBeInTheDocument();
  });
});

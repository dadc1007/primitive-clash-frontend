/**
 * @file CombatStatCard.test.tsx
 * @description Tests para tarjeta de estadísticas de combate con esquemas de color
 * 
 * Valida:
 * - Renderizado con esquemas de color (red, green, blue)
 * - Display correcto de valores numéricos y string
 * - Clases CSS apropiadas por esquema de color
 * - Iconos y labels de estadísticas de combate
 */
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CombatStatCard from "../CombatStatCard";

describe("CombatStatCard", () => {
  it("should render with red color scheme", () => {
    render(
      <CombatStatCard
        icon={["fas", "hand-fist"]}
        label="Damage"
        value={100}
        colorScheme="red"
      />
    );

    expect(screen.getByText("Damage", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
  });

  it("should render with green color scheme", () => {
    render(
      <CombatStatCard
        icon={["fas", "heart"]}
        label="Health"
        value={500}
        colorScheme="green"
      />
    );

    expect(screen.getByText("Health", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("500")).toBeInTheDocument();
  });

  it("should render with blue color scheme", () => {
    render(
      <CombatStatCard
        icon={["fas", "bullseye"]}
        label="Range"
        value={5}
        colorScheme="blue"
      />
    );

    expect(screen.getByText("Range", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
  });

  it("should render with cyan color scheme", () => {
    render(
      <CombatStatCard
        icon={["fas", "eye"]}
        label="Vision"
        value={8}
        colorScheme="cyan"
      />
    );

    expect(screen.getByText("Vision", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("8")).toBeInTheDocument();
  });

  it("should render string value", () => {
    render(
      <CombatStatCard
        icon={["fas", "star"]}
        label="Level"
        value="Max"
        colorScheme="red"
      />
    );

    expect(screen.getByText("Level", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("Max")).toBeInTheDocument();
  });

  it("should render with zero value", () => {
    render(
      <CombatStatCard
        icon={["fas", "droplet"]}
        label="Cost"
        value={0}
        colorScheme="blue"
      />
    );

    expect(screen.getByText("Cost", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("should have correct CSS classes for red scheme", () => {
    const { container } = render(
      <CombatStatCard
        icon={["fas", "hand-fist"]}
        label="Attack"
        value={50}
        colorScheme="red"
      />
    );

    const cardDiv = container.querySelector(".border-red-500\\/30");
    expect(cardDiv).toBeInTheDocument();
  });

  it("should have correct CSS classes for green scheme", () => {
    const { container } = render(
      <CombatStatCard
        icon={["fas", "heart"]}
        label="HP"
        value={100}
        colorScheme="green"
      />
    );

    const cardDiv = container.querySelector(".border-green-500\\/30");
    expect(cardDiv).toBeInTheDocument();
  });
});

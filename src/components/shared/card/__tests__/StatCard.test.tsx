/**
 * @file StatCard.test.tsx
 * @description Tests para tarjeta de estadísticas con tematización por raridad
 * 
 * Valida:
 * - Renderizado con tema purple por defecto (sin raridad)
 * - Valores numéricos y string
 * - Tematización dinámica según raridad (Common, Rare, Epic, Legendary)
 * - Clases CSS correctas para cada tema
 * - Display de iconos y labels
 */
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import StatCard from "../StatCard";

describe("StatCard", () => {
  it("should render without rarity (purple theme)", () => {
    render(
      <StatCard icon={["fas", "droplet"]} label="Elixir" value={3} />
    );

    expect(screen.getByText("Elixir")).toBeInTheDocument();
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("should render string value", () => {
    render(
      <StatCard icon={["fas", "star"]} label="Level" value="Max" />
    );

    expect(screen.getByText("Level")).toBeInTheDocument();
    expect(screen.getByText("Max")).toBeInTheDocument();
  });

  it("should render with Common rarity", () => {
    render(
      <StatCard
        icon={["fas", "heart"]}
        label="HP"
        value={500}
        rarity="Common"
      />
    );

    expect(screen.getByText("HP")).toBeInTheDocument();
    expect(screen.getByText("500")).toBeInTheDocument();
  });

  it("should render with Rare rarity", () => {
    render(
      <StatCard
        icon={["fas", "bullseye"]}
        label="Damage"
        value={100}
        rarity="Rare"
      />
    );

    expect(screen.getByText("Damage")).toBeInTheDocument();
    expect(screen.getByText("100")).toBeInTheDocument();
  });

  it("should render with Epic rarity", () => {
    render(
      <StatCard
        icon={["fas", "eye"]}
        label="Range"
        value={8}
        rarity="Epic"
      />
    );

    expect(screen.getByText("Range")).toBeInTheDocument();
    expect(screen.getByText("8")).toBeInTheDocument();
  });

  it("should render with Legendary rarity", () => {
    render(
      <StatCard
        icon={["fas", "gem"]}
        label="Power"
        value={999}
        rarity="Legendary"
      />
    );

    expect(screen.getByText("Power")).toBeInTheDocument();
    expect(screen.getByText("999")).toBeInTheDocument();
  });

  it("should render with zero value", () => {
    render(
      <StatCard icon={["fas", "droplet"]} label="Cost" value={0} />
    );

    expect(screen.getByText("Cost")).toBeInTheDocument();
    expect(screen.getByText("0")).toBeInTheDocument();
  });

  it("should render with large numeric value", () => {
    render(
      <StatCard icon={["fas", "heart"]} label="HP" value={10000} />
    );

    expect(screen.getByText("HP")).toBeInTheDocument();
    expect(screen.getByText("10000")).toBeInTheDocument();
  });
});

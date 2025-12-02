/**
 * @file InfoCard.test.tsx
 * @description Tests para tarjeta de información con label e icono
 * 
 * Valida:
 * - Renderizado de label y contenido children
 * - Display correcto de iconos FontAwesome
 * - Composición flexible con diferentes tipos de children
 * - Layout y estilos de la tarjeta
 */
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import InfoCard from "../InfoCard";

describe("InfoCard", () => {
  it("should render label and children", () => {
    render(
      <InfoCard icon={["fas", "heart"]} label="Health">
        <p>1000 HP</p>
      </InfoCard>
    );

    expect(screen.getByText("Health", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("1000 HP")).toBeInTheDocument();
  });

  it("should render with different icon", () => {
    render(
      <InfoCard icon={["fas", "bullseye"]} label="Target">
        <span>Ground Units</span>
      </InfoCard>
    );

    expect(screen.getByText("Target", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("Ground Units")).toBeInTheDocument();
  });

  it("should render complex children content", () => {
    render(
      <InfoCard icon={["fas", "star"]} label="Stats">
        <div>
          <p>Damage: 100</p>
          <p>Range: 5</p>
        </div>
      </InfoCard>
    );

    expect(screen.getByText("Stats", { exact: false })).toBeInTheDocument();
    expect(screen.getByText("Damage: 100")).toBeInTheDocument();
    expect(screen.getByText("Range: 5")).toBeInTheDocument();
  });

  it("should have correct styling classes", () => {
    const { container } = render(
      <InfoCard icon={["fas", "gem"]} label="Rarity">
        <p>Legendary</p>
      </InfoCard>
    );

    const cardDiv = container.querySelector(".border.border-stone-600\\/50");
    expect(cardDiv).toBeInTheDocument();
  });
});

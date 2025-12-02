/**
 * @file icon.utils.test.ts
 * @description Tests para configuración de FontAwesome icon library
 * 
 * Valida:
 * - Iconos solid (fas) están registrados en la librería
 * - Iconos brand (fab) están disponibles (Microsoft, Google, GitHub)
 * - Iconos específicos del juego están presentes (trophy, coins, gem, etc)
 */
import { describe, it, expect } from "vitest";
import { library } from "@fortawesome/fontawesome-svg-core";

// Importar el archivo para ejecutar las configuraciones
import "@utils/icon.utils";

describe("icon.utils", () => {
  it("should add icons to FontAwesome library", () => {
    // Verificar que la librería tiene definiciones
    expect(library.definitions).toBeDefined();
  });

  it("should have solid icons registered", () => {
    const definitions = library.definitions;
    expect(definitions.fas).toBeDefined();
  });

  it("should have brand icons registered", () => {
    const definitions = library.definitions;
    expect(definitions.fab).toBeDefined();
  });

  it("should have specific solid icons", () => {
    const solidIcons = library.definitions.fas;
    const expectedIcons = [
      "arrow-left",
      "xmark",
      "trophy",
      "coins",
      "gem",
      "magnifying-glass",
      "layer-group",
      "store",
      "users",
      "clock-rotate-left",
      "arrow-right-from-bracket",
      "droplet",
      "star",
      "bullseye",
      "hand-fist",
      "heart",
      "eye",
    ];

    expectedIcons.forEach((iconName) => {
      expect(solidIcons).toHaveProperty(iconName);
    });
  });

  it("should have specific brand icons", () => {
    const brandIcons = library.definitions.fab;
    const expectedIcons = ["microsoft", "google", "github"];

    expectedIcons.forEach((iconName) => {
      expect(brandIcons).toHaveProperty(iconName);
    });
  });
});

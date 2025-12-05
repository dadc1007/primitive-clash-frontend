/**
 * @file icon.utils.test.ts
 * @description Tests for FontAwesome icon library configuration
 * 
 * Validates:
 * - Solid icons (fas) registered in library
 * - Brand icons (fab) available (Microsoft, Google, GitHub)
 * - Game-specific icons present (trophy, coins, gem, etc)
 */
import { describe, it, expect } from "vitest";
import { library } from "@fortawesome/fontawesome-svg-core";

// Importar el archivo para ejecutar las configuraciones
import "@utils/icon.utils";

describe("icon.utils", () => {
  it("should add icons to FontAwesome library", () => {
    // Verificar que la librería existe y tiene contenido
    expect(library).toBeDefined();
    // @ts-expect-error - Accediendo a propiedad interna para testing
    expect(library.definitions).toBeDefined();
  });

  it("should have solid icons registered", () => {
    // @ts-expect-error - Accediendo a propiedad interna para testing
    const definitions = library.definitions;
    expect(definitions.fas).toBeDefined();
  });

  it("should have brand icons registered", () => {
    // @ts-expect-error - Accediendo a propiedad interna para testing
    const definitions = library.definitions;
    expect(definitions.fab).toBeDefined();
  });

  it("should have specific solid icons", () => {
    // @ts-expect-error - Accediendo a propiedad interna para testing
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

    for (const iconName of expectedIcons) {
      expect(solidIcons).toHaveProperty(iconName);
    }
  });

  it("should have specific brand icons", () => {
    // @ts-expect-error - Accediendo a propiedad interna para testing
    const brandIcons = library.definitions.fab;
    const expectedIcons = ["microsoft", "google", "github"];

    for (const iconName of expectedIcons) {
      expect(brandIcons).toHaveProperty(iconName);
    }
  });
});

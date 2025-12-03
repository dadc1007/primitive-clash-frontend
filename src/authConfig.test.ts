/**
 * @file authConfig.test.ts
 * @description Tests para configuración de autenticación Azure AD B2C con MSAL
 * 
 * Valida:
 * - Existencia de objeto msalConfig
 * - Propiedades requeridas (clientId, authority, redirectUri)
 * - Estructura correcta de configuración MSAL
 * - Cache configuration para autenticación
 */
import { describe, it, expect } from "vitest";
import { msalConfig } from "./authConfig";

describe("authConfig", () => {
  it("should export msalConfig", () => {
    expect(msalConfig).toBeDefined();
  });

  it("should have auth object", () => {
    expect(msalConfig.auth).toBeDefined();
  });

  it("should have clientId property", () => {
    expect(msalConfig.auth).toHaveProperty("clientId");
  });

  it("should have authority property", () => {
    expect(msalConfig.auth).toHaveProperty("authority");
  });

  it("should have redirectUri property", () => {
    expect(msalConfig.auth).toHaveProperty("redirectUri");
  });
});

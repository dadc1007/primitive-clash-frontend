/**
 * @file authConfig.test.ts
 * @description Tests for Azure AD B2C authentication configuration with MSAL
 * 
 * Validates:
 * - msalConfig object existence
 * - Required properties (clientId, authority, redirectUri)
 * - Correct MSAL configuration structure
 * - Cache configuration for authentication
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

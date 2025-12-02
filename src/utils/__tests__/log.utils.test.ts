/**
 * @file log.utils.test.ts
 * @description Tests para funciones de logging condicional basado en ambiente
 * 
 * Valida:
 * - Logs solo se ejecutan en desarrollo (NODE_ENV !== 'production')
 * - console.log y console.error son llamados con los argumentos correctos
 * - Logs son suprimidos en producción para mejor performance
 */
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { log, logError } from "../log.utils";

describe("log.utils", () => {
  let consoleLogSpy: ReturnType<typeof vi.spyOn>;
  let consoleErrorSpy: ReturnType<typeof vi.spyOn>;
  const originalEnv = import.meta.env.DEV;

  beforeEach(() => {
    consoleLogSpy = vi.spyOn(console, "log").mockImplementation(() => {});
    consoleErrorSpy = vi.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    consoleLogSpy.mockRestore();
    consoleErrorSpy.mockRestore();
  });

  describe("log", () => {
    it("should call console.log in development mode", () => {
      log("test message", { key: "value" });

      if (originalEnv) {
        expect(consoleLogSpy).toHaveBeenCalledWith("test message", {
          key: "value",
        });
      } else {
        expect(consoleLogSpy).not.toHaveBeenCalled();
      }
    });

    it("should handle multiple arguments", () => {
      log("message", 1, true, { data: "test" });

      if (originalEnv) {
        expect(consoleLogSpy).toHaveBeenCalledWith(
          "message",
          1,
          true,
          { data: "test" }
        );
      } else {
        expect(consoleLogSpy).not.toHaveBeenCalled();
      }
    });

    it("should handle no arguments", () => {
      log();

      if (originalEnv) {
        expect(consoleLogSpy).toHaveBeenCalledWith();
      } else {
        expect(consoleLogSpy).not.toHaveBeenCalled();
      }
    });
  });

  describe("logError", () => {
    it("should call console.error with message and details in development", () => {
      logError("Error occurred", { errorCode: 500 });

      if (originalEnv) {
        expect(consoleErrorSpy).toHaveBeenCalledWith("Error occurred", {
          errorCode: 500,
        });
      } else {
        expect(consoleErrorSpy).not.toHaveBeenCalled();
      }
    });

    it("should handle multiple detail arguments", () => {
      logError("Error", "detail1", "detail2", { key: "value" });

      if (originalEnv) {
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          "Error",
          "detail1",
          "detail2",
          { key: "value" }
        );
      } else {
        expect(consoleErrorSpy).not.toHaveBeenCalled();
      }
    });

    it("should handle error without details", () => {
      logError("Simple error");

      if (originalEnv) {
        expect(consoleErrorSpy).toHaveBeenCalledWith("Simple error");
      } else {
        expect(consoleErrorSpy).not.toHaveBeenCalled();
      }
    });
  });
});

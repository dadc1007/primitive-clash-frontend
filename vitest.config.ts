import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "node:path";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/tests/setup.ts",
    css: true,
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      reportsDirectory: "./coverage",
      exclude: [
        "node_modules/",
        "src/tests/",
        "**/*.d.ts",
        "**/*.config.*",
        "**/mockData",
        "**/dist",
        "**/*.spec.ts",
        "**/*.test.ts",
        "**/*.spec.tsx",
        "**/*.test.tsx",
        // Barrel exports: solo re-exportan otros módulos, sin lógica propia
        "**/index.ts",
        // SignalR: requiere servidor real y mocks muy complejos, testear con E2E
        "src/api/SignalRClient.ts",
        "src/hooks/useMatchmaking.ts",
        // Azure MSAL: requiere configuración de Azure AD, testear manualmente o con E2E
        "src/hooks/useAuth.ts",
        // Assets: archivos no ejecutables (imágenes, iconos, etc)
        "src/assets/**",
        // Carpetas de tests
        "**/__tests__/**",
      ],
    },
  },
  resolve: {
    alias: {
      "@api": path.resolve(__dirname, "./src/api"),
      "@assets": path.resolve(__dirname, "./src/assets"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@hooks": path.resolve(__dirname, "./src/hooks"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@providers": path.resolve(__dirname, "./src/providers"),
      "@styles": path.resolve(__dirname, "./src/styles"),
      "@lib": path.resolve(__dirname, "./src/types"),
      "@unity": path.resolve(__dirname, "./src/unity"),
      "@utils": path.resolve(__dirname, "./src/utils"),
      "@": path.resolve(__dirname, "./src"),
      "@public": path.resolve(__dirname, "./public"),
    },
  },
});

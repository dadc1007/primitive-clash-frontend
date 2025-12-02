import "@testing-library/jest-dom";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Limpiar después de cada test
afterEach(() => {
  cleanup();
});

// Mock de variables de entorno si es necesario
// process.env.VITE_API_URL = 'http://localhost:3000';

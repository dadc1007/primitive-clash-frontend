# Testing Guide

Este proyecto utiliza **Vitest** y **React Testing Library** para pruebas unitarias.

## Dependencias Instaladas

- `vitest` - Framework de testing rápido compatible con Vite
- `@testing-library/react` - Utilidades para testing de componentes React
- `@testing-library/jest-dom` - Matchers adicionales para Jest/Vitest
- `@testing-library/user-event` - Simular interacciones de usuario
- `jsdom` - Entorno DOM para Node.js
- `@vitest/ui` - Interfaz visual para tests
- `@vitest/coverage-v8` - Reportes de cobertura de código

## Comandos Disponibles

```bash
# Ejecutar tests en modo watch (recomendado para desarrollo)
npm test

# Ejecutar tests una sola vez
npm run test:run

# Ejecutar tests con interfaz visual
npm run test:ui

# Generar reporte de cobertura
npm run test:coverage
```

## Estructura de Tests

Los tests siguen el estándar de scaffolding recomendado:

```
src/
├── utils/
│   ├── __tests__/
│   │   ├── translations.utils.test.ts
│   │   ├── rarityMapping.utils.test.ts
│   │   └── log.utils.test.ts
│   ├── translations.utils.ts
│   ├── rarityMapping.utils.ts
│   └── log.utils.ts
├── hooks/
│   ├── __tests__/
│   │   ├── useCard.test.tsx
│   │   └── useDeck.test.tsx
│   ├── useCard.ts
│   └── useDeck.ts
├── components/
│   └── shared/
│       ├── __tests__/
│       │   └── GameCard.test.tsx
│       ├── card/
│       │   ├── __tests__/
│       │   │   └── Elixir.test.tsx
│       │   └── Elixir.tsx
│       └── GameCard.tsx
└── tests/
    └── setup.ts          # Configuración global de tests
```

## Tests Implementados

### Utilidades (Utils)
- `translations.utils.test.ts` - 13 tests
  - Traducciones de rareza (Common, Rare, Epic, Legendary)
  - Traducciones de tipo de carta (Troop, Building, Spell)
  - Traducciones de clase de unidad (Ground, Air, Buildings)

- `rarityMapping.utils.test.ts` - 6 tests
  - Clases CSS para cada rareza
  - Validación de propiedades (border, shadow)

- `log.utils.test.ts` - 6 tests
  - Logging condicional según ambiente (DEV/PROD)
  - Manejo de errores

### Hooks
- `useCard.test.tsx` - 4 tests
  - Fetch exitoso de detalles de carta
  - Manejo de cardId vacío
  - Manejo de errores

- `useDeck.test.tsx` - 5 tests
  - Fetch exitoso de mazo
  - Manejo de userId vacío
  - Manejo de errores
  - Refetch al cambiar userId

### Componentes
- `GameCard.test.tsx` - 6 tests
  - Renderizado de nivel de carta
  - Aplicación de clases de rareza
  - Renderizado de imagen
  - Llamada correcta a hooks

- `Elixir.test.tsx` - 5 tests
  - Renderizado de costo de elixir
  - Manejo de valores especiales (0, undefined, valores altos)
  - Validación de estilos CSS

## Cobertura de Código

Después de ejecutar `npm run test:coverage`, encontrarás los reportes en:

- **Terminal**: Resumen de cobertura por archivo
- **coverage/lcov.info**: Para SonarCloud
- **coverage/index.html**: Reporte visual HTML

### Cobertura Actual

- **Utils**: 100% cubierto
- **Hooks (testeados)**: 100% cubierto (useCard, useDeck)
- **Componentes (testeados)**: 100% cubierto (GameCard, Elixir)

## Configuración

### vite.config.ts

```typescript
test: {
  globals: true,
  environment: "jsdom",
  setupFiles: "./src/tests/setup.ts",
  coverage: {
    provider: "v8",
    reporter: ["text", "json", "html", "lcov"],
    exclude: [
      "node_modules/",
      "src/tests/",
      "**/*.d.ts",
      "**/*.config.*",
      "**/mockData",
      "dist/",
    ],
  },
}
```

### src/tests/setup.ts

Configuración global que incluye:
- Importación de `@testing-library/jest-dom`
- Cleanup automático después de cada test
- Mocks de `window.matchMedia` e `IntersectionObserver`

## SonarCloud

El proyecto está configurado para SonarCloud con el archivo `sonar-project.properties`.

Para que SonarCloud detecte la cobertura:
1. Ejecuta `npm run test:coverage` antes del análisis
2. SonarCloud leerá automáticamente `coverage/lcov.info`
3. Los reportes aparecerán en el dashboard de SonarCloud

## Escribir Nuevos Tests

### Test de Utilidad

```typescript
import { describe, it, expect } from "vitest";
import { miUtilidad } from "../miUtilidad";

describe("miUtilidad", () => {
  it("should do something", () => {
    expect(miUtilidad("input")).toBe("output");
  });
});
```

### Test de Hook

```typescript
import { renderHook, waitFor } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { miHook } from "../miHook";

describe("miHook", () => {
  let queryClient: QueryClient;

  const wrapper = ({ children }) => {
    return (
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    );
  };

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: { queries: { retry: false } },
    });
  });

  it("should work", async () => {
    const { result } = renderHook(() => miHook(), { wrapper });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
  });
});
```

### Test de Componente

```typescript
import { render, screen } from "@testing-library/react";
import { MiComponente } from "../MiComponente";

describe("MiComponente", () => {
  it("should render correctly", () => {
    render(<MiComponente texto="Hola" />);
    expect(screen.getByText("Hola")).toBeInTheDocument();
  });
});
```

## Recursos

- [Vitest Documentation](https://vitest.dev/)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library Best Practices](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)

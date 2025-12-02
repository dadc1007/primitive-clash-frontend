# SonarQube Configuration

Este proyecto está configurado para análisis con SonarCloud.

## Configuración Local

### Requisitos

- Node.js 18+
- npm o yarn

### Instalar dependencias de testing

```bash
npm install -D vitest @vitest/ui @vitest/coverage-v8 jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

### Scripts disponibles

- `npm run test` - Ejecutar tests en modo watch
- `npm run test:ui` - Ejecutar tests con interfaz gráfica
- `npm run test:coverage` - Generar reporte de cobertura
- `npm run sonar` - Ejecutar análisis de SonarQube localmente (requiere sonar-scanner instalado)

## Análisis Automático con GitHub Actions

El workflow `.github/workflows/sonar.yml` ejecuta automáticamente el análisis en:

- Push a las ramas `main` y `develop`
- Pull requests abiertos, sincronizados o reabiertos

## Configuración de SonarCloud

### Archivos de configuración

- `sonar-project.properties` - Configuración principal del proyecto
- `.github/workflows/sonar.yml` - Workflow de GitHub Actions

### Variables de entorno requeridas

- `SONAR_TOKEN` - Token de autenticación de SonarCloud (configurado en GitHub Secrets)

## Exclusiones

Los siguientes archivos y directorios están excluidos del análisis:

- `node_modules/`
- `dist/`, `build/`
- `coverage/`
- `public/`
- Archivos de configuración (`*.config.ts`, `*.config.js`)
- Archivos de definición de tipos (`vite-env.d.ts`)

## Coverage

El reporte de cobertura se genera en:

- `coverage/lcov.info` - Formato LCOV
- `coverage/` - Reportes en HTML y JSON

La cobertura mínima recomendada es del 80%.

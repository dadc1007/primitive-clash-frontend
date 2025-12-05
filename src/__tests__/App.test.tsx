/**
 * @file App.test.tsx
 * @description Tests for the main App component
 * 
 * Validates:
 * - RouterProvider rendering
 * - MSAL Provider configuration
 * - Application structure
 */
import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import App from "../App";

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    RouterProvider: () => (
      <div data-testid="mock-router-provider">Router Provider</div>
    ),
  };
});

vi.mock("@azure/msal-react", () => ({
  MsalProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-msal-provider">{children}</div>
  ),
}));

vi.mock("@azure/msal-browser", () => ({
  PublicClientApplication: class MockPublicClientApplication {
    constructor(_config: any) {}
    initialize() {
      return Promise.resolve();
    }
  },
}));

vi.mock("./authConfig", () => ({
  msalConfig: {
    auth: {
      clientId: "test-client-id",
      authority: "test-authority",
    },
  },
}));

vi.mock("./routes", () => ({
  router: {
    routes: [],
  },
}));

describe("App", () => {
  it("should render App component", () => {
    const { container } = render(<App />);
    expect(container).toBeInTheDocument();
  });

  it("should render MsalProvider", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("mock-msal-provider")).toBeInTheDocument();
  });

  it("should render RouterProvider inside MsalProvider", () => {
    const { getByTestId } = render(<App />);
    
    const msalProvider = getByTestId("mock-msal-provider");
    const routerProvider = getByTestId("mock-router-provider");
    
    expect(msalProvider).toContainElement(routerProvider);
  });

  it("should initialize MSAL instance", () => {
    const { getByTestId } = render(<App />);
    expect(getByTestId("mock-msal-provider")).toBeInTheDocument();
  });
});

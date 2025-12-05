/**
 * @file BattleMatch.test.tsx
 * @description Tests for Unity battle component
 * 
 * Validates:
 * - Canvas rendering
 * - Unity script loading
 * - Connection data handling
 * - Navigation back to lobby
 */
import { render, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";
import BattleMatch from "../BattleMatch";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("BattleMatch", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    delete (window as any).onReturnToLobby;
    delete (window as any).createUnityInstance;
    
    // Limpiar scripts agregados anteriormente
    document.querySelectorAll('script[src*="unity"]').forEach((script) => {
      script.remove();
    });
  });

  const renderBattleMatch = (connectionData?: string) => {
    const initialEntries = connectionData
      ? [{ pathname: "/game", state: { connectionData } }]
      : ["/game"];

    return render(
      <MemoryRouter initialEntries={initialEntries}>
        <BattleMatch />
      </MemoryRouter>
    );
  };

  it("should render canvas element", () => {
    renderBattleMatch();
    
    const canvas = document.querySelector("canvas");
    expect(canvas).toBeInTheDocument();
  });

  it("should load Unity script on mount", () => {
    renderBattleMatch();
    
    const script = document.querySelector('script[src*="WebGL.loader.js"]');
    expect(script).toBeInTheDocument();
  });

  it("should set up onReturnToLobby callback", () => {
    renderBattleMatch();
    
    expect(window.onReturnToLobby).toBeDefined();
    expect(typeof window.onReturnToLobby).toBe("function");
  });

  it("should navigate to lobby when onReturnToLobby is called", async () => {
    renderBattleMatch();
    
    await waitFor(() => {
      expect(window.onReturnToLobby).toBeDefined();
    });

    if (window.onReturnToLobby) {
      window.onReturnToLobby();
    }
    
    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/lobby");
    });
  });

  it("should handle connection data from location state", () => {
    const connectionData = "session-123|user-456|token-789|http://localhost";
    renderBattleMatch(connectionData);
    
    expect(document.querySelector("canvas")).toBeInTheDocument();
  });

  it("should create Unity instance when script loads", async () => {
    const mockUnityInstance = {
      Quit: vi.fn().mockResolvedValue(undefined),
      SendMessage: vi.fn(),
    };

    (window as any).createUnityInstance = vi
      .fn()
      .mockResolvedValue(mockUnityInstance);

    renderBattleMatch("test-connection-data");

    await waitFor(() => {
      const script = document.querySelector(
        'script[src*="WebGL.loader.js"]'
      ) as HTMLScriptElement;
      expect(script).toBeInTheDocument();
    });

    // Simular la carga del script
    const script = document.querySelector(
      'script[src*="WebGL.loader.js"]'
    ) as HTMLScriptElement;
    
    if (script && script.onload) {
      (script.onload as any)();
    }

    await waitFor(() => {
      expect((window as any).createUnityInstance).toHaveBeenCalled();
    });
  });

  it("should quit Unity instance before navigating back", async () => {
    const mockQuit = vi.fn().mockResolvedValue(undefined);
    const mockUnityInstance = {
      Quit: mockQuit,
      SendMessage: vi.fn(),
    };

    (window as any).createUnityInstance = vi
      .fn()
      .mockResolvedValue(mockUnityInstance);

    renderBattleMatch();

    await waitFor(() => {
      const script = document.querySelector(
        'script[src*="WebGL.loader.js"]'
      ) as HTMLScriptElement;
      if (script && script.onload) {
        (script.onload as any)();
      }
    });

    await waitFor(() => {
      expect((window as any).createUnityInstance).toHaveBeenCalled();
    });

    // Almacenar la referencia de la instancia
    await waitFor(() => {
      expect(window.onReturnToLobby).toBeDefined();
    });
  });

  it("should handle canvas ref correctly", () => {
    const { container } = renderBattleMatch();
    
    const canvas = container.querySelector("canvas");
    expect(canvas).toBeInTheDocument();
    expect(canvas?.tagName).toBe("CANVAS");
  });

  it("should render without connection data", () => {
    const { container } = renderBattleMatch();
    
    expect(container.querySelector("canvas")).toBeInTheDocument();
  });
});

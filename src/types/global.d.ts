declare global {
  interface ErrorConstructor {
    captureStackTrace?(
      error: object,
      constructorOpt?: (...args: unknown[]) => void
    ): void;
  }

  interface Window {
    unityInstance?: {
      SendMessage: (gameObject: string, method: string, value?: string) => void;
    };
    onReturnToLobby?: () => void;
  }

  interface HTMLCanvasElement {
    getContextSafariWebGL2Fixed?: (
      type: string,
      attrs?: WebGLContextAttributes
    ) => RenderingContext | null;
  }
}

export {};

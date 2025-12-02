declare global {
  interface ErrorConstructor {
    captureStackTrace?(
      error: object,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
      constructorOpt?: Function
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

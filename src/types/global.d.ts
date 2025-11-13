interface ErrorConstructor {
  captureStackTrace?(error: object, constructorOpt?: Function): void;
}

declare global {
  interface Window {
    unityInstance?: {
      SendMessage: (gameObject: string, method: string, value?: any) => void;
    };
  }

  interface HTMLCanvasElement {
    getContextSafariWebGL2Fixed?: (type: string, attrs?: any) => any;
  }
}

declare global {
  interface Window {
    ReactNativeWebView?: { postMessage: (message: string) => void };
    keplr?: any;
    leap?: any;
  }
}

export {};

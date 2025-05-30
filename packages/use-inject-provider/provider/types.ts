import { EIP1193Provider } from 'eip1193-provider';

declare global {
  interface Window {
    ReactNativeWebView?: { postMessage: (message: string) => void };
    ethereum?: EIP1193Provider;
  }
}

export {};

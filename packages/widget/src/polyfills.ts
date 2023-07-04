import { Buffer } from "buffer";

if (typeof window !== "undefined") {
  // Client-side-only code
  window.global = window.global ?? window;
  window.Buffer = window.Buffer ?? Buffer;
  window.process = window.process ?? { env: {} };
}

export {};

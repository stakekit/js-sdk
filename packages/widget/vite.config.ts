/// <reference types="vitest" />
import { defineConfig } from "vite";
import path from "path";
import react from "@vitejs/plugin-react-swc";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    environment: "jsdom",
    include: ["tests/**/*.test.{ts,tsx}"],
    setupFiles: [path.resolve(__dirname, "tests/utils/setup.ts")],
  },
  plugins: [react(), vanillaExtractPlugin()],
  optimizeDeps: { include: ["@stakekit/common"] },
  build: {
    outDir: "dist/website",
    sourcemap: true,
    commonjsOptions: {
      include: [/types/, /node_modules/], // `/types/` is for @stakekit/common
      transformMixedEsModules: true,
    },
  },
  esbuild: { drop: ["console"] },
  server: { host: true },
});

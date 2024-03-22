import { defineConfig } from 'tsup';

export default defineConfig({
  entry: { index: 'src/index.ts', 'msw/index': 'src/api/index.msw.ts' },
  sourcemap: true,
  clean: true,
  format: ['esm'],
  treeshake: true,
  dts: true,
});

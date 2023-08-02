import path from "path";
import * as esbuild from "esbuild";
import inlineImportPlugin from "esbuild-plugin-inline-import";
import { build } from "tsup";

const bundleProvider = () => {
  return esbuild.build({
    entryPoints: [path.resolve(__dirname, "../provider/index.ts")],
    outfile: path.resolve(__dirname, "../provider/generated-provider.js"),
    bundle: true,
    target: ["es2020"],
    treeShaking: true,
    minify: true,
  });
};

const bundlePackage = () => {
  return build({
    entry: [path.resolve(__dirname, "../src/index.ts")],
    splitting: false,
    treeshake: true,
    sourcemap: true,
    target: ["es2020"],
    outDir: "dist",
    format: ["cjs", "esm"],
    esbuildPlugins: [inlineImportPlugin()],
    legacyOutput: true,
    dts: true,
  });
};

const main = async () => {
  await bundleProvider();
  await bundlePackage();
};

main();

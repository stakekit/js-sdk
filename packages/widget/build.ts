import { vanillaExtractPlugin } from "@vanilla-extract/esbuild-plugin";
import autoprefixer from "autoprefixer";
import * as esbuild from "esbuild";
import postcss from "postcss";
import dotenv from "dotenv";

dotenv.config({ path: ".env.production.local" });

const VITE_API_URL = process.env.VITE_API_URL;
const MODE = process.env.MODE;

if (!VITE_API_URL || !MODE) {
  const message = "Missing environment variables.";

  if (process.env.CI) {
    console.warn(message);
  } else {
    throw new Error(message);
  }
}

const commonPlugins = [
  vanillaExtractPlugin({
    outputCss: true,
    processCss: async (css) => {
      const result = await postcss([autoprefixer]).process(css, {
        from: undefined, // suppress source map warning
      });

      return result.css;
    },
  }),
];

const commonConfig: Parameters<(typeof esbuild)["build"]>[0] = {
  treeShaking: true,
  sourcemap: true,
  format: "esm",
  define: {
    "import.meta.env.VITE_API_URL": JSON.stringify(VITE_API_URL ?? ""),
    "import.meta.env.VITE_API_KEY": '""', // api key will be provided by library users
    "import.meta.env.MODE": JSON.stringify(MODE ?? ""),
  },
  alias: {
    stream: "stream-browserify",
  },
};

const buildAsStandaloneApp = async () => {
  await esbuild.build({
    ...commonConfig,
    target: "es2021",
    entryPoints: ["src/index.bundle.ts"],
    outdir: "dist/package/bundle",
    assetNames: "assets/[name]",
    minify: true,
    external: ["crypto"],
    platform: "browser",
    bundle: true,
    plugins: commonPlugins,
    loader: {
      ".png": "file",
    },
  });
};

const buildAsPackage = async () => {
  await esbuild.build({
    ...commonConfig,
    entryPoints: ["src/index.package.ts", "src/polyfills.ts"],
    assetNames: "bundle/assets/[name]",
    splitting: true,
    outdir: "dist/package",
    platform: "browser",
    bundle: true,
    plugins: [
      ...commonPlugins,
      {
        name: "make-all-packages-external",
        setup(build) {
          let filter = /^[^./]|^\.[^./]|^\.\.[^/]/; // Must not start with "/" or "./" or "../"
          build.onResolve({ filter }, (args) =>
            args.path === "@cassiozen/usestatemachine"
              ? { external: false, namespace: "usestatemachine" }
              : { external: true, path: args.path }
          );
        },
      },
    ],
    loader: {
      ".png": "dataurl",
    },
  });
};

await buildAsStandaloneApp();
await buildAsPackage();

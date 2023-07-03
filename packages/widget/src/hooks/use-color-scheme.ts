import { useLayoutEffect, useState } from "react";

const getCurrentColorScheme = () => {
  if (typeof window === "undefined") return "no-preference";

  const isDark = window.matchMedia("(prefers-color-scheme: dark)");
  const isLight = window.matchMedia("(prefers-color-scheme: light)");

  return isDark.matches ? "dark" : isLight.matches ? "light" : "no-preference";
};

export const usePrefersColorScheme = () => {
  const [preferredColorSchema, setPreferredColorSchema] = useState<{
    theme: "dark" | "light" | "no-preference";
    force: boolean;
  }>(() => {
    const scheme = getCurrentColorScheme();

    return { force: false, theme: scheme };
  });

  useLayoutEffect(() => {
    if (preferredColorSchema.force) return;

    if (typeof window === "undefined") return;

    const isDark = window.matchMedia("(prefers-color-scheme: dark)");
    const isLight = window.matchMedia("(prefers-color-scheme: light)");

    if (typeof isLight.addEventListener !== "function") return;

    const darkListener = ({ matches }: MediaQueryListEvent) => {
      matches && setPreferredColorSchema({ theme: "dark", force: false });
    };
    const lightListener = ({ matches }: MediaQueryListEvent) => {
      matches && setPreferredColorSchema({ theme: "light", force: false });
    };

    isDark.addEventListener("change", darkListener);
    isLight.addEventListener("change", lightListener);

    return () => {
      isDark.removeEventListener("change", darkListener);
      isLight.removeEventListener("change", lightListener);
    };
  }, [preferredColorSchema]);

  return preferredColorSchema.theme;
};

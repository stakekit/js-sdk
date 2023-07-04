import { useLayoutEffect } from "react";
import { themes } from "../styles";
import { usePrefersColorScheme } from "./use-color-scheme";

export const useToggleTheme = () => {
  const scheme = usePrefersColorScheme();

  useLayoutEffect(() => {
    if (!document) return;

    if (scheme === "dark") {
      document.body.classList.remove(themes.light);
      document.body.classList.remove(themes.lightOverrides);
      document.body.classList.add(themes.dark);
      document.body.classList.add(themes.darkOverrides);
    } else {
      document.body.classList.add(themes.light);
      document.body.classList.add(themes.lightOverrides);
      document.body.classList.remove(themes.dark);
      document.body.classList.remove(themes.darkOverrides);
    }
  }, [scheme]);
};

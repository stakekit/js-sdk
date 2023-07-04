import { defineProperties, createSprinkles } from "@vanilla-extract/sprinkles";
import { Breakpoint, breakpoints, minMediaQuery } from "../tokens/breakpoints";
import { vars } from "./contract.css";
import { responsiveProperties, unresponsiveProperties } from "./properties";

const unresponsiveAtomicProperties = defineProperties({
  properties: unresponsiveProperties,
});

const responsiveAtomicProperties = defineProperties({
  conditions: Object.keys(breakpoints).reduce((acc, key) => {
    const k = key as Breakpoint;

    if (k === "mobile") {
      acc[k] = {};
    } else {
      acc[k] = { "@media": minMediaQuery(k) };
    }

    return acc;
  }, {} as { [Key in Breakpoint]: {} | { "@media": string } }),

  defaultCondition: "mobile",
  properties: responsiveProperties,
  shorthands: {
    px: ["paddingLeft", "paddingRight"],
    py: ["paddingTop", "paddingBottom"],
    mx: ["marginLeft", "marginRight"],
    my: ["marginTop", "marginBottom"],
    hw: ["height", "width"],
  },
});

const colorAtomicProperties = defineProperties({
  conditions: {
    light: { "@media": "(prefers-color-scheme: light)" },
    dark: { "@media": "(prefers-color-scheme: dark)" },
  },
  defaultCondition: ["dark", "light"],
  properties: {
    color: vars.color,
    background: vars.color,
    borderColor: vars.color,
  },
});

export const atoms = createSprinkles(
  unresponsiveAtomicProperties,
  responsiveAtomicProperties,
  colorAtomicProperties
);

export type Atoms = Parameters<typeof atoms>[0];

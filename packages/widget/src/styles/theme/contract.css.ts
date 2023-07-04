import { createGlobalThemeContract } from "@vanilla-extract/css";
import {
  colorsContract,
  darkThemeColors,
  lightThemeColors,
} from "../tokens/colors";
import { radii, radiiContract } from "../tokens/radii";
import { spaces, spacesContract } from "../tokens/space";
import { zIndices, zIndicesContract } from "../tokens/z-indices";
import {
  fontSizes,
  fontSizesContract,
  fontWeights,
  fontWeightsContract,
  headings,
  headingsContract,
  letterSpacings,
  letterSpacingsContract,
  lineHeights,
  lineHeightsContract,
  texts,
  textsContract,
} from "../tokens/typography";
import { fonts, fontsContract } from "../tokens/fonts";

export const themes = {
  light: "light-theme",
  lightOverrides: "light-theme-overrides",
  dark: "dark-theme",
  darkOverrides: "dark-theme-overrides",
};

export const vars = createGlobalThemeContract(
  {
    color: colorsContract,
    fontSize: fontSizesContract,
    letterSpacing: letterSpacingsContract,
    lineHeight: lineHeightsContract,
    fontWeight: fontWeightsContract,
    borderRadius: radiiContract,
    space: spacesContract,
    heading: headingsContract,
    text: textsContract,
    zIndices: zIndicesContract,
    font: fontsContract,
  },
  (_value, path) =>
    `sk-${path
      .join("-")
      .replace(/([a-z])([A-Z])/g, "$1-$2")
      .toLowerCase()}`
);

const commonStyles = {
  fontSize: fontSizes,
  letterSpacing: letterSpacings,
  lineHeight: lineHeights,
  fontWeight: fontWeights,
  borderRadius: radii,
  space: spaces,
  heading: headings,
  text: texts,
  zIndices: zIndices,
  font: fonts,
};

export const lightTheme = {
  ...commonStyles,
  color: lightThemeColors,
};

export const darkTheme = {
  ...commonStyles,
  color: darkThemeColors,
};

export const id = "stakekit";
export const rootSelector = `[data-rk="${id}"]`;

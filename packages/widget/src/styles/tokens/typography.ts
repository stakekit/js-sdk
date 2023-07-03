import { Breakpoint } from "./breakpoints";

export const letterSpacingsContract = {
  tighter: "",
  tight: "",
  normal: "",
  wide: "",
  wider: "",
  widest: "",
};

export const letterSpacings: typeof letterSpacingsContract = {
  tighter: "-0.05em",
  tight: "-0.025em",
  normal: "0",
  wide: "0.025em",
  wider: "0.05em",
  widest: "0.1em",
};

export type LetterSpacings = keyof typeof letterSpacings;

export const lineHeightsContract = {
  none: "",
  shorter: "",
  short: "",
  base: "",
  tall: "",
  taller: "",
  xs: "",
  sm: "",
  md: "",
  lg: "",
  xl: "",
  "2xl": "",
  "3xl": "",
  "4xl": "",
  "5xl": "",
  "6xl": "",
};

export const lineHeights: typeof lineHeightsContract = {
  none: "1",
  shorter: "1.25",
  short: "1.375",
  base: "1.5",
  tall: "1.625",
  taller: "2",
  xs: "1rem",
  sm: "1.25rem",
  md: "1.5rem",
  lg: "1.75rem",
  xl: "1.75rem",
  "2xl": "2.25rem",
  "3xl": "2.5rem",
  "4xl": "1",
  "5xl": "1",
  "6xl": "1",
};

export type LineHeights = keyof typeof lineHeights;

export const fontWeightsContract = {
  normal: "",
  medium: "",
  semibold: "",
  bold: "",
  extrabold: "",

  modalHeading: "",
  tokenSelect: "",
  primaryButton: "",
  secondaryButton: "",
};

export const fontWeights: typeof fontWeightsContract = {
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
  extrabold: "800",

  modalHeading: "600",
  tokenSelect: "700",
  primaryButton: "700",
  secondaryButton: "700",
};

export type FontWeights = keyof typeof fontWeights;

export const fontSizesContract = {
  xs: "",
  sm: "",
  md: "",
  lg: "",
  lgx: "",
  xl: "",
  "2xl": "",
  "3xl": "",
  "4xl": "",
  "5xl": "",
  "6xl": "",
};

export const fontSizes: typeof fontSizesContract = {
  xs: "0.7rem",
  sm: "0.875rem",
  md: "1rem",
  lg: "1.125rem",
  lgx: "1.3125rem",
  xl: "1.563rem",
  "2xl": "1.953rem",
  "3xl": "2.441rem",
  "4xl": "3.052rem",
  "5xl": "3.815rem",
  "6xl": "4.768rem",
} as const;

export type FontSizes = keyof typeof fontSizes;

export type Heading = "h1" | "h2" | "h3" | "h4";

export const headingsContract: {
  [H in Heading]: { [K in Breakpoint]: { fontSize: string } };
} = {
  h1: {
    mobile: { fontSize: "" },
    tablet: { fontSize: "" },
  },
  h2: {
    mobile: { fontSize: "" },
    tablet: { fontSize: "" },
  },
  h3: {
    mobile: { fontSize: "" },
    tablet: { fontSize: "" },
  },
  h4: {
    mobile: { fontSize: "" },
    tablet: { fontSize: "" },
  },
};

export const headings: typeof headingsContract = {
  h1: {
    mobile: { fontSize: fontSizes["3xl"] },
    tablet: { fontSize: fontSizes["4xl"] },
  },
  h2: {
    mobile: { fontSize: fontSizes["2xl"] },
    tablet: { fontSize: fontSizes["3xl"] },
  },
  h3: {
    mobile: { fontSize: fontSizes["xl"] },
    tablet: { fontSize: fontSizes["2xl"] },
  },
  h4: {
    mobile: { fontSize: fontSizes["lgx"] },
    tablet: { fontSize: fontSizes["lgx"] },
  },
};

export type Text = "standard" | "small" | "xsmall";

export const textsContract: {
  [H in Text]: { [K in Breakpoint]: { fontSize: string } };
} = {
  standard: {
    mobile: { fontSize: "" },
    tablet: { fontSize: "" },
  },
  small: {
    mobile: { fontSize: "" },
    tablet: { fontSize: "" },
  },
  xsmall: {
    mobile: { fontSize: "" },
    tablet: { fontSize: "" },
  },
};

export const texts: typeof textsContract = {
  standard: {
    mobile: { fontSize: fontSizes["lg"] },
    tablet: { fontSize: fontSizes["lg"] },
  },
  small: {
    mobile: { fontSize: fontSizes["md"] },
    tablet: { fontSize: fontSizes["md"] },
  },
  xsmall: {
    mobile: { fontSize: fontSizes["sm"] },
    tablet: { fontSize: fontSizes["sm"] },
  },
};

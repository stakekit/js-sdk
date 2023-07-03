export const radiiContract = {
  none: "",
  sm: "",
  base: "",
  md: "",
  lg: "",
  xl: "",
  "2xl": "",
  "3xl": "",
  full: "",
  half: "",

  widgetBorderRadius: "",
  primaryButton: "",
  secondaryButton: "",
};

export const radii: typeof radiiContract = {
  none: "0",
  sm: "2px",
  base: "4px",
  md: "6px",
  lg: "8px",
  xl: "12px",
  "2xl": "16px",
  "3xl": "24px",
  full: "9999px",
  half: "50%",

  widgetBorderRadius: "0",
  primaryButton: "16px",
  secondaryButton: "16px",
};

export type Radii = keyof typeof radii;

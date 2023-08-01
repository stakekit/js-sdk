export const colorsContract = {
  white: "",
  black: "",
  transparent: "",
  primary: "",
  accent: "",
  disabled: "",

  text: "",
  textMuted: "",
  textDanger: "",

  background: "",
  backgroundMuted: "",

  tokenSelectBackground: "",
  tokenSelectHoverBackground: "",
  tokenSelect: "",

  stakeSectionBackground: "",

  positionsSectionBackgroundColor: "",
  positionsSectionBorderColor: "",
  positionsSectionDividerColor: "",
  positionsClaimRewardsBackground: "",

  modalOverlayBackground: "",
  modalBodyBackground: "",

  primaryButtonColor: "",
  primaryButtonBackground: "",
  primaryButtonOutline: "",
  primaryButtonHoverColor: "",
  primaryButtonHoverBackground: "",
  primaryButtonHoverOutline: "",
  primaryButtonActiveColor: "",
  primaryButtonActiveBackground: "",
  primaryButtonActiveOutline: "",

  secondaryButtonColor: "",
  secondaryButtonBackground: "",
  secondaryButtonOutline: "",
  secondaryButtonHoverColor: "",
  secondaryButtonHoverBackground: "",
  secondaryButtonHoverOutline: "",
  secondaryButtonActiveColor: "",
  secondaryButtonActiveBackground: "",
  secondaryButtonActiveOutline: "",

  disabledButtonColor: "",
  disabledButtonBackground: "",
  disabledButtonOutline: "",
  disabledButtonHoverColor: "",
  disabledButtonHoverBackground: "",
  disabledButtonHoverOutline: "",
  disabledButtonActiveColor: "",
  disabledButtonActiveBackground: "",
  disabledButtonActiveOutline: "",
};

export type Colors = keyof typeof colorsContract;

export const lightThemeColors: typeof colorsContract = {
  white: "#fff",
  black: "#000",
  transparent: "transparent",
  primary: "#fff",
  accent: "#000",
  disabled: "#E0E0E0",

  text: "#373737",
  textMuted: "#999999",
  textDanger: "#FF1515",

  background: "#fff",
  backgroundMuted: "#F6F7F9",

  tokenSelectBackground: "#F6F7F9",
  tokenSelectHoverBackground: "#EEF0F2",
  tokenSelect: "#373737",

  stakeSectionBackground: "#F6F7F9",

  positionsSectionBackgroundColor: "#FFFFFF",
  positionsSectionBorderColor: "#373737",
  positionsSectionDividerColor: "#F6F7F9",
  positionsClaimRewardsBackground: "#45D65C",

  modalOverlayBackground: "rgba(0, 0, 0, 0.5)",
  modalBodyBackground: "#FFFFFF",

  primaryButtonColor: "#FFFFFF",
  primaryButtonBackground: "#000000",
  primaryButtonOutline: "#000000",
  primaryButtonHoverColor: "#FFFFFF",
  primaryButtonHoverBackground: "#1A1A1A",
  primaryButtonHoverOutline: "#1A1A1A",
  primaryButtonActiveColor: "#FFFFFF",
  primaryButtonActiveBackground: "#000000",
  primaryButtonActiveOutline: "#000000",

  secondaryButtonColor: "#000000",
  secondaryButtonBackground: "#FFFFFF",
  secondaryButtonOutline: "#000000",
  secondaryButtonHoverColor: "#373737",
  secondaryButtonHoverBackground: "#FFFFFF",
  secondaryButtonHoverOutline: "#373737",
  secondaryButtonActiveColor: "#000000",
  secondaryButtonActiveBackground: "#FFFFFF",
  secondaryButtonActiveOutline: "#000000",

  disabledButtonColor: "#FFFFFF",
  disabledButtonBackground: "#E0E0E0",
  disabledButtonOutline: "#E0E0E0",
  disabledButtonHoverColor: "#FFFFFF",
  disabledButtonHoverBackground: "#E6E6E6",
  disabledButtonHoverOutline: "#E0E0E0",
  disabledButtonActiveColor: "#FFFFFF",
  disabledButtonActiveBackground: "#E0E0E0",
  disabledButtonActiveOutline: "#E0E0E0",
};

export const darkThemeColors: typeof colorsContract = {
  white: "#fff",
  black: "#000",
  transparent: "transparent",
  primary: "#2B2B2B",
  accent: "#3B6CEC",
  disabled: "#E0E0E0",

  text: "#FFFFFF",
  textMuted: "#999999",
  textDanger: "#FF1515",

  background: "#2B2B2B",
  backgroundMuted: "#383838",

  tokenSelectBackground: "#383838",
  tokenSelectHoverBackground: "#444444",
  tokenSelect: "#FFFFFF",

  stakeSectionBackground: "#383838",

  positionsSectionBackgroundColor: "#2B2B2B",
  positionsSectionBorderColor: "#2B2B2B",
  positionsSectionDividerColor: "#383838",
  positionsClaimRewardsBackground: "#45D65C",

  modalOverlayBackground: "rgba(0, 0, 0, 0.5)",
  modalBodyBackground: "#2B2B2B",

  primaryButtonColor: "#000000",
  primaryButtonBackground: "#FFFFFF",
  primaryButtonOutline: "#FFFFFF",
  primaryButtonHoverColor: "#373737",
  primaryButtonHoverBackground: "#E6E6E6",
  primaryButtonHoverOutline: "#E6E6E6",
  primaryButtonActiveColor: "#000000",
  primaryButtonActiveBackground: "#FFFFFF",
  primaryButtonActiveOutline: "#000000",

  secondaryButtonColor: "#FFFFFF",
  secondaryButtonBackground: "#2B2B2B",
  secondaryButtonOutline: "#FFFFFF",
  secondaryButtonHoverColor: "#FFFFFF",
  secondaryButtonHoverBackground: "#2B2B2B",
  secondaryButtonHoverOutline: "#F6F7F9",
  secondaryButtonActiveColor: "#FFFFFF",
  secondaryButtonActiveBackground: "#2B2B2B",
  secondaryButtonActiveOutline: "#FFFFFF",

  disabledButtonColor: "#000000",
  disabledButtonBackground: "#E0E0E0",
  disabledButtonOutline: "#FFFFFF",
  disabledButtonHoverColor: "#000000",
  disabledButtonHoverBackground: "#E6E6E6",
  disabledButtonHoverOutline: "#F6F7F9",
  disabledButtonActiveColor: "#000000",
  disabledButtonActiveBackground: "#E0E0E0",
  disabledButtonActiveOutline: "#FFFFFF",
};

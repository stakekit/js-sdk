import { style } from "@vanilla-extract/css";
import { atoms, vars } from "../../../styles";

export const selectItemText = style({
  color: vars.color.tokenSelect,
  fontWeight: vars.fontWeight.tokenSelect,
});

export const triggerStyles = style({
  width: "100%",
});

export const validatorVirtuosoContainer = style([atoms({ marginTop: "2" })]);

export const hideScrollbar = style({
  "::-webkit-scrollbar": {
    height: 0,
    width: 0,
  },
});

export const tab = style({
  cursor: "pointer",
  userSelect: "none",
});

import { createVar, style } from "@vanilla-extract/css";
import { atoms } from "../../styles";

export const tokenLogo = style({
  borderRadius: "50%",
});

export const breakWord = style({ wordBreak: "break-all" });

export const modalItemNameContainer = style([
  atoms({ marginRight: "2" }),
  breakWord,
]);

export const defaultColor = createVar();

export const defaultColorContainer = style([
  atoms({ borderRadius: "half" }),
  { background: defaultColor },
]);

export const validatorSelectContainer = style([
  defaultColorContainer,
  atoms({ marginRight: "2" }),
]);

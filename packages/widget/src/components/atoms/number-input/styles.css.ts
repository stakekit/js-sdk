import { style } from "@vanilla-extract/css";
import { atoms, vars } from "../../../styles";

export const initialFontSizeVar = vars.fontSize["3xl"];

const fontStyles = style([
  { fontSize: initialFontSizeVar },
  atoms({ fontWeight: "normal" }),
]);

export const numberInput = style([
  fontStyles,
  atoms({
    flex: 1,
    minWidth: "0",
    color: "text",
  }),
  {
    background: "none",
    border: "none",
    outline: "none",
    paddingLeft: 0,
  },
]);

export const spanStyle = style([
  fontStyles,
  {
    position: "absolute",
    left: "-100%",
    bottom: "-100%",
    visibility: "hidden",
  },
]);

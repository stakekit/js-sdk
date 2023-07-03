import { style } from "@vanilla-extract/css";
import { atoms } from "../../../styles";

export const inlineText = style([
  atoms({
    fontSize: "xs",
    color: "textMuted",
  }),
  { display: "inline" },
]);

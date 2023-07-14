import { style } from "@vanilla-extract/css";
import { atoms } from "../../../../styles";

export const virtuosoContainer = style({
  width: "100%",
});

export const messageContainer = style([
  {
    alignSelf: "flex-start",
  },
  atoms({ marginTop: "2" }),
]);

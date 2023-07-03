import { style } from "@vanilla-extract/css";
import { minMediaQuery } from "./styles/tokens/breakpoints";

export const container = style({
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  marginLeft: "auto",
  marginRight: "auto",
  borderTopLeftRadius: "20px",
  borderTopRightRadius: "20px",
  "@media": {
    [minMediaQuery("tablet")]: {
      height: "670px",
      width: "400px",
      borderRadius: "20px",
    },
  },
});

import { style } from "@vanilla-extract/css";
import { vars } from "../../styles";

export const divider = style({
  backgroundColor: vars.color.positionsSectionDividerColor,
});

export const mainContainer = style({
  borderRadius: "24px",
  maxHeight: "500px",
  minWidth: "700px",
  overflow: "scroll",
  borderWidth: "2px",
  borderStyle: "solid",
  borderColor: vars.color.positionsSectionBorderColor,
  maxWidth: "900px",
  flex: 1,
  scrollbarWidth: "none",
  "::-webkit-scrollbar": {
    display: "none",
  },
});

export const topTableContainer = style({
  display: "grid",
  rowGap: vars.space[3],
});

export const tableGrid = style({
  display: "grid",
  gridTemplateColumns: "1.5fr 1fr 1fr",
});

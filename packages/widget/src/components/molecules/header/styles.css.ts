import { style } from "@vanilla-extract/css";
import { atoms } from "../../../styles";

export const titleStyle = style([atoms({ fontWeight: "modalHeading" })]);

export const container = style({
  cursor: "pointer",
  transition: "0.125s ease",
  ":hover": {
    transform: "scale(1.025)",
  },
  ":active": {
    transform: "scale(0.95)",
  },
});

export const parentButton = style({
  opacity: 0,
  pointerEvents: "none",
  userSelect: "none",
});

export const parentContainer = style({
  display: "grid",
  gridTemplateColumns: "minmax(50px, auto) 1fr minmax(50px, auto)",
  alignItems: "center",
  justifyContent: "center",
});

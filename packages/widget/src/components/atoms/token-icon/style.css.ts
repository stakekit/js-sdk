import { createVar, style } from "@vanilla-extract/css";
import { atoms } from "../../../styles";

export const logoContainer = style({
  position: "absolute",
  bottom: -2,
  right: -2,
  borderRadius: "50%",
  padding: "2px",
  backgroundColor: "rgba(37,37,37, 0.95)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

export const smallLogo = style([atoms({ hw: "3" })]);

export const defaultColor = createVar();

export const fallbackContainer = style({ background: defaultColor });

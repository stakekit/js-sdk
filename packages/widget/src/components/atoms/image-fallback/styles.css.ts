import { createVar, style } from "@vanilla-extract/css";

export const defaultColor = createVar();

export const fallbackContainer = style({ background: defaultColor });

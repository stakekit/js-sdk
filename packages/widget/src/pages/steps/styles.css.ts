import { style } from "@vanilla-extract/css";
import { vars } from "../../styles";

export const stepsAfter = style({
  ":after": {
    content: "''",
    background: vars.color.text,
    height: vars.space[3],
    width: vars.space[1],
  },
});

export const stepsAfterMuted = style([
  stepsAfter,
  { ":after": { background: vars.color.textMuted } },
]);

export const stepsBefore = style({
  ":before": {
    content: "''",
    background: vars.color.text,
    height: vars.space[3],
    width: vars.space[1],
  },
});

export const stepsBeforeMuted = style([
  stepsBefore,
  { ":before": { background: vars.color.textMuted } },
]);

export const halfOpacityAfter = style({ ":after": { opacity: 0.5 } });

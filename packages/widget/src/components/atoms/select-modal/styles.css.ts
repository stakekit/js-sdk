import { keyframes, style } from "@vanilla-extract/css";
import { atoms, vars } from "../../../styles";
import {
  breakpoints,
  maxMediaQuery,
  minMediaQuery,
} from "../../../styles/tokens/breakpoints";

const opacityAnimation = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

export const container = style({
  "@media": {
    [minMediaQuery("tablet")]: {
      animationName: opacityAnimation,
      animationDuration: "0.3s",
    },
  },
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "fixed",
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
});

export const overlay = style([
  {
    "@media": {
      [maxMediaQuery("tablet")]: {
        animationName: opacityAnimation,
        animationDuration: "0.3s",
      },
    },
    position: "absolute",
    inset: 0,
    background: vars.color.modalOverlayBackground,
  },
]);

const transformAnimation = keyframes({
  "0%": { transform: "translateY(100%)" },
  "100%": { transform: "translateY(0)" },
});

export const content = style([
  {
    "@media": {
      [maxMediaQuery("tablet")]: {
        animationName: transformAnimation,
        animationDuration: "0.2s",
      },
    },
  },
  atoms({
    width: "full",
    py: "4",
    background: "modalBodyBackground",
  }),
  {
    borderTopLeftRadius: vars.borderRadius["2xl"],
    borderTopRightRadius: vars.borderRadius["2xl"],

    scrollbarWidth: "none",
    "::-webkit-scrollbar": {
      display: "none",
    },

    height: "80vh",
    maxWidth: `${breakpoints.tablet}px`,
    position: "absolute",
    overflow: "scroll",
    bottom: 0,
    "@media": {
      [minMediaQuery("tablet")]: {
        bottom: "auto",
        borderBottomLeftRadius: vars.borderRadius["2xl"],
        borderBottomRightRadius: vars.borderRadius["2xl"],
      },
    },
  },
]);

export const stakeText = style([atoms({ color: "white" })]);

export const noOutline = style({ outline: "none" });

export const tokenLogo = style({ borderRadius: "50%" });

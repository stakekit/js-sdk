import { keyframes, style } from "@vanilla-extract/css";

const fadeInAnimation = keyframes({
  from: {
    opacity: "0",
    transform: "translate(-20px, 0)",
  },
  to: {
    opacity: "1",
    transform: "translate(0px, 0px)",
  },
});

const fadeOutAnimation = keyframes({
  from: {
    opacity: "1",
    transform: "translate(0px, 0px)",
  },
  to: {
    transform: "translate(-20px, 0)",
    opacity: "0",
  },
});

export const fadeIn = style({
  animationDuration: "0.3s",
  animationName: fadeInAnimation,
  animationFillMode: "forwards",
});

export const fadeOut = style({
  animationDuration: "0.3s",
  animationName: fadeOutAnimation,
  animationFillMode: "forwards",
});

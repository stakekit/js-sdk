import { style } from "@vanilla-extract/css";
import { atoms } from "../../../../styles";

export const virtuosoContainer = style({
  height: "auto",
  width: "100%",
  scrollbarWidth: "none",
  "::-webkit-scrollbar": {
    display: "none",
  },
});

export const messageContainer = style([
  {
    alignSelf: "flex-start",
  },
  atoms({ marginTop: "2" }),
]);

export const claimRewardsContainer = style([
  atoms({
    background: "positionsClaimRewardsBackground",
    borderRadius: "base",
  }),
  {
    padding: "2px 6px",
  },
]);

import { style } from "@vanilla-extract/css";
import { atoms, vars } from "../../../styles";

export const itemContainer = style([
  atoms({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    px: "4",
    py: "3",
    my: "1",
    borderRadius: "xl",
    flex: 1,
    background: "tokenSelectBackground",
  }),
  {
    cursor: "pointer",
    ":hover": {
      background: vars.color.tokenSelectHoverBackground,
    },
  },
]);

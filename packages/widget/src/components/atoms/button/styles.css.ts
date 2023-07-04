import { recipe, RecipeVariants } from "@vanilla-extract/recipes";
import { atoms, vars } from "../../../styles";
import { style } from "@vanilla-extract/css";

export const pressAnimation = style({
  transition: "transform 0.1s ease-in-out",
  ":active": {
    transform: "scale(0.98)",
  },
});

export const buttonStyle = recipe({
  base: [
    {
      borderWidth: "1px",
      borderStyle: "solid",
    },
    atoms({
      letterSpacing: "tight",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: "2",
      borderRadius: "primaryButton",
      width: "full",
      border: "none",
      fontSize: "md",
      fontWeight: "primaryButton",
      minHeight: "buttonMinHeight",
    }),
  ],

  variants: {
    color: {
      primary: [
        atoms({
          background: "primaryButtonBackground",
          color: "primaryButtonColor",
          borderColor: "primaryButtonOutline",
          borderRadius: "primaryButton",
          fontWeight: "primaryButton",
        }),
        {
          ":hover": {
            background: vars.color.primaryButtonHoverBackground,
            color: vars.color.primaryButtonHoverColor,
            borderColor: vars.color.primaryButtonHoverOutline,
          },
          ":active": {
            background: vars.color.primaryButtonActiveBackground,
            color: vars.color.primaryButtonActiveColor,
            borderColor: vars.color.primaryButtonActiveOutline,
          },
        },
      ],
      secondary: [
        atoms({
          background: "secondaryButtonBackground",
          color: "secondaryButtonColor",
          borderColor: "secondaryButtonOutline",
          borderRadius: "secondaryButton",
          fontWeight: "secondaryButton",
        }),
        {
          ":hover": {
            background: vars.color.secondaryButtonHoverBackground,
            color: vars.color.secondaryButtonHoverColor,
            borderColor: vars.color.secondaryButtonHoverOutline,
          },
          ":active": {
            background: vars.color.secondaryButtonActiveBackground,
            color: vars.color.secondaryButtonActiveColor,
            borderColor: vars.color.secondaryButtonActiveOutline,
          },
        },
      ],
      disabled: [
        atoms({
          background: "disabledButtonBackground",
          color: "disabledButtonColor",
          borderColor: "disabledButtonOutline",
        }),
        {
          ":hover": {
            background: vars.color.disabledButtonHoverBackground,
            color: vars.color.disabledButtonHoverColor,
            borderColor: vars.color.disabledButtonHoverOutline,
          },
          ":active": {
            background: vars.color.disabledButtonActiveBackground,
            color: vars.color.disabledButtonActiveColor,
            borderColor: vars.color.disabledButtonActiveOutline,
          },
        },
      ],
    },
    animation: {
      none: {},
      press: [pressAnimation],
    },
  },

  defaultVariants: {
    color: "primary",
    animation: "press",
  },
});

export const spinnerStyles = style({
  position: "absolute",
});

export type ButtonVariants = RecipeVariants<typeof buttonStyle>;

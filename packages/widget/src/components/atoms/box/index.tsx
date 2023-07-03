import classNames from "classnames";

import {
  AllHTMLAttributes,
  createElement,
  ElementType,
  forwardRef,
  PropsWithChildren,
} from "react";
import { atoms, Atoms } from "../../../styles";

export type BoxProps = PropsWithChildren<
  Omit<
    AllHTMLAttributes<HTMLElement>,
    | "className"
    | "content"
    | "height"
    | "translate"
    | "color"
    | "width"
    | "cursor"
  > &
    Atoms & { as?: ElementType; className?: Parameters<typeof classNames>[0] }
>;

export const Box = forwardRef<unknown, BoxProps>(
  ({ children, as = "div", className, ...props }, ref) => {
    const atomsProps: Record<string, unknown> = {};
    const nativeProps: Record<string, unknown> = {};

    Object.entries(props).forEach(([key, value]) => {
      if (atoms.properties.has(key as keyof Atoms)) {
        atomsProps[key] = value;
      } else {
        nativeProps[key] = value;
      }
    });

    return createElement(as, {
      className: classNames([atoms(atomsProps), className]),
      children,
      ref,
      ...nativeProps,
    });
  }
);

Box.displayName = "Box";

import classNames from "classnames";
import { createElement, PropsWithChildren } from "react";
import { heading, HeadingVariants } from "./styles.css";

type Props = PropsWithChildren<{ variant?: HeadingVariants }> &
  JSX.IntrinsicElements["h1"];

export const Heading = ({ children, variant, className, ...rest }: Props) => {
  return createElement(variant?.level ?? "h1", {
    className: classNames(heading(variant), className),
    children,
    ...rest,
  });
};

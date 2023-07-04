import { PropsWithChildren } from "react";
import { buttonStyle, ButtonVariants } from "./styles.css";
import { Spinner } from "../spinner";

type Props = PropsWithChildren<{
  variant?: ButtonVariants;
  isLoading?: boolean;
}> &
  JSX.IntrinsicElements["button"];

export const Button = ({ children, variant, isLoading, ...rest }: Props) => (
  <button className={buttonStyle(variant)} {...rest}>
    {isLoading && <Spinner />}
    {children}
  </button>
);

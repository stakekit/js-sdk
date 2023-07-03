import { PropsWithChildren } from "react";
import { SpinnerVariants, spinnerStyles } from "./style.css";

export const Spinner = ({
  variant,
}: PropsWithChildren<{ variant?: SpinnerVariants }>) => (
  <span className={spinnerStyles(variant)} />
);

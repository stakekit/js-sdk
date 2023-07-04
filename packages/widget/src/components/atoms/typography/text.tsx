import classNames from "classnames";
import { PropsWithChildren } from "react";
import { textStyles, TextVariants } from "./styles.css";
import { Box } from "../box";
import { BoxProps } from "../box";

type Props = PropsWithChildren<{ variant?: TextVariants }> & BoxProps;

export const Text = ({ children, variant, className, ...rest }: Props) => {
  return (
    <Box
      as="p"
      className={classNames(className, textStyles(variant))}
      {...rest}
    >
      {children}
    </Box>
  );
};

import classNames from "classnames";
import { PropsWithChildren } from "react";
import { Box } from "../box";

export type HighlightProps = PropsWithChildren<{
  className?: Parameters<typeof classNames>[0];
}>;

export const Highlight = ({ children, className }: HighlightProps) => (
  <Box
    background="backgroundMuted"
    display="inline"
    px="1"
    borderRadius="lg"
    marginRight="1"
    my="1"
    as="span"
    className={className}
  >
    {children}
  </Box>
);

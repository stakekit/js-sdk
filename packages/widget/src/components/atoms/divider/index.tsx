import { Box, BoxProps } from "../box";

type Props = BoxProps;

export const Divider = (props: Props) => {
  return (
    <Box height="px" width="full" background="backgroundMuted" {...props} />
  );
};

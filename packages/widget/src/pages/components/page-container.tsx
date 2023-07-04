import { PropsWithChildren } from "react";
import { Box } from "../../components/atoms/box";

export const PageContainer = ({ children }: PropsWithChildren) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      height="full"
      px="4"
      marginBottom="6"
    >
      {children}
    </Box>
  );
};

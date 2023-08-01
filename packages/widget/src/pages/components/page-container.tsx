import { PropsWithChildren } from "react";
import { Box } from "../../components/atoms/box";

export const PageContainer = ({ children }: PropsWithChildren) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      px="4"
      marginBottom="6"
      flex={1}
      paddingTop="2"
    >
      {children}
    </Box>
  );
};

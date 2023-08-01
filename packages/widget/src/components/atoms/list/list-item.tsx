import { PropsWithChildren } from "react";
import { itemContainer } from "./styles.css";
import { Box } from "../box";

export const ListItem = ({
  children,
  onClick,
  testId,
}: PropsWithChildren<{ onClick?: () => void; testId?: string }>) => {
  return (
    <Box className={itemContainer} onClick={onClick} data-testid={testId}>
      {children}
    </Box>
  );
};

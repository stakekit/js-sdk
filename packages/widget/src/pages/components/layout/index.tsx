import { Outlet } from "react-router-dom";
import { Box } from "../../../components/atoms/box";
import { Header } from "../../../components/molecules/header";

export type OutletContext = [
  string,
  React.Dispatch<React.SetStateAction<string>>
];

export const Layout = () => {
  return (
    <>
      <Box px="4" marginBottom="4">
        <Header />
      </Box>

      <Outlet />
    </>
  );
};

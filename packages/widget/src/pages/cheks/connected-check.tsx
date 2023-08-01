import { Navigate, Outlet } from "react-router-dom";
import { useSKWallet } from "../../hooks/use-sk-wallet";

export const ConnectedCheck = () => {
  const { isConnected } = useSKWallet();

  return isConnected ? <Outlet /> : <Navigate to="/" replace />;
};

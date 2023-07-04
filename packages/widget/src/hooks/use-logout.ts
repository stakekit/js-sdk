import { useCallback } from "react";
import { useSKWallet } from "./use-sk-wallet";
import { useResetApp } from "./use-reset-app";

export const useLogout = () => {
  const { disconnect, isConnected } = useSKWallet();
  const resetApp = useResetApp();

  return useCallback(() => {
    if (!isConnected) return;

    disconnect();
    resetApp();
  }, [resetApp, disconnect, isConnected]);
};

import { APIManager } from "@stakekit/api-hooks";
import { useCallback } from "react";
import { useAppDispatch } from "../state";
import { queryClient } from "../services/query-client";

export const useResetApp = () => {
  const appDispatch = useAppDispatch();

  return useCallback(() => {
    appDispatch({ type: "state/reset" });
    APIManager.getQueryClient()?.resetQueries();
    queryClient.resetQueries();
  }, [appDispatch]);
};

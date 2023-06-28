import React, { PropsWithChildren, createContext } from "react";
import {
  QueryClient,
  QueryClientProvider,
  useQueryClient as useReactQueryClient,
} from "@tanstack/react-query";
import { APIManager } from "./api-client";

export const StakeKitContext = createContext<QueryClient | undefined>(
  undefined
);

export const useStakeKitQueryClient = () =>
  useReactQueryClient({ context: StakeKitContext });

export const StakeKitQueryProvider = ({ children }: PropsWithChildren) => {
  const queryClient = APIManager.getQueryClient();

  if (!queryClient) throw new Error("APIManager is not configured");

  return (
    <QueryClientProvider client={queryClient} context={StakeKitContext}>
      {children}
    </QueryClientProvider>
  );
};

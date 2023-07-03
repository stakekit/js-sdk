import { QueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { config } from "../config";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: config.queryClient.cacheTime,
      staleTime: config.queryClient.staleTime,
      retry: (failureCount, error) => {
        if (error instanceof AxiosError) {
          return !!(
            error.response?.status &&
            error.response.status >= 500 &&
            failureCount < 2
          );
        }

        return failureCount < 2;
      },
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: (failureCount, error) => {
        if (error instanceof AxiosError) {
          return !!(
            error.response?.status &&
            error.response.status >= 500 &&
            failureCount < 2
          );
        }

        return false;
      },
    },
  },
});

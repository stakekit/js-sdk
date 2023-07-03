import { QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, StrictMode, useState } from "react";
import { MemoryRouter } from "react-router-dom";
import { queryClient } from "../services/query-client";
import { AppStateProvider, DerivedAppStateProvider } from "../state/";
import { APIManager, StakeKitQueryProvider } from "@stakekit/api-hooks";
import { config } from "../config";
import { EVMProvider } from "./ethereum/provider";
import { CosmosProvider } from "./cosmos/provider";
import { ThemeWrapper } from "./theme-wrapper";
import { useSettings } from "./settings";

export const Providers = ({ children }: PropsWithChildren) => {
  const { apiKey } = useSettings();

  useState(() =>
    APIManager.configure({
      apiKey: apiKey,
      baseURL: config.apiUrl,
      queryClientConfig: {
        defaultOptions: {
          queries: {
            cacheTime: config.queryClient.cacheTime,
            staleTime: config.queryClient.staleTime,
          },
        },
      },
    })
  );

  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <StakeKitQueryProvider>
          <CosmosProvider>
            <EVMProvider>
              <MemoryRouter>
                <AppStateProvider>
                  <DerivedAppStateProvider>
                    <ThemeWrapper>{children}</ThemeWrapper>
                  </DerivedAppStateProvider>
                </AppStateProvider>
              </MemoryRouter>
            </EVMProvider>
          </CosmosProvider>
        </StakeKitQueryProvider>
      </QueryClientProvider>
    </StrictMode>
  );
};

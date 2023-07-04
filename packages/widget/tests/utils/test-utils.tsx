import {
  ComponentProps,
  PropsWithChildren,
  ReactElement,
  StrictMode,
} from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { render, RenderOptions } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { queryClient } from "../../src/services/query-client";
import { AppStateProvider, DerivedAppStateProvider } from "../../src/state";
import { RainbowKitProviderWithTheme } from "../../src/providers/rainbow-kit";
import { VirtuosoMockContext } from "react-virtuoso";
import { APIManager, StakeKitQueryProvider } from "@stakekit/api-hooks";
import { config } from "../../src/config";
import { WagmiConfig } from "wagmi";
import { getWagmiConfig } from "./wagmi-utils";

APIManager.configure({
  apiKey: config.apiKey,
  baseURL: config.apiUrl,
  queryClientConfig: {
    defaultOptions: {
      queries: {
        cacheTime: config.queryClient.cacheTime,
        staleTime: config.queryClient.staleTime,
      },
    },
  },
});

const Providers = ({
  children,
  wagmiConfig,
}: PropsWithChildren<{
  wagmiConfig: ReturnType<typeof getWagmiConfig>;
}>) => {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <StakeKitQueryProvider>
          <WagmiConfig config={wagmiConfig.config}>
            <RainbowKitProviderWithTheme chains={wagmiConfig.chains}>
              <BrowserRouter>
                <AppStateProvider>
                  <DerivedAppStateProvider>
                    <VirtuosoMockContext.Provider
                      value={{ viewportHeight: 800, itemHeight: 60 }}
                    >
                      {children}
                    </VirtuosoMockContext.Provider>
                  </DerivedAppStateProvider>
                </AppStateProvider>
              </BrowserRouter>
            </RainbowKitProviderWithTheme>
          </WagmiConfig>
        </StakeKitQueryProvider>
      </QueryClientProvider>
    </StrictMode>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, "wrapper"> & {
    wrapperProps?: ComponentProps<typeof Providers>;
  }
) => {
  const wagmiConfig = options?.wrapperProps?.wagmiConfig ?? getWagmiConfig();

  return render(ui, {
    wrapper: (props) => <Providers {...props} wagmiConfig={wagmiConfig} />,
    ...options,
  });
};

export * from "@testing-library/react";
export { customRender as render };

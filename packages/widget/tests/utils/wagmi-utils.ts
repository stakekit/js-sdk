import { configureChains, createConfig, mainnet } from "wagmi";
import { arbitrum, avalanche, optimism, polygon } from "wagmi/chains";
import { MockConnector } from "wagmi/connectors/mock";
import { publicProvider } from "wagmi/providers/public";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import { rkMockWallet } from "./mock-connector";
import {
  injectedWallet,
  omniWallet,
  rainbowWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import { config } from "../../src/config";

const defaultChains = [mainnet, polygon, optimism, arbitrum, avalanche];

export const getWagmiConfig = (options?: {
  getMockConnector?: (chains: typeof defaultChains) => MockConnector;
  chains?: typeof defaultChains;
}) => {
  const { chains, publicClient } = configureChains(
    options?.chains ?? defaultChains,
    [publicProvider()]
  );

  const connectors = connectorsForWallets([
    {
      groupName: "Popular",
      wallets: [
        injectedWallet({ chains }),
        walletConnectWallet({
          chains,
          projectId: config.walletConnectV2.projectId,
        }),
        omniWallet({ chains, projectId: config.walletConnectV2.projectId }),
        rainbowWallet({ chains, projectId: config.walletConnectV2.projectId }),
        // coinbaseWallet({ chains, appName: config.appName }),
        ...(options?.getMockConnector
          ? [rkMockWallet({ connector: options.getMockConnector(chains) })]
          : []),
      ],
    },
  ]);

  return {
    config: createConfig({
      autoConnect: true,
      connectors,
      publicClient,
    }),
    chains,
  };
};

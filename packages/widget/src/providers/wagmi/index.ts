import { configureChains, createConfig } from "wagmi";
import { publicProvider } from "wagmi/providers/public";
import {
  chains as ethChains,
  connector as ethConnector,
} from "../ethereum/config";
import {
  connector as cosmosConnector,
  cosmosChainsToWagmiChains,
} from "../cosmos/config";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";

export const { chains, publicClient, webSocketPublicClient } = configureChains(
  [...ethChains, ...cosmosChainsToWagmiChains],
  [publicProvider()]
);

export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: connectorsForWallets([ethConnector, cosmosConnector]),
  publicClient,
  webSocketPublicClient,
});

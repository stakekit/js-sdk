import {
  coinbaseWallet,
  injectedWallet,
  omniWallet,
  rainbowWallet,
  walletConnectWallet,
} from "@rainbow-me/rainbowkit/wallets";
import {
  arbitrum,
  avalanche,
  celo,
  harmonyOne,
  optimism,
  polygon,
} from "viem/chains";
import { mainnet } from "wagmi";
import { config } from "../../config";
import { Chain } from "@rainbow-me/rainbowkit";
import { ledgerFrameWallet } from "./ledger-connector";
import { getNetworkLogo } from "../../utils";
import { EvmNetworks } from "@stakekit/common";

export const chains: Chain[] = [
  mainnet,
  polygon,
  optimism,
  arbitrum,
  avalanche,
  {
    ...celo,
    iconUrl: getNetworkLogo(EvmNetworks.Celo),
  },
  {
    ...harmonyOne,
    iconUrl: getNetworkLogo(EvmNetworks.Harmony),
  },
];

export const connector = {
  groupName: "Ethereum",
  wallets: [
    injectedWallet({ chains }),
    ledgerFrameWallet({ chains: [mainnet], options: {} }),
    walletConnectWallet({
      chains,
      options: {
        projectId: config.walletConnectV2.projectId,
        isNewChainsStale: true,
      },
      projectId: config.walletConnectV2.projectId,
    }),
    omniWallet({ chains, projectId: config.walletConnectV2.projectId }),
    rainbowWallet({ chains, projectId: config.walletConnectV2.projectId }),
    coinbaseWallet({ chains, appName: config.appName }),
  ],
};

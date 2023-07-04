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

export const chains: Chain[] = [
  mainnet,
  polygon,
  optimism,
  arbitrum,
  avalanche,
  { ...celo, iconUrl: "https://cryptologos.cc/logos/celo-celo-logo.svg?v=025" },
  {
    ...harmonyOne,
    iconUrl: "https://cryptologos.cc/logos/harmony-one-logo.svg?v=025",
  },
];

export const connector = {
  groupName: "Ethereum",
  wallets: [
    injectedWallet({ chains }),
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

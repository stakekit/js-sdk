import { OS, Wallet } from "@cosmos-kit/core";
import { walletConnectWallet } from "@rainbow-me/rainbowkit/wallets";
import { config } from "../../../config";

export const walletConnectInfo: Wallet = {
  name: "wallet-connect",
  prettyName: "WalletConnect",
  // @ts-expect-error
  logo: walletConnectWallet({}).iconUrl,
  mode: "wallet-connect",
  mobileDisabled: false,
  rejectMessage: {
    source: "Request rejected",
  },
  downloads: [
    {
      device: "mobile",
      os: "android",
      link: "https://play.google.com/store/apps/details?id=com.chainapsis.keplr&hl=en&gl=US&pli=1",
    },
    {
      device: "mobile",
      os: "ios",
      link: "https://apps.apple.com/us/app/keplr-wallet/id1567851089",
    },
    {
      link: "https://www.keplr.app/download",
    },
  ],
  connectEventNamesOnWindow: ["wallet-connect_keystorechange"],
  walletconnect: {
    name: "Wallet Connect",
    projectId: config.walletConnectV2.projectId,
    encoding: "base64",
    mobile: {
      native: {
        ios: "keplrwallet:",
        android: "intent:",
      },
    },
    formatNativeUrl: (
      appUrl: string,
      wcUri: string,
      _os: OS | undefined,
      _name: string
    ): string => {
      const plainAppUrl = appUrl.replaceAll("/", "").replaceAll(":", "");
      const encodedWcUrl = encodeURIComponent(wcUri);
      return `${plainAppUrl}://wcV2?${encodedWcUrl}`;
    },
  },
};

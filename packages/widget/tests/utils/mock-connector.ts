import { Wallet } from "@rainbow-me/rainbowkit";
import { MockConnector } from "wagmi/connectors/mock";

export interface MyWalletOptions {
  connector: MockConnector;
}

export const rkMockWallet = ({ connector }: MyWalletOptions): Wallet => ({
  id: "mock-wallet",
  name: "Mock Wallet",
  iconUrl: "https://my-image.xyz",
  iconBackground: "#0c2f78",
  downloadUrls: {
    android: "https://fake-uri.com/android",
    ios: "https://fake-uri.com/ios",
    qrCode: "https://fake-uri.com/qr",
  },
  createConnector: () => {
    return {
      connector,
      mobile: {
        getUri: async () => "https://fake-uri.com",
      },
      qrCode: {
        getUri: async () => "https://fake-uri.com",
        instructions: {
          learnMoreUrl: "https://my-wallet/learn-more",
          steps: [
            {
              description: "Mock wallet for testing",
              step: "install",
              title: "Mock Wallet",
            },
          ],
        },
      },
    };
  },
});

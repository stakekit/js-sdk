import { PropsWithChildren } from "react";
import { WagmiConfig } from "wagmi";
import { RainbowKitProviderWithTheme } from "../rainbow-kit";
import { chains, wagmiConfig } from "../wagmi";

export const EVMProvider = ({ children }: PropsWithChildren) => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProviderWithTheme chains={chains}>
        {children}
      </RainbowKitProviderWithTheme>
    </WagmiConfig>
  );
};

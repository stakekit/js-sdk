import { PropsWithChildren } from "react";
import { ChainProvider } from "@cosmos-kit/react-lite";
import { chains, wallets } from "../cosmos/config";
import { config } from "../../config";

export const CosmosProvider = ({ children }: PropsWithChildren) => {
  return (
    <ChainProvider
      chains={chains}
      assetLists={[]}
      wallets={wallets}
      walletConnectOptions={{
        signClient: { projectId: config.walletConnectV2.projectId },
      }}
    >
      {children}
    </ChainProvider>
  );
};

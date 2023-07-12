import { useOpportunities } from "./use-opportunities";
import { useSKWallet } from "../use-sk-wallet";

export const useFilteredOpportunities = () => {
  const { network, isConnected } = useSKWallet();

  return useOpportunities({
    query: {
      select(data) {
        return data.filter((o) => {
          const defaultFilter =
            !o.args.enter.args?.nfts &&
            o.id !== "binance-bnb-native-staking" &&
            o.id !== "binance-testnet-bnb-native-staking";

          if (!isConnected) return defaultFilter;

          return network === o.token.network && defaultFilter;
        });
      },
    },
  });
};

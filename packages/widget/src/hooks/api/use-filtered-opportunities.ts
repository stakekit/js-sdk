import { useOpportunities } from "./use-opportunities";
import { useSKWallet } from "../use-sk-wallet";
import { YieldOpportunityDto } from "@stakekit/api-hooks";
import { createSelector } from "reselect";
import { SKWallet } from "../../domain/types";

type SelectorInputData = {
  data: YieldOpportunityDto[];
  isConnected: boolean;
  network: SKWallet["network"];
};

const computedData = createSelector(
  (val: SelectorInputData) => val.data,
  (val: SelectorInputData) => val.isConnected,
  (val: SelectorInputData) => val.network,
  (data, isConnected, network) =>
    data.filter((o) => {
      const defaultFilter =
        !o.args.enter.args?.nfts &&
        o.id !== "binance-bnb-native-staking" &&
        o.id !== "binance-testnet-bnb-native-staking";

      if (!isConnected) return defaultFilter;

      return network === o.token.network && defaultFilter;
    })
);

export const useFilteredOpportunities = () => {
  const { network, isConnected } = useSKWallet();

  return useOpportunities({
    query: { select: (data) => computedData({ data, isConnected, network }) },
  });
};

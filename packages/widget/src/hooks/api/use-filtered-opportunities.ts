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

export const useFilteredOpportunities = () => {
  const { network, isConnected } = useSKWallet();

  return useOpportunities({
    query: {
      select: (data) => defaultFiltered({ data, isConnected, network }),
    },
  });
};

export const useStakeEnterEnabledOpportunities = () => {
  const { network, isConnected } = useSKWallet();

  return useOpportunities({
    query: {
      select: (data) =>
        stakeEnterEnabledFiltered({ data, isConnected, network }),
    },
  });
};

const skFilter = ({
  o,
  isConnected,
  network,
}: {
  o: YieldOpportunityDto;
  isConnected: boolean;
  network: SKWallet["network"];
}) => {
  const defaultFilter =
    !o.args.enter.args?.nfts &&
    o.id !== "binance-bnb-native-staking" &&
    o.id !== "binance-testnet-bnb-native-staking";

  if (!isConnected) return defaultFilter;

  return network === o.token.network && defaultFilter;
};

const selectData = (val: SelectorInputData) => val.data;
const selectConnected = (val: SelectorInputData) => val.isConnected;
const selectNetwork = (val: SelectorInputData) => val.network;

const defaultFiltered = createSelector(
  selectData,
  selectConnected,
  selectNetwork,
  (data, isConnected, network) =>
    data.filter((o) => skFilter({ o, isConnected, network }))
);

const stakeEnterEnabledFiltered = createSelector(
  selectData,
  selectConnected,
  selectNetwork,
  (data, isConnected, network) =>
    data.filter((o) => skFilter({ o, isConnected, network }) && o.status.enter)
);

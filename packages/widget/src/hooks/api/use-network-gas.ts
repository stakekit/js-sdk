import { useTransactionGetGasForNetwork } from "@stakekit/api-hooks";
import { State } from "../../state/types";

export const useNetworkGas = (selectedStake: State["selectedStake"]) => {
  const selectedStakeNetwork = selectedStake.mapOrDefault(
    (s) => s.token.network,
    ""
  );

  return useTransactionGetGasForNetwork(selectedStakeNetwork, {
    query: { enabled: !!selectedStakeNetwork },
  });
};

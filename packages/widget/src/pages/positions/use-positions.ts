import {
  YieldBalanceWithIntegrationIdRequestDto,
  useStakeGetMultipleIntegrationBalances,
} from "@stakekit/api-hooks";
import { useFilteredOpportunities } from "../../hooks/api/use-filtered-opportunities";
import { useMemo } from "react";
import { Maybe } from "purify-ts";
import { useSKWallet } from "../../hooks/use-sk-wallet";

export const usePositions = () => {
  const { data } = useFilteredOpportunities();

  const dataMap = useMemo(
    () =>
      Maybe.fromNullable(data)
        .map(
          (integrations) => new Map(integrations.map((val) => [val.id, val]))
        )
        .extractNullable(),
    [data]
  );

  const { address, additionalAddresses } = useSKWallet();

  const yieldBalanceWithIntegrationIdRequestDto = useMemo(
    () =>
      Maybe.fromNullable(data)
        .chain((integrations) =>
          Maybe.fromNullable(address).map((addr) => ({ integrations, addr }))
        )
        .map(({ addr, integrations }) =>
          integrations.map(
            (int): YieldBalanceWithIntegrationIdRequestDto => ({
              addresses: {
                address: addr,
                additionalAddresses: additionalAddresses ?? undefined,
              },
              integrationId: int.id,
            })
          )
        )
        .orDefault([]),
    [data, address, additionalAddresses]
  );

  const stakeGetMultipleIntegrationBalances =
    useStakeGetMultipleIntegrationBalances(
      yieldBalanceWithIntegrationIdRequestDto,
      { query: { enabled: !!yieldBalanceWithIntegrationIdRequestDto.length } }
    );

  const tableData = useMemo(
    () =>
      stakeGetMultipleIntegrationBalances.data?.flatMap((val) =>
        val.balances
          .filter((b) => b.type === "staked")
          .map((b) => ({ ...val, ...b }))
      ),
    [stakeGetMultipleIntegrationBalances.data]
  );

  return {
    isLoading: stakeGetMultipleIntegrationBalances.isLoading,
    tableData,
    dataMap,
  };
};

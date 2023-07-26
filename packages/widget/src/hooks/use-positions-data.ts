import { Maybe } from "purify-ts";
import { useStakeExitEnabledOpportunities } from "./api/use-filtered-opportunities";
import { useSKWallet } from "./use-sk-wallet";
import {
  YieldBalanceWithIntegrationIdRequestDto,
  YieldBalancesWithIntegrationIdDto,
  YieldOpportunityDto,
  useStakeGetMultipleIntegrationBalances,
} from "@stakekit/api-hooks";
import { createSelector } from "reselect";
import { SKWallet } from "../domain/types";

export const usePositionsData = () => {
  const filteredOpportunities = useStakeExitEnabledOpportunities();

  const { address, additionalAddresses } = useSKWallet();

  const yieldBalanceWithIntegrationIdRequestDto = Maybe.fromNullable(
    filteredOpportunities.data
  )
    .chain((opportunities) =>
      Maybe.fromNullable(address).map((addr) => ({ opportunities, addr }))
    )
    .map(({ addr, opportunities }) =>
      yieldBalanceDtoSelector({ opportunities, additionalAddresses, addr })
    )
    .orDefault([]);

  const stakeGetMultipleIntegrationBalances =
    useStakeGetMultipleIntegrationBalances(
      yieldBalanceWithIntegrationIdRequestDto,
      { query: { enabled: !!yieldBalanceWithIntegrationIdRequestDto.length } }
    );

  const positionsData = Maybe.fromNullable(
    stakeGetMultipleIntegrationBalances.data
  )
    .chain((balancesData) =>
      Maybe.fromNullable(filteredOpportunities.data)
        .map(opportunitiesMapSelector)
        .map((val) => ({ balancesData, opportunitiesMap: val }))
    )
    .map(({ balancesData, opportunitiesMap }) =>
      positionsDataSelector({ balancesData, opportunitiesMap })
    )
    .orDefault(new Map());

  return {
    positionsData,
    isLoading:
      stakeGetMultipleIntegrationBalances.isInitialLoading ||
      filteredOpportunities.isInitialLoading,
  };
};

type YieldBalanceDtoSelectorData = {
  addr: string;
  additionalAddresses: SKWallet["additionalAddresses"];
  opportunities: YieldOpportunityDto[];
};

const yieldBalanceDtoSelector = createSelector(
  (data: YieldBalanceDtoSelectorData) => data.addr,
  (data: YieldBalanceDtoSelectorData) => data.opportunities,
  (data: YieldBalanceDtoSelectorData) => data.additionalAddresses,
  (addr, opportunities, additionalAddresses) =>
    opportunities.map(
      (int): YieldBalanceWithIntegrationIdRequestDto => ({
        addresses: {
          address: addr,
          additionalAddresses: additionalAddresses ?? undefined,
        },
        integrationId: int.id,
      })
    )
);

const opportunitiesMapSelector = createSelector(
  (opportunities: YieldOpportunityDto[]) => opportunities,
  (opportunities) => new Map(opportunities.map((val) => [val.id, val]))
);

type positionsDataSelectorData = {
  balancesData: YieldBalancesWithIntegrationIdDto[];
  opportunitiesMap: ReturnType<typeof opportunitiesMapSelector>;
};

const positionsDataSelector = createSelector(
  (data: positionsDataSelectorData) => data.balancesData,
  (data: positionsDataSelectorData) => data.opportunitiesMap,
  (balancesData, opportunitiesMap) =>
    balancesData.reduce(
      (acc, val) => {
        val.balances.forEach((b) => {
          acc.set(val.integrationId, {
            metaData: val,
            balanceData: b,
            integrationData: opportunitiesMap.get(val.integrationId)!,
          });
        });

        return acc;
      },
      new Map<
        YieldBalancesWithIntegrationIdDto["integrationId"],
        {
          metaData: (typeof balancesData)[number];
          balanceData: (typeof balancesData)[number]["balances"][number];
          integrationData: YieldOpportunityDto;
        }
      >()
    )
);

import { Maybe } from "purify-ts";
import { createContext, PropsWithChildren, useMemo, useContext } from "react";
import { useAppState } from "./app-state";
import { useAccountBalance } from "../hooks";
import { apyToPercentage } from "../utils";
import { yieldTypesMap } from "../domain/types";

export type DerivedAppState = {
  estimatedRewards: Maybe<{
    percentage: string;
    yearly: string;
    monthly: string;
  }>;
  yieldType: string;
  accountBalanceIsFetching: boolean;
  rewardToken: Maybe<{
    logoUri: string | null;
    symbol: string | null;
    providerName: string | null;
  }>;
};

const DerivedAppStateContext = createContext<DerivedAppState | undefined>(
  undefined
);

export const DerivedAppStateProvider = ({ children }: PropsWithChildren) => {
  const { selectedStake, selectedValidator, stakeAmount } = useAppState();

  const accountBalance = useAccountBalance({ selectedStake });

  const yieldType = selectedStake
    .chainNullable((s) => yieldTypesMap[s.config.type])
    .mapOrDefault((y) => y.title, "");

  const estimatedRewards = useMemo(() => {
    return selectedStake.map((y) => {
      const apy =
        selectedValidator.map((v) => v.apr).extractNullable() ?? y.apy;

      return {
        percentage: apyToPercentage(apy),
        yearly: stakeAmount.mapOrDefault(
          (am) => am.times(apy).decimalPlaces(5).toString(),
          ""
        ),
        monthly: stakeAmount.mapOrDefault(
          (am) => am.times(apy).dividedBy(12).decimalPlaces(5).toString(),
          ""
        ),
      };
    });
  }, [selectedStake, selectedValidator, stakeAmount]);

  const rewardToken = useMemo(
    () =>
      selectedStake
        .chain((ss) =>
          Maybe.fromNullable(ss.config.rewardTokens).chain((rt) =>
            Maybe.fromNullable(ss.metadata.provider).map((p) => ({ rt, p }))
          )
        )
        .map(({ p, rt }) => ({
          logoUri: p.logoURI ?? null,
          symbol: rt.map((t) => t.symbol).join(", ") ?? null,
          providerName: p.name ?? null,
        })),
    [selectedStake]
  );

  const value = useMemo(
    () => ({
      estimatedRewards,
      yieldType,
      accountBalanceIsFetching: accountBalance.isFetching,
      rewardToken,
    }),
    [accountBalance.isFetching, estimatedRewards, rewardToken, yieldType]
  );

  return (
    <DerivedAppStateContext.Provider value={value}>
      {children}
    </DerivedAppStateContext.Provider>
  );
};

export const useDerivedAppState = () => {
  const state = useContext(DerivedAppStateContext);
  if (state === undefined) {
    throw new Error("useState must be used within a StateProvider");
  }
  return state;
};

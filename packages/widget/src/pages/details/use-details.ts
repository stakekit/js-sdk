import BigNumber from "bignumber.js";
import { EitherAsync, Maybe } from "purify-ts";
import { useDeferredValue, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  ValidatorDto,
  YieldOpportunityDto,
  useStakeGetValidators,
} from "@stakekit/api-hooks";
import { NumberInputProps, SelectModalProps } from "../../components";
import { getTokenPriceInUSD } from "../../domain";
import { yieldTypesMap } from "../../domain/types";
import { useSelectedStakePrice } from "../../hooks";
import { useDerivedAppState } from "../../state";
import { useAppDispatch, useAppState } from "../../state/app-state";
import { formatTokenBalance } from "../../utils";
import { useStakeEnterEnabledOpportunities } from "../../hooks/api/use-filtered-opportunities";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { SelectedStakeData } from "./types";
import { Token } from "@stakekit/common";
import { useSKWallet } from "../../hooks/use-sk-wallet";
import { useMutation } from "@tanstack/react-query";
import { useStakeEnterAndTxsConstruct } from "../../hooks/api/use-stake-enter-and-txs-construct";
import { useNetworkGas } from "../../hooks/api/use-network-gas";

export const useDetails = () => {
  const {
    actions: { onMaxClick },
    selectedStake,
    selectedValidator,
    stakeAmount,
    availableAmount,
    maxStakeAmount,
    minStakeAmount,
    stakeRequestDto,
    gasModeValue,
  } = useAppState();
  const appDispatch = useAppDispatch();

  const gasParameters = useNetworkGas(selectedStake);

  const selectedStakeId = selectedStake.mapOrDefault((y) => y.id, "");

  const stakeValidators = useStakeGetValidators(selectedStakeId, {
    query: { enabled: !!selectedStakeId },
  });

  const { estimatedRewards, accountBalanceIsFetching, yieldType, rewardToken } =
    useDerivedAppState();

  const opportunities = useStakeEnterEnabledOpportunities();

  const pricesState = useSelectedStakePrice({ selectedStake });

  const symbol = selectedStake.mapOrDefault((y) => y.token.symbol, "");

  const formattedPrice = useMemo(() => {
    return Maybe.fromNullable(pricesState.data)
      .chain((prices) => selectedStake.map((ss) => ({ ss, prices })))
      .chain((val) => stakeAmount.map((sa) => ({ ...val, sa })))
      .map((val) =>
        getTokenPriceInUSD({
          amount: val.sa,
          token: val.ss.token as Token,
          prices: val.prices,
        })
      )
      .mapOrDefault((v) => `$${formatTokenBalance(v, 2)}`, "");
  }, [pricesState.data, selectedStake, stakeAmount]);

  const formattedAmount = useMemo(() => {
    return Maybe.fromNullable(availableAmount).mapOrDefault(
      (am) => formatTokenBalance(new BigNumber(am), 4),
      ""
    );
  }, [availableAmount]);

  const availableTokens = useMemo(
    () => `${formattedAmount} ${symbol}`.trim(),
    [formattedAmount, symbol]
  );

  const [stakeSearch, setStakeSearch] = useState("");
  const deferredStakeSearch = useDeferredValue(stakeSearch);

  const selectedStakeData = useMemo((): Maybe<SelectedStakeData> => {
    return Maybe.fromNullable(opportunities.data)
      .map((y) => {
        const initialData = Object.fromEntries(
          Object.entries(yieldTypesMap).map(([key, value]) => {
            const k = key as keyof typeof yieldTypesMap;
            return [k, { ...value, items: [] as YieldOpportunityDto[] }];
          })
        ) as SelectedStakeData;

        return { y, initialData };
      })
      .map(({ y, initialData }) =>
        y.reduce((acc, curr) => {
          const type = curr.config.type;

          const lowerSearch = deferredStakeSearch?.toLowerCase();

          if (
            !deferredStakeSearch ||
            curr.token.name.toLowerCase().includes(lowerSearch) ||
            curr.token.symbol.toLowerCase().includes(lowerSearch) ||
            curr.metadata.name.toLowerCase().includes(lowerSearch) ||
            curr.config.rewardTokens?.some(
              (rt) =>
                rt.name.toLowerCase().includes(lowerSearch) ||
                rt.symbol.toLowerCase().includes(lowerSearch)
            )
          ) {
            acc[type].items.push(curr);
          }

          return acc;
        }, initialData)
      );
  }, [opportunities.data, deferredStakeSearch]);

  const onSearch: SelectModalProps["onSearch"] = (val) => setStakeSearch(val);

  const onItemSelect = (item: YieldOpportunityDto) =>
    appDispatch({ type: "stake/select", data: item });

  const onValidatorSelect = (item: ValidatorDto) =>
    appDispatch({ type: "validator/select", data: item });

  const onStakeAmountChange: NumberInputProps["onChange"] = (val) =>
    appDispatch({ type: "stakeAmount/change", data: val });

  const isOverLimit = stakeAmount.mapOrDefault(
    (sa) =>
      sa.isGreaterThan(availableAmount) || sa.isGreaterThan(maxStakeAmount),
    false
  );

  const isBellowLimit = stakeAmount.mapOrDefault(
    (sa) => sa.isLessThan(minStakeAmount),
    false
  );

  const { t } = useTranslation();

  const { isConnected } = useSKWallet();

  const buttonText = isConnected
    ? t("shared.review")
    : t("init.connect_wallet");

  const onStakeEnter = useMutation(async () => {
    const result = await EitherAsync.liftEither(
      stakeRequestDto.toEither(new Error("Stake request not ready"))
    ).chain((val) =>
      EitherAsync(() =>
        stakeEnterAndTxsConstruct.mutateAsync({
          stakeRequestDto: val,
          gasModeValue: gasModeValue.extract(),
        })
      ).mapLeft(() => new Error("Stake enter and txs construct failed"))
    );

    return result.caseOf({
      Left: (e) => Promise.reject(e),
      Right: (v) => Promise.resolve(v),
    });
  });

  const isError =
    onStakeEnter.isError || opportunities.isError || onStakeEnter.isError;

  const { openConnectModal } = useConnectModal();

  const navigate = useNavigate();

  const stakeEnterAndTxsConstruct = useStakeEnterAndTxsConstruct();

  const onClick = () => {
    if (buttonDisabled) return;

    if (!isConnected) return openConnectModal?.();

    onStakeEnter.mutateAsync().then(() => navigate("/review"));
  };

  const selectedStakeYieldType = selectedStake
    .map((val) => val.config.type)
    .extractNullable();

  const footerItems = useMemo(() => {
    return selectedStake.mapOrDefault(
      (y) => {
        switch (y.config.type) {
          case yieldTypesMap.staking.type: {
            return {
              description: null,
            };
          }
          case yieldTypesMap.lending.type:
            return {
              description: t("details.lent_description", {
                stakeToken: y.token.symbol,
                lendToken:
                  y.config.rewardTokens?.map((t) => t.symbol).join(", ") ?? "",
              }),
            };
          case yieldTypesMap.vault.type:
            return {
              description: t("details.yearn_description", {
                stakeToken: y.token.symbol,
                depositToken:
                  y.config.rewardTokens?.map((t) => t.symbol).join(", ") ?? "",
              }),
            };
          case yieldTypesMap["liquid-staking"].type:
            return {
              description: t("details.liquid_stake_description", {
                stakeToken: y.token.symbol,
                liquidToken:
                  y.config.rewardTokens?.map((t) => t.symbol).join(", ") ?? "",
              }),
            };

          default:
            return { description: "" };
        }
      },
      { description: "" }
    );
  }, [selectedStake, t]);

  const onSelectOpportunityClose = () => setStakeSearch("");

  const isFetching =
    opportunities.isFetching ||
    accountBalanceIsFetching ||
    pricesState.isFetching ||
    onStakeEnter.isLoading ||
    stakeValidators.isInitialLoading;

  const buttonDisabled =
    isConnected &&
    (isFetching ||
      isOverLimit ||
      isBellowLimit ||
      stakeAmount.isNothing() ||
      stakeAmount.map((sa) => sa.isZero()).orDefault(true) ||
      gasParameters.isLoading ||
      onStakeEnter.isLoading ||
      stakeValidators.isInitialLoading);

  return {
    availableTokens,
    formattedPrice,
    symbol,
    selectedStakeData,
    selectedStake,
    onItemSelect,
    onStakeAmountChange,
    estimatedRewards,
    yieldType,
    onMaxClick,
    stakeAmount,
    isFetching,
    accountBalanceIsFetching,
    isOverLimit,
    isBellowLimit,
    buttonDisabled,
    onClick,
    footerItems,
    onSearch,
    validators: stakeValidators.data,
    onValidatorSelect,
    selectedValidator,
    isError,
    buttonText,
    rewardToken,
    onSelectOpportunityClose,
    onStakeEnterIsLoading: onStakeEnter.isLoading,
    selectedStakeYieldType,
  };
};

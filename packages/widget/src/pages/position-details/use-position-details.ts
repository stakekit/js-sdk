import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { EitherAsync, List, Maybe, Right } from "purify-ts";
import { useTranslation } from "react-i18next";
import { usePrices } from "../../hooks/api/use-prices";
import {
  PriceRequestDto,
  transactionGetGasForNetwork,
} from "@stakekit/api-hooks";
import { config } from "../../config";
import { tokenToTokenDto } from "../../utils/mappers";
import {
  getBaseToken,
  getMaxStakeAmount,
  getTokenPriceInUSD,
} from "../../domain";
import { Token } from "@stakekit/common";
import BigNumber from "bignumber.js";
import { formatTokenBalance } from "../../utils";
import { useAppState } from "../../state";
import { usePositionData } from "../../hooks/use-position-data";
import { useMutation } from "@tanstack/react-query";
import { useSKWallet } from "../../hooks/use-sk-wallet";
import { useStakeExitAndTxsConstruct } from "../../hooks/api/use-stake-exit-and-txs-construct";
import {
  useUnstakeOrClaimDispatch,
  useUnstakeOrClaimState,
} from "../../state/unstake";
import { usePendingActionAndTxsConstruct } from "../../hooks/api/use-pending-action-and-txs-construct";

export const usePositionDetails = () => {
  const { unstake } = useUnstakeOrClaimState();
  const dispatch = useUnstakeOrClaimDispatch();

  const integrationId = useParams<{ integrationId: string }>().integrationId!;

  const unstakeAmount = unstake.chain((u) => u.amount);

  const { gasEstimateTotal } = useAppState();

  const { position, isLoading } = usePositionData(integrationId);

  const { t } = useTranslation();

  const stakeType = position.map((p) => {
    switch (p.integrationData.config.type) {
      case "staking":
        return t("position_details.staked");

      case "liquid-staking":
        return t("position_details.liquid_staked");

      case "lending":
      case "vault":
      default:
        return t("position_details.deposited");
    }
  });

  const stakedBalance = useMemo(
    () =>
      position.chain((p) =>
        List.find((b) => b.type === "staked", p.metaData.balances)
      ),
    [position]
  );

  const rewardsBalance = useMemo(
    () =>
      position.chain((p) =>
        List.find((b) => b.type === "rewards", p.metaData.balances)
      ),
    [position]
  );

  const prices = usePrices(
    stakedBalance
      .map((sb): PriceRequestDto => {
        return {
          currency: config.currency,
          tokenList: [
            sb.token,
            tokenToTokenDto(getBaseToken(sb.token as Token)),
          ],
        };
      })
      .extractNullable()
  );

  const stakedPrice = useMemo(
    () =>
      stakedBalance
        .chain((sb) => Maybe.fromNullable(prices.data).map((p) => ({ p, sb })))
        .map(({ p, sb }) =>
          getTokenPriceInUSD({
            amount: sb.amount,
            prices: p,
            token: sb.token as Token,
          })
        ),
    [prices.data, stakedBalance]
  );

  const rewardsPrice = useMemo(
    () =>
      rewardsBalance
        .chain((rb) => Maybe.fromNullable(prices.data).map((p) => ({ p, rb })))
        .map(({ p, rb }) =>
          getTokenPriceInUSD({
            amount: rb.amount,
            prices: p,
            token: rb.token as Token,
          })
        ),
    [prices.data, rewardsBalance]
  );

  const claimAvailableRewards = useMemo(
    () =>
      rewardsBalance.chain((rb) =>
        List.find((pa) => pa.type === "CLAIM_REWARDS", rb.pendingActions)
      ),
    [rewardsBalance]
  );

  const unstakeText = position.map((p) => {
    switch (p.integrationData.config.type) {
      case "staking":
      case "liquid-staking":
        return t("position_details.unstake");

      case "lending":
      case "vault":
      default:
        return t("position_details.withdraw");
    }
  });

  const hasUnstakeAction = position.map((p) => !!p.integrationData.args.exit);

  const canChangeAmount = position.map(
    (p) => !!p.integrationData.args.exit?.args?.amount?.required
  );

  const minUnstakeAmount = useMemo(
    () =>
      position
        .chainNullable(
          (p) => p.integrationData.args.exit?.args?.amount?.minimum
        )
        .mapOrDefault((a) => new BigNumber(a), new BigNumber(0)),
    [position]
  );

  const maxUnstakeAmount = useMemo(
    () =>
      position
        .chainNullable(
          (p) => p.integrationData.args.exit?.args?.amount?.maximum
        )
        .mapOrDefault(
          (a) => new BigNumber(a),
          new BigNumber(Number.POSITIVE_INFINITY)
        ),
    [position]
  );

  // If changing unstake amount is not allowed, set `unstakeAmount` to staked amount
  // If `unstakeAmount` is less then min or greater than max, set in bounds
  useEffect(() => {
    stakedBalance
      .chain((sb) => unstakeAmount.map((ua) => ({ sb, ua })))
      .chain((val) => canChangeAmount.map((cca) => ({ ...val, cca })))
      .ifJust(({ sb, ua, cca }) => {
        const sbAmount = new BigNumber(sb.amount);
        if (!cca && !sbAmount.isEqualTo(ua)) {
          dispatch({
            type: "unstake/amount/change",
            data: { integrationId, amount: Maybe.of(sbAmount) },
          });
        } else if (cca) {
          if (ua.isGreaterThan(maxUnstakeAmount)) {
            dispatch({
              type: "unstake/amount/change",
              data: { integrationId, amount: Maybe.of(maxUnstakeAmount) },
            });
          } else if (ua.isLessThan(minUnstakeAmount)) {
            dispatch({
              type: "unstake/amount/change",
              data: { integrationId, amount: Maybe.of(minUnstakeAmount) },
            });
          }
        }
      });
  }, [
    canChangeAmount,
    dispatch,
    integrationId,
    maxUnstakeAmount,
    minUnstakeAmount,
    stakedBalance,
    unstakeAmount,
  ]);

  const onUnstakeAmountChange = (value: Maybe<BigNumber>) => {
    dispatch({
      type: "unstake/amount/change",
      data: { integrationId, amount: value },
    });
  };

  const unstakeFormattedAmount = Maybe.fromNullable(prices.data)
    .chain((prices) => stakedBalance.map((sb) => ({ sb, prices })))
    .chain((val) => unstakeAmount.map((sa) => ({ ...val, sa })))
    .map((val) =>
      getTokenPriceInUSD({
        amount: val.sa,
        token: val.sb.token as Token,
        prices: val.prices,
      })
    )
    .mapOrDefault((v) => `$${formatTokenBalance(v, 2)}`, "");

  const onMaxClick = () => {
    stakedBalance
      .chain((sb) => position.map((p) => ({ p, sb })))
      .ifJust(({ p, sb }) => {
        const gasEstimateTotalWithPercFix = gasEstimateTotal.multipliedBy(
          config.gasEstimatePercentFix / 100 + 1
        );

        dispatch({
          type: "unstake/amount/change",
          data: {
            integrationId,
            amount: Maybe.of(
              getMaxStakeAmount({
                gasEstimateTotal: gasEstimateTotalWithPercFix,
                availableAmount: new BigNumber(sb.amount),
                stakeIntegrationMaxLimit: Maybe.fromNullable(
                  p.integrationData.args.exit?.args?.amount?.maximum
                )
                  .map((a) => new BigNumber(a))
                  .orDefault(new BigNumber(Number.POSITIVE_INFINITY)),
              })
            ),
          },
        });
      });
  };

  const navigate = useNavigate();

  const { address, additionalAddresses } = useSKWallet();

  const stakeExitAndTxsConstruct = useStakeExitAndTxsConstruct();
  const pendingActionAndTxsConstruct = usePendingActionAndTxsConstruct();

  const onStakeExit = useMutation(async () => {
    const result = await EitherAsync.liftEither(
      Maybe.fromNullable(address).toEither(new Error("missing address"))
    )
      .chain((addr) =>
        EitherAsync.liftEither(
          unstake.toEither(Error("missing unstake")).map((u) => ({ addr, u }))
        )
      )
      .chain((val) =>
        EitherAsync.liftEither(
          val.u.amount
            .toEither(Error("missing amount"))
            .map((amount) => ({ ...val, amount }))
        )
      )
      .chain((val) =>
        EitherAsync.liftEither(
          position
            .toEither(Error("missing position"))
            .map((p) => ({ ...val, p }))
        )
      )
      .chain((val) =>
        EitherAsync(() =>
          transactionGetGasForNetwork(val.p.balanceData.token.network)
        )
          .chainLeft(async () => Right(null))
          .map((gas) => ({
            ...val,
            gas: gas
              ? List.find(
                  (v) => v.name === "average",
                  gas.modes.values
                ).extractNullable()
              : null,
          }))
      )
      .chain((val) => {
        return EitherAsync(() =>
          stakeExitAndTxsConstruct.mutateAsync({
            gasModeValue: val.gas ?? undefined,
            stakeRequestDto: {
              args: {
                amount: val.amount.toString(),
                validatorAddress: val.p.balanceData.validatorAddress,
              },
              integrationId: val.u.integrationId,
              addresses: {
                address: val.addr,
                additionalAddresses: additionalAddresses ?? undefined,
              },
            },
          })
        );
      });

    return result.caseOf({
      Left: (e) => Promise.reject(e),
      Right: (v) => Promise.resolve(v),
    });
  });

  const isValid = unstake
    .chain((u) => u.amount)
    .mapOrDefault(
      (a) =>
        a.isGreaterThanOrEqualTo(minUnstakeAmount) &&
        a.isLessThanOrEqualTo(maxUnstakeAmount) &&
        !a.isZero(),
      false
    );

  const onClaim = useMutation(async () => {
    const res = await EitherAsync.liftEither(
      stakedBalance
        .toEither(new Error("missing staked balance"))
        .chain((sb) =>
          claimAvailableRewards
            .toEither(new Error("missing claimAvailableRewards"))
            .map((car) => ({ sb, car }))
        )
        .chain((val) =>
          rewardsBalance
            .toEither(new Error("missing rewardsBalance"))
            .map((rb) => ({ ...val, rb }))
        )
    )
      .chain((val) =>
        EitherAsync(() => transactionGetGasForNetwork(val.sb.token.network))
          .chainLeft(async () => Right(null))
          .map((gas) => ({
            ...val,
            gas: gas
              ? List.find(
                  (v) => v.name === "average",
                  gas.modes.values
                ).extractNullable()
              : null,
          }))
      )
      .chain((val) =>
        EitherAsync(() =>
          pendingActionAndTxsConstruct.mutateAsync({
            gasModeValue: val.gas ?? undefined,
            pendingActionRequestDto: {
              args: {
                validatorAddress: val.sb.validatorAddress,
                amount: val.rb.amount,
              },
              integrationId,
              passthrough: val.car.passthrough,
              type: val.car.type,
            },
          })
        ).mapLeft(() => new Error("pendingActionAndTxsConstruct error"))
      );

    return res.caseOf({
      Left: (e) => Promise.reject(e),
      Right: (v) => Promise.resolve(v),
    });
  });

  const unstakeDisabled =
    !isValid || onStakeExit.isLoading || onClaim.isLoading;

  const onUnstakeClick = () => {
    onStakeExit
      .mutateAsync()
      .then(() =>
        navigate(`../../unstake/${integrationId}/review`, { relative: "path" })
      );
  };

  const onClaimClick = () => {
    onClaim
      .mutateAsync()
      .then(() =>
        navigate(`../../claim/${integrationId}/review`, { relative: "path" })
      );
  };

  const error = onStakeExit.isError || onClaim.isError;

  return {
    position,
    stakeType,
    stakedBalance,
    stakedPrice,
    rewardsBalance,
    rewardsPrice,
    claimAvailableRewards,
    unstakeText,
    hasUnstakeAction,
    unstakeAmount,
    onUnstakeAmountChange,
    unstakeFormattedAmount,
    onMaxClick,
    canChangeAmount,
    minUnstakeAmount,
    maxUnstakeAmount,
    onUnstakeClick,
    error,
    unstakeDisabled,
    isLoading: isLoading || prices.isLoading,
    onStakeExitIsLoading: onStakeExit.isLoading,
    onClaimClick,
    onClaimIsLoading: onClaim.isLoading,
  };
};

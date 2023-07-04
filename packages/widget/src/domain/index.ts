import BigNumber from "bignumber.js";
import { Prices, TokenString } from "./types";
import { CosmosNetworks, EvmNetworks, Token } from "@stakekit/common";
import {
  GasModeValueDto,
  StakeDto,
  TransactionDto,
  TransactionStatusResponseDto,
} from "@stakekit/api-hooks";
import { Override } from "../types";
import { Left, Right } from "purify-ts";

export const evmNetworksSet = new Set(Object.values(EvmNetworks));
export const cosmosNetworksSet = new Set(Object.values(CosmosNetworks));

export const isEvmNetwork = (network: string): network is EvmNetworks =>
  evmNetworksSet.has(network.toLowerCase() as EvmNetworks);

export const isCosmosNetwork = (network: string): network is CosmosNetworks =>
  cosmosNetworksSet.has(network.toLowerCase() as CosmosNetworks);

export const tokenString = (token: Token): TokenString => {
  return `${token.network}-${token.address?.toLowerCase()}`;
};

export const equalTokens = (a: Token, b: Token): boolean => {
  return tokenString(a) === tokenString(b);
};

export const getTokenPriceInUSD = ({
  token,
  amount,
  prices,
}: {
  token: Token;
  amount: string | BigNumber;
  prices: Prices;
}): BigNumber => {
  const amountBN = BigNumber(amount);
  const ts = tokenString(token);
  const price = prices.get(ts)?.price ?? 0;

  return amountBN.times(price);
};

export const getGasEstimateTotal = ({
  gasModeValue,
}: {
  gasModeValue: GasModeValueDto;
}) => {
  return new BigNumber(
    gasModeValue.value ? toEther({ val: gasModeValue.value, decimals: 9 }) : 0
  );
};

export const getMaxStakeAmount = ({
  availableAmount,
  gasEstimateTotal,
  stakeIntegrationMaxLimit,
}: {
  availableAmount: BigNumber;
  gasEstimateTotal: BigNumber;
  stakeIntegrationMaxLimit: BigNumber;
}) => {
  return BigNumber.max(
    BigNumber.min(
      stakeIntegrationMaxLimit,
      availableAmount.minus(gasEstimateTotal)
    ),
    new BigNumber(0)
  );
};

export const toWei = (amount: string, decimals: number) => {
  return new BigNumber(amount)
    .times(new BigNumber(1).shiftedBy(decimals))
    .toFixed(0);
};

export const toEther = ({ val, decimals }: { val: string; decimals: number }) =>
  new BigNumber(val).dividedBy(10 ** decimals);

export const etherToGwei = (amount: BigNumber) => {
  return amount.times(10 ** 9);
};

export const getBaseToken = (token: Token) => {
  const { address, ...restToken } = token;

  return restToken as Token;
};

/**
 * Get stake transactions available for signing or tx status check
 * If any of the transactions are in a failed state, return an error
 */
export const getValidStakeSessionTx = (stakeDto: StakeDto) => {
  const val: StakeDto = {
    ...stakeDto,
    transactions: stakeDto.transactions.filter(
      (
        tx
      ): tx is Override<
        TransactionDto,
        {
          status: Override<
            TransactionDto["status"],
            Exclude<TransactionDto["status"], "SKIPPED">
          >;
        }
      > => tx.status !== "SKIPPED"
    ),
  };

  return val.transactions.some((tx) => isTxError(tx))
    ? Left(new Error("Transaction failed"))
    : Right(val);
};

export const isTxError = (tx: TransactionDto | TransactionStatusResponseDto) =>
  tx.status === "FAILED" ||
  tx.status === "BLOCKED" ||
  tx.status === "NOT_FOUND";

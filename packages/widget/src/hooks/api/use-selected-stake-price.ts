import { useMemo } from "react";
import { config } from "../../config";
import { State } from "../../state/types";
import { usePrices } from "./use-prices";
import { PriceRequestDto } from "@stakekit/api-hooks";
import { getBaseToken } from "../../domain";
import { Token } from "@stakekit/common";

export const useSelectedStakePrice = ({
  selectedStake,
}: {
  selectedStake: State["selectedStake"];
}) => {
  const priceRequestDto = useMemo((): PriceRequestDto | null => {
    return selectedStake
      .map((y) => {
        return {
          currency: config.currency,
          tokenList: [y.token, getBaseToken(y.token as Token)],
        };
      })
      .extractNullable();
  }, [selectedStake]);

  return usePrices(priceRequestDto);
};

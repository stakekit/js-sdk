import { priceResponseDtoToPrices } from "../../utils/mappers";
import {
  PriceRequestDto,
  PriceResponseDto,
  useTokenGetTokenPrices,
} from "@stakekit/api-hooks";
import { createSelector } from "reselect";

const defaultParam: PriceRequestDto = {
  currency: "USD",
  tokenList: [
    { network: "ethereum", name: "Ethereum", symbol: "ETH", decimals: 18 },
  ],
};

const pricesSelector = createSelector(
  (val: PriceResponseDto) => val,
  (val) => priceResponseDtoToPrices(val)
);

export const usePrices = (
  priceRequestDto: PriceRequestDto | null | undefined
) => {
  const pricesState = useTokenGetTokenPrices(priceRequestDto ?? defaultParam, {
    query: {
      enabled: !!priceRequestDto,
      select: pricesSelector,
    },
  });

  return pricesState;
};

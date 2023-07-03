import { priceResponseDtoToPrices } from "../../utils/mappers";
import { PriceRequestDto, useTokenGetTokenPrices } from "@stakekit/api-hooks";

const defaultParam: PriceRequestDto = {
  currency: "USD",
  tokenList: [
    { network: "ethereum", name: "Ethereum", symbol: "ETH", decimals: 18 },
  ],
};

export const usePrices = (
  priceRequestDto: PriceRequestDto | null | undefined
) => {
  const pricesState = useTokenGetTokenPrices(priceRequestDto ?? defaultParam, {
    query: {
      enabled: !!priceRequestDto,
      select: (data) => priceResponseDtoToPrices(data),
    },
  });

  return pricesState;
};

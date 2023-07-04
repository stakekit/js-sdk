import { Networks, Token } from "@stakekit/common";
import { Price, Prices, TokenString } from "../domain/types";
import {
  PriceResponseDto,
  TokenDto,
  Networks as NetworksDto,
} from "@stakekit/api-hooks";

export const priceDtoToPrice = (priceDto: PriceResponseDto[string]): Price => ({
  price: priceDto.price,
  price24H: priceDto.price_24_h,
});

export const priceResponseDtoToPrices = (
  priceResponseDto: PriceResponseDto
): Prices => {
  return Object.keys(priceResponseDto).reduce<Prices>((acc, key) => {
    acc.set(key as TokenString, priceDtoToPrice(priceResponseDto[key]));

    return acc;
  }, new Map());
};

export const networksToNetworksDto = (networks: Networks): NetworksDto => {
  return networks as NetworksDto;
};

export const networksDtoToNetworks = (networks: NetworksDto): Networks => {
  return networks as Networks;
};

export const tokenDtoToToken = (tokenDto: TokenDto): Token => ({
  ...tokenDto,
  network: networksDtoToNetworks(tokenDto.network),
});

export const tokenToTokenDto = (token: Token): TokenDto => ({
  ...token,
  network: networksToNetworksDto(token.network),
});

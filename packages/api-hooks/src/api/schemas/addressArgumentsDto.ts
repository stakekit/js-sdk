import type { RequiredArgumentWithNetworkDto } from './requiredArgumentWithNetworkDto';
import type { BinanceAdditionalAddressesStakeArgumentOptionsDto } from './binanceAdditionalAddressesStakeArgumentOptionsDto';

export interface AddressArgumentsDto {
  address?: RequiredArgumentWithNetworkDto;
  additionalAddresses?: BinanceAdditionalAddressesStakeArgumentOptionsDto[];
}

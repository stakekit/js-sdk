import type { BinanceAdditionalAddressesStakeArgumentOptionsDto } from './binanceAdditionalAddressesStakeArgumentOptionsDto';
import type { RequiredArgumentWithNetworkDto } from './requiredArgumentWithNetworkDto';

export interface AddressArgumentsDto {
  additionalAddresses?: BinanceAdditionalAddressesStakeArgumentOptionsDto[];
  address?: RequiredArgumentWithNetworkDto;
}

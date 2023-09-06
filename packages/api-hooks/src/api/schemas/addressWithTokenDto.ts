import type { AddressWithTokenDtoAdditionalAddresses } from './addressWithTokenDtoAdditionalAddresses';
import type { Networks } from './networks';

export interface AddressWithTokenDto {
  address: string;
  additionalAddresses?: AddressWithTokenDtoAdditionalAddresses;
  network: Networks;
  tokenAddress?: string;
}

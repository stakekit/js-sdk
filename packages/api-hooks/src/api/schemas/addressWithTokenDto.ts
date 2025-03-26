import type { AddressWithTokenDtoAdditionalAddresses } from './addressWithTokenDtoAdditionalAddresses';
import type { Networks } from './networks';

export interface AddressWithTokenDto {
  additionalAddresses?: AddressWithTokenDtoAdditionalAddresses;
  address: string;
  network: Networks;
  tokenAddress?: string;
}

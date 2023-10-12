import type { AddressWithTokenDtoAdditionalAddresses } from './addressWithTokenDtoAdditionalAddresses';
import type { Networks } from './networks';

export interface AddressWithTokenDto {
  address: string;
  additionalAddresses?: AddressWithTokenDtoAdditionalAddresses;
  explorerUrl?: string;
  network: Networks;
  tokenAddress?: string;
}

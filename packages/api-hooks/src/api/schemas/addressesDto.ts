import type { AddressesDtoAdditionalAddresses } from './addressesDtoAdditionalAddresses';

export interface AddressesDto {
  additionalAddresses?: AddressesDtoAdditionalAddresses;
  address: string;
  explorerUrl?: string;
}

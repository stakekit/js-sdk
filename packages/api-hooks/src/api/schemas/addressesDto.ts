import type { AddressesDtoAdditionalAddresses } from './addressesDtoAdditionalAddresses';

export interface AddressesDto {
  address: string;
  additionalAddresses?: AddressesDtoAdditionalAddresses;
}

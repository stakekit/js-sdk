import type { AddressesDtoAdditionalAddresses } from './addressesDtoAdditionalAddresses';

export interface AddressesDto {
  additionalAddresses?: AddressesDtoAdditionalAddresses;
  address: string;
}

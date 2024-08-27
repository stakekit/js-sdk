import type { AddressesDto } from './addressesDto';
import type { ValidatorAddressesDto } from './validatorAddressesDto';

export interface YieldBalanceWithIntegrationIdRequestDto {
  addresses: AddressesDto;
  args?: ValidatorAddressesDto;
  currency: string;
  integrationId: string;
}

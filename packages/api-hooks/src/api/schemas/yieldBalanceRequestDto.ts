import type { AddressesDto } from './addressesDto';
import type { ValidatorAddressesDto } from './validatorAddressesDto';

export interface YieldBalanceRequestDto {
  addresses: AddressesDto;
  args?: ValidatorAddressesDto;
}

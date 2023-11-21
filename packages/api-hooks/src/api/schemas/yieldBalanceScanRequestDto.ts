import type { AddressesDto } from './addressesDto';
import type { CustomValidatorAddresses } from './customValidatorAddresses';
import type { Networks } from './networks';

export interface YieldBalanceScanRequestDto {
  addresses: AddressesDto;
  customValidators?: CustomValidatorAddresses[];
  network: Networks;
}

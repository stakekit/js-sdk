import type { AddressesDto } from './addressesDto';
import type { Networks } from './networks';
import type { CustomValidatorAddresses } from './customValidatorAddresses';

export interface YieldBalanceScanRequestDto {
  addresses: AddressesDto;
  network: Networks;
  customValidators?: CustomValidatorAddresses[];
}

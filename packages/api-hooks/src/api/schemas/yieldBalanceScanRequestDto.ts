import type { AddressesDto } from './addressesDto';
import type { CustomValidatorAddresses } from './customValidatorAddresses';
import type { Networks } from './networks';

export interface YieldBalanceScanRequestDto {
  addresses: AddressesDto;
  currency: string;
  customValidators?: CustomValidatorAddresses[];
  network: Networks;
}

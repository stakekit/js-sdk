import type { AddressesDto } from './addressesDto';
import type { CustomValidatorAddresses } from './customValidatorAddresses';
import type { EvmNetworks } from './evmNetworks';

export interface YieldBalanceScanEvmRequestDto {
  addresses: AddressesDto;
  customValidators?: CustomValidatorAddresses[];
  networks: EvmNetworks;
}

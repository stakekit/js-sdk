import type { AddressesDto } from './addressesDto';
import type { Networks } from './networks';

export interface TokenBalanceScanDto {
  addresses: AddressesDto;
  network: Networks;
}

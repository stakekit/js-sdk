import type { AddressesDto } from './addressesDto';
import type { Networks } from './networks';

export interface YieldBalanceScanDto {
  addresses: AddressesDto;
  network: Networks;
}

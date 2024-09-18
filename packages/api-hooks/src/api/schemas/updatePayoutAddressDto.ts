import type { Networks } from './networks';

export interface UpdatePayoutAddressDto {
  address: string;
  network: Networks;
}

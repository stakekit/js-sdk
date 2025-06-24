import type { Networks } from './networks';

export interface WalletViewDto {
  /** User wallet address */
  address: string;
  network: Networks;
}

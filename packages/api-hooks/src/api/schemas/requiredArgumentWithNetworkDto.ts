import type { Networks } from './networks';

export interface RequiredArgumentWithNetworkDto {
  network: Networks;
  required: boolean;
}

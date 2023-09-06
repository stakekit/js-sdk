import type { Networks } from './networks';

export interface CreateCustomUriDto {
  network: Networks;
  rpcUri: string;
}

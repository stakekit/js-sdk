import type { Networks } from './networks';

export interface UpdateCustomUriDto {
  network?: Networks;
  rpcUri?: string;
}

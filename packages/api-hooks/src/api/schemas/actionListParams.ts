import type { ActionListType } from './actionListType';
import type { ActionListSort } from './actionListSort';
import type { Networks } from './networks';

export type ActionListParams = {
  walletAddress: string;
  type?: ActionListType;
  sort?: ActionListSort;
  network?: Networks;
  limit?: number;
  page?: number;
};

import type { ActionListStatus } from './actionListStatus';
import type { ActionListType } from './actionListType';
import type { ActionListSort } from './actionListSort';
import type { Networks } from './networks';

export type ActionListParams = {
  walletAddress: string;
  status?: ActionListStatus;
  type?: ActionListType;
  sort?: ActionListSort;
  network?: Networks;
  limit?: number;
  page?: number;
};

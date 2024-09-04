import type { ActionListType } from './actionListType';
import type { ActionListSort } from './actionListSort';
import type { ActionListNetwork } from './actionListNetwork';

export type ActionListParams = {
  walletAddress?: string;
  type?: ActionListType;
  sort?: ActionListSort;
  network?: ActionListNetwork;
  limit?: number;
  page?: number;
};

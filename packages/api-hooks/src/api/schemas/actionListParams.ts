import type { ActionListNetwork } from './actionListNetwork';

export type ActionListParams = {
  walletAddress?: string;
  network?: ActionListNetwork;
  limit?: number;
  page?: number;
};

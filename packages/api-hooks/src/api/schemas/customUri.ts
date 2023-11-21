import type { Networks } from './networks';

export interface CustomUri {
  createdAt: string;
  id: string;
  network: Networks;
  projectId: string;
  rpcUri: string;
  updatedAt: string;
}

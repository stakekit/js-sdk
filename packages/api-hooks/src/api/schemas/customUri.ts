import type { Networks } from './networks';

export interface CustomUri {
  id: string;
  createdAt: string;
  updatedAt: string;
  network: Networks;
  rpcUri: string;
  projectId: string;
}

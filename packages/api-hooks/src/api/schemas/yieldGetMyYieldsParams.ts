import type { YieldGetMyYieldsType } from './yieldGetMyYieldsType';
import type { YieldGetMyYieldsSortBy } from './yieldGetMyYieldsSortBy';
import type { YieldGetMyYieldsNetwork } from './yieldGetMyYieldsNetwork';

export type YieldGetMyYieldsParams = {
  type?: YieldGetMyYieldsType;
  sortBy?: YieldGetMyYieldsSortBy;
  network?: YieldGetMyYieldsNetwork;
  page?: number;
  limit?: number;
};

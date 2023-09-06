import type { YieldYieldsType } from './yieldYieldsType';
import type { YieldYieldsSortBy } from './yieldYieldsSortBy';
import type { YieldYieldsNetwork } from './yieldYieldsNetwork';

export type YieldYieldsParams = {
  type?: YieldYieldsType;
  sortBy?: YieldYieldsSortBy;
  page?: number;
  network?: YieldYieldsNetwork;
  limit?: number;
};

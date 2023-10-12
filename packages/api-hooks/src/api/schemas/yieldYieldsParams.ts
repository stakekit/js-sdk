import type { YieldYieldsType } from './yieldYieldsType';
import type { YieldYieldsSortBy } from './yieldYieldsSortBy';
import type { YieldYieldsRevenueOption } from './yieldYieldsRevenueOption';
import type { YieldYieldsNetwork } from './yieldYieldsNetwork';

export type YieldYieldsParams = {
  ledgerWalletAPICompatible?: boolean;
  type?: YieldYieldsType;
  sortBy?: YieldYieldsSortBy;
  revenueOption?: YieldYieldsRevenueOption;
  page?: number;
  network?: YieldYieldsNetwork;
  limit?: number;
};

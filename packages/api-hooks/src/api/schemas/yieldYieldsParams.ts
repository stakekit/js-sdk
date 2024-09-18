import type { YieldYieldsType } from './yieldYieldsType';
import type { YieldYieldsSortBy } from './yieldYieldsSortBy';
import type { YieldYieldsRevenueOption } from './yieldYieldsRevenueOption';
import type { Networks } from './networks';

export type YieldYieldsParams = {
  preferredValidatorsOnly?: boolean;
  ledgerWalletAPICompatible?: boolean;
  type?: YieldYieldsType;
  sortBy?: YieldYieldsSortBy;
  revenueOption?: YieldYieldsRevenueOption;
  page?: number;
  network?: Networks;
  limit?: number;
};

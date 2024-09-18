import type { YieldGetMyYieldsType } from './yieldGetMyYieldsType';
import type { YieldGetMyYieldsSortBy } from './yieldGetMyYieldsSortBy';
import type { Networks } from './networks';

export type YieldGetMyYieldsParams = {
  preferredValidatorsOnly?: boolean;
  ledgerWalletAPICompatible?: boolean;
  type?: YieldGetMyYieldsType;
  sortBy?: YieldGetMyYieldsSortBy;
  network?: Networks;
  page?: number;
  limit?: number;
};

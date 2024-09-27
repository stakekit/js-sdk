import type { YieldV2YieldsType } from './yieldV2YieldsType';
import type { YieldV2YieldsSortBy } from './yieldV2YieldsSortBy';
import type { YieldV2YieldsRevenueOption } from './yieldV2YieldsRevenueOption';
import type { YieldV2YieldsNetwork } from './yieldV2YieldsNetwork';

export type YieldV2YieldsParams = {
  enterStatus?: boolean;
  preferredValidatorsOnly?: boolean;
  ledgerWalletAPICompatible?: boolean;
  type?: YieldV2YieldsType;
  sortBy?: YieldV2YieldsSortBy;
  revenueOption?: YieldV2YieldsRevenueOption;
  page?: number;
  network?: YieldV2YieldsNetwork;
  limit?: number;
};

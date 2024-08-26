import type { YieldV2GetMyYieldsType } from './yieldV2GetMyYieldsType';
import type { YieldV2GetMyYieldsSortBy } from './yieldV2GetMyYieldsSortBy';
import type { YieldV2GetMyYieldsNetwork } from './yieldV2GetMyYieldsNetwork';

export type YieldV2GetMyYieldsParams = {
  preferredValidatorsOnly?: boolean;
  ledgerWalletAPICompatible?: boolean;
  type?: YieldV2GetMyYieldsType;
  sortBy?: YieldV2GetMyYieldsSortBy;
  network?: YieldV2GetMyYieldsNetwork;
  page?: number;
  limit?: number;
};

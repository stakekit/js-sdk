import type { YieldV2YieldsProviderId } from './yieldV2YieldsProviderId';
import type { YieldV2YieldsType } from './yieldV2YieldsType';
import type { YieldV2YieldsSortBy } from './yieldV2YieldsSortBy';
import type { YieldV2YieldsRevenueOption } from './yieldV2YieldsRevenueOption';
import type { YieldV2YieldsNetwork } from './yieldV2YieldsNetwork';

export type YieldV2YieldsParams = {
  /**
   * Filter yields by provider ID
   */
  providerId?: YieldV2YieldsProviderId;
  /**
   * Filter yields by input token. Use "native" for native tokens (ETH, AVAX, BNB, etc.) or provide a contract address
   */
  inputToken?: string;
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

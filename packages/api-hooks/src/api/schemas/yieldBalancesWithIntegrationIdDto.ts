import type { YieldBalanceDto } from './yieldBalanceDto';

export interface YieldBalancesWithIntegrationIdDto {
  balances: YieldBalanceDto[];
  integrationId: string;
}

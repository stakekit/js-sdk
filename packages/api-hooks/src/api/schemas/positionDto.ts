import type { YieldBalanceDto } from './yieldBalanceDto';

export interface PositionDto {
  balances: YieldBalanceDto[];
  integrationId: string;
}

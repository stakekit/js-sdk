import type { DailyPerformanceDtoToken } from './dailyPerformanceDtoToken';

export interface DailyPerformanceDto {
  date: string;
  integrationId: string;
  token: DailyPerformanceDtoToken;
  totalEnteredAmountWei: string | null;
  totalExitedAmountWei: string | null;
  totalRevenueAmountWei: string;
  totalTvlAmountWei: string | null;
}

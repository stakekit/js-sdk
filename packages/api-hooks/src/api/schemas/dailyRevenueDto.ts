import type { DailyRevenueDtoToken } from './dailyRevenueDtoToken';

export interface DailyRevenueDto {
  date: string;
  integrationId: string;
  token: DailyRevenueDtoToken;
  totalRevenueAmountWei: string;
  validatorAddress: string | null;
}

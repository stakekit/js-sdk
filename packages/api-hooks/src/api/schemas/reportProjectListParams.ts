import type { ReportProjectListSort } from './reportProjectListSort';

export type ReportProjectListParams = {
  /**
   * Filter actions from this date (e.g. "2023-01-01")
   */
  from?: string;
  /**
   * Filter actions until this date (e.g. "2023-01-01")
   */
  to?: string;
  limit?: number;
  page?: number;
  walletAddress?: string;
  validatorAddress?: string;
  type?: string;
  sort?: ReportProjectListSort;
  integrationId?: string;
};

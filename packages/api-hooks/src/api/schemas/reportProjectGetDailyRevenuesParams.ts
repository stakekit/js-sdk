export type ReportProjectGetDailyRevenuesParams = {
  /**
   * Filter rewards from this date (e.g. "2023-01-01")
   */
  from: string;
  /**
   * Filter rewards until this date (e.g. "2023-01-01")
   */
  to: string;
  /**
   * Filter rewards from this integrationId
   */
  integrationId?: string;
  limit?: number;
  page?: number;
};

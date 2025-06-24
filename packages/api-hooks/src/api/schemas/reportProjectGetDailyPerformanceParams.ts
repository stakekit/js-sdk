export type ReportProjectGetDailyPerformanceParams = {
  /**
   * Filter data from this date (e.g. "2023-01-01")
   */
  from: string;
  /**
   * Filter data until this date (e.g. "2023-01-01"). Difference between "from" and "to" cannot exceed 10 days.
   */
  to: string;
  /**
   * Filter data from this integrationId
   */
  integrationId?: string;
  limit?: number;
  page?: number;
};

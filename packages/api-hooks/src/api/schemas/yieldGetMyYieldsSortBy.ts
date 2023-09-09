export type YieldGetMyYieldsSortBy =
  (typeof YieldGetMyYieldsSortBy)[keyof typeof YieldGetMyYieldsSortBy];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const YieldGetMyYieldsSortBy = {
  name: 'name',
  relevantYieldType: 'relevantYieldType',
  yieldType: 'yieldType',
} as const;

export type YieldGetMyYieldsSortBy =
  (typeof YieldGetMyYieldsSortBy)[keyof typeof YieldGetMyYieldsSortBy];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const YieldGetMyYieldsSortBy = {
  name: 'name',
  nameAsc: 'nameAsc',
  nameDesc: 'nameDesc',
  relevantYieldType: 'relevantYieldType',
  relevantYieldTypeAsc: 'relevantYieldTypeAsc',
  relevantYieldTypeDesc: 'relevantYieldTypeDesc',
  yieldType: 'yieldType',
  yieldTypeAsc: 'yieldTypeAsc',
  yieldTypeDesc: 'yieldTypeDesc',
} as const;

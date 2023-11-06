export type YieldYieldsSortBy =
  (typeof YieldYieldsSortBy)[keyof typeof YieldYieldsSortBy];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const YieldYieldsSortBy = {
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

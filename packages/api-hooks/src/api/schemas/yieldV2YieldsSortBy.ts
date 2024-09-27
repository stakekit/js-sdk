export type YieldV2YieldsSortBy =
  (typeof YieldV2YieldsSortBy)[keyof typeof YieldV2YieldsSortBy];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const YieldV2YieldsSortBy = {
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

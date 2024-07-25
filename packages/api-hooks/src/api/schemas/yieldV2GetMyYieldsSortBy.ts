export type YieldV2GetMyYieldsSortBy =
  (typeof YieldV2GetMyYieldsSortBy)[keyof typeof YieldV2GetMyYieldsSortBy];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const YieldV2GetMyYieldsSortBy = {
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

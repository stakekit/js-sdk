export type YieldYieldsRevenueOption =
  (typeof YieldYieldsRevenueOption)[keyof typeof YieldYieldsRevenueOption];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const YieldYieldsRevenueOption = {
  supportsFee: 'supportsFee',
  supportsRevShare: 'supportsRevShare',
} as const;

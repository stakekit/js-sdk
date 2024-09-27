export type YieldV2YieldsRevenueOption =
  (typeof YieldV2YieldsRevenueOption)[keyof typeof YieldV2YieldsRevenueOption];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const YieldV2YieldsRevenueOption = {
  supportsFee: 'supportsFee',
  supportsRevShare: 'supportsRevShare',
} as const;

export type YieldV2YieldsType =
  (typeof YieldV2YieldsType)[keyof typeof YieldV2YieldsType];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const YieldV2YieldsType = {
  staking: 'staking',
  'liquid-staking': 'liquid-staking',
  lending: 'lending',
  restaking: 'restaking',
  vault: 'vault',
} as const;

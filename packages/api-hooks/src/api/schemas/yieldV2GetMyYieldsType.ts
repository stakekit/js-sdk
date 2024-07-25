export type YieldV2GetMyYieldsType =
  (typeof YieldV2GetMyYieldsType)[keyof typeof YieldV2GetMyYieldsType];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const YieldV2GetMyYieldsType = {
  staking: 'staking',
  'liquid-staking': 'liquid-staking',
  lending: 'lending',
  restaking: 'restaking',
  vault: 'vault',
} as const;

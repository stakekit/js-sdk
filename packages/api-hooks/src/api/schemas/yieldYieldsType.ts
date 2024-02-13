export type YieldYieldsType =
  (typeof YieldYieldsType)[keyof typeof YieldYieldsType];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const YieldYieldsType = {
  staking: 'staking',
  'liquid-staking': 'liquid-staking',
  lending: 'lending',
  restaking: 'restaking',
  vault: 'vault',
} as const;

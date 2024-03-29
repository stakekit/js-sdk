export type YieldGetMyYieldsType =
  (typeof YieldGetMyYieldsType)[keyof typeof YieldGetMyYieldsType];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const YieldGetMyYieldsType = {
  staking: 'staking',
  'liquid-staking': 'liquid-staking',
  lending: 'lending',
  restaking: 'restaking',
  vault: 'vault',
} as const;

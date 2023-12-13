export type RewardTypes = (typeof RewardTypes)[keyof typeof RewardTypes];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const RewardTypes = {
  apr: 'apr',
  apy: 'apy',
  variable: 'variable',
} as const;

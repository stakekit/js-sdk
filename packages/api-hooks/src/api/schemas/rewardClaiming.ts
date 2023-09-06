export type RewardClaiming =
  (typeof RewardClaiming)[keyof typeof RewardClaiming];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const RewardClaiming = {
  auto: 'auto',
  manual: 'manual',
} as const;

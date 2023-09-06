export type RewardSchedule =
  (typeof RewardSchedule)[keyof typeof RewardSchedule];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const RewardSchedule = {
  block: 'block',
  hour: 'hour',
  day: 'day',
  week: 'week',
  month: 'month',
} as const;

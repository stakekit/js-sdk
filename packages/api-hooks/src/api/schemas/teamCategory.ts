export type TeamCategory = (typeof TeamCategory)[keyof typeof TeamCategory];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const TeamCategory = {
  pro: 'pro',
  standard: 'standard',
  trial: 'trial',
} as const;

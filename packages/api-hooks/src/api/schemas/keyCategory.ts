export type KeyCategory = (typeof KeyCategory)[keyof typeof KeyCategory];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const KeyCategory = {
  pro: 'pro',
  standard: 'standard',
  trial: 'trial',
} as const;

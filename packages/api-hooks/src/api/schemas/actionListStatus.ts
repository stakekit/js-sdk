export type ActionListStatus =
  (typeof ActionListStatus)[keyof typeof ActionListStatus];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ActionListStatus = {
  CANCELED: 'CANCELED',
  CREATED: 'CREATED',
  WAITING_FOR_NEXT: 'WAITING_FOR_NEXT',
  PROCESSING: 'PROCESSING',
  FAILED: 'FAILED',
  SUCCESS: 'SUCCESS',
  STALE: 'STALE',
} as const;

export type ActionStatus = (typeof ActionStatus)[keyof typeof ActionStatus];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ActionStatus = {
  CANCELED: 'CANCELED',
  CREATED: 'CREATED',
  WAITING_FOR_NEXT: 'WAITING_FOR_NEXT',
  PROCESSING: 'PROCESSING',
  FAILED: 'FAILED',
  SUCCESS: 'SUCCESS',
  STALE: 'STALE',
} as const;

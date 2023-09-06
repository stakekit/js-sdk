export type ActionStatus = (typeof ActionStatus)[keyof typeof ActionStatus];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ActionStatus = {
  CREATED: 'CREATED',
  WAITING_FOR_NEXT: 'WAITING_FOR_NEXT',
  PROCESSING: 'PROCESSING',
  CANCELED: 'CANCELED',
  FAILED: 'FAILED',
  SUCCESS: 'SUCCESS',
} as const;

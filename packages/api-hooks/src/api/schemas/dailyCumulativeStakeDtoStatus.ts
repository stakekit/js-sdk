/**
 * Related stakes status
 */
export type DailyCumulativeStakeDtoStatus =
  (typeof DailyCumulativeStakeDtoStatus)[keyof typeof DailyCumulativeStakeDtoStatus];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const DailyCumulativeStakeDtoStatus = {
  CANCELED: 'CANCELED',
  CREATED: 'CREATED',
  WAITING_FOR_NEXT: 'WAITING_FOR_NEXT',
  PROCESSING: 'PROCESSING',
  FAILED: 'FAILED',
  SUCCESS: 'SUCCESS',
  STALE: 'STALE',
} as const;

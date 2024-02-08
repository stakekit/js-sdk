/**
 * Related stakes status
 */
export type DailyCumulativeStakeDtoStatus =
  (typeof DailyCumulativeStakeDtoStatus)[keyof typeof DailyCumulativeStakeDtoStatus];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const DailyCumulativeStakeDtoStatus = {
  CREATED: 'CREATED',
  WAITING_FOR_NEXT: 'WAITING_FOR_NEXT',
  PROCESSING: 'PROCESSING',
  CANCELED: 'CANCELED',
  FAILED: 'FAILED',
  SUCCESS: 'SUCCESS',
} as const;

export type TransactionStatus =
  (typeof TransactionStatus)[keyof typeof TransactionStatus];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const TransactionStatus = {
  NOT_FOUND: 'NOT_FOUND',
  CREATED: 'CREATED',
  BLOCKED: 'BLOCKED',
  WAITING_FOR_SIGNATURE: 'WAITING_FOR_SIGNATURE',
  SIGNED: 'SIGNED',
  BROADCASTED: 'BROADCASTED',
  PENDING: 'PENDING',
  CONFIRMED: 'CONFIRMED',
  FAILED: 'FAILED',
  SKIPPED: 'SKIPPED',
} as const;

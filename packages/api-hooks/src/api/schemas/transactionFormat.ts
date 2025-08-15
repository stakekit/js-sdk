export type TransactionFormat =
  (typeof TransactionFormat)[keyof typeof TransactionFormat];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const TransactionFormat = {
  raw: 'raw',
  default: 'default',
} as const;

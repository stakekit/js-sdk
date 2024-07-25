export type FeeConfigurationStatus =
  (typeof FeeConfigurationStatus)[keyof typeof FeeConfigurationStatus];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const FeeConfigurationStatus = {
  REQUESTED: 'REQUESTED',
  PROCESSING: 'PROCESSING',
  LIVE: 'LIVE',
  CHANGES_REQUESTED: 'CHANGES_REQUESTED',
} as const;

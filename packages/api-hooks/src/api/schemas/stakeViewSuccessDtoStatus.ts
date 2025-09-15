/**
 * The status of the stake
 */
export type StakeViewSuccessDtoStatus =
  (typeof StakeViewSuccessDtoStatus)[keyof typeof StakeViewSuccessDtoStatus];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const StakeViewSuccessDtoStatus = {
  activated: 'activated',
  activating: 'activating',
  archived: 'archived',
  deactivated: 'deactivated',
  deactivating: 'deactivating',
} as const;

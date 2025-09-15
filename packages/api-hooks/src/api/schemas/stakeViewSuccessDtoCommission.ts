/**
 * The commission type
 */
export type StakeViewSuccessDtoCommission =
  (typeof StakeViewSuccessDtoCommission)[keyof typeof StakeViewSuccessDtoCommission];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const StakeViewSuccessDtoCommission = {
  Net: 'Net',
} as const;

export type BalanceTypes = (typeof BalanceTypes)[keyof typeof BalanceTypes];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const BalanceTypes = {
  available: 'available',
  staked: 'staked',
  unstaking: 'unstaking',
  unstaked: 'unstaked',
  preparing: 'preparing',
  rewards: 'rewards',
  locked: 'locked',
  unlocking: 'unlocking',
} as const;

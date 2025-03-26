export type ActionListType =
  (typeof ActionListType)[keyof typeof ActionListType];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ActionListType = {
  STAKE: 'STAKE',
  UNSTAKE: 'UNSTAKE',
  CLAIM_REWARDS: 'CLAIM_REWARDS',
  RESTAKE_REWARDS: 'RESTAKE_REWARDS',
  WITHDRAW: 'WITHDRAW',
  WITHDRAW_ALL: 'WITHDRAW_ALL',
  RESTAKE: 'RESTAKE',
  CLAIM_UNSTAKED: 'CLAIM_UNSTAKED',
  UNLOCK_LOCKED: 'UNLOCK_LOCKED',
  STAKE_LOCKED: 'STAKE_LOCKED',
  VOTE: 'VOTE',
  REVOKE: 'REVOKE',
  VOTE_LOCKED: 'VOTE_LOCKED',
  REVOTE: 'REVOTE',
  REBOND: 'REBOND',
  MIGRATE: 'MIGRATE',
} as const;

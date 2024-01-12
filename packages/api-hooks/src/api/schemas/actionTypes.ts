export type ActionTypes = (typeof ActionTypes)[keyof typeof ActionTypes];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ActionTypes = {
  STAKE: 'STAKE',
  UNSTAKE: 'UNSTAKE',
  CLAIM_REWARDS: 'CLAIM_REWARDS',
  RESTAKE_REWARDS: 'RESTAKE_REWARDS',
  WITHDRAW: 'WITHDRAW',
  RESTAKE: 'RESTAKE',
  CLAIM_UNSTAKED: 'CLAIM_UNSTAKED',
  UNLOCK_LOCKED: 'UNLOCK_LOCKED',
  UNLOCK_LOCKED_LEGACY: 'UNLOCK_LOCKED_LEGACY',
  STAKE_LOCKED: 'STAKE_LOCKED',
  VOTE: 'VOTE',
  REVOKE: 'REVOKE',
  VOTE_LOCKED: 'VOTE_LOCKED',
  REVOTE: 'REVOTE',
  REBOND: 'REBOND',
} as const;

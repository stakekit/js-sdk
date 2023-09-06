export type TransactionType =
  (typeof TransactionType)[keyof typeof TransactionType];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const TransactionType = {
  SWAP: 'SWAP',
  DEPOSIT: 'DEPOSIT',
  APPROVAL: 'APPROVAL',
  STAKE: 'STAKE',
  CLAIM_UNSTAKED: 'CLAIM_UNSTAKED',
  CLAIM_REWARDS: 'CLAIM_REWARDS',
  RESTAKE_REWARDS: 'RESTAKE_REWARDS',
  UNSTAKE: 'UNSTAKE',
  SPLIT: 'SPLIT',
  MERGE: 'MERGE',
  LOCK: 'LOCK',
  UNLOCK: 'UNLOCK',
  SUPPLY: 'SUPPLY',
  BRIDGE: 'BRIDGE',
  VOTE: 'VOTE',
  REVOKE: 'REVOKE',
  RESTAKE: 'RESTAKE',
  WITHDRAW: 'WITHDRAW',
  CREATE_ACCOUNT: 'CREATE_ACCOUNT',
  REVEAL: 'REVEAL',
  UTXO_P_TO_C_IMPORT: 'UTXO_P_TO_C_IMPORT',
  UTXO_C_TO_P_IMPORT: 'UTXO_C_TO_P_IMPORT',
} as const;

export type CommissionAppliesTo =
  (typeof CommissionAppliesTo)[keyof typeof CommissionAppliesTo];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const CommissionAppliesTo = {
  all_yield: 'all_yield',
  execution_layer_rewards: 'execution_layer_rewards',
  consensus_layer_rewards: 'consensus_layer_rewards',
  performance: 'performance',
  management: 'management',
} as const;

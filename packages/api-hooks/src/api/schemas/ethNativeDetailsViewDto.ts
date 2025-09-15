export interface EthNativeDetailsViewDto {
  /** The total rewards earned from validating blocks and participating in consensus, represented in wei. */
  consensus_rewards: string;
  /** The Ethereum address that initiated the deposit transaction to the staking contract. This indicates the source of the staked ETH. */
  deposit_tx_sender?: string;
  /** The Ethereum address that will receive execution layer rewards, including transaction fees and Maximal Extractable Value (MEV). */
  execution_fee_recipient?: string;
  /** The total execution layer rewards earned from transaction fees and MEV, represented in wei. */
  execution_rewards: string;
  /** The Ethereum address of the validator. */
  validator_address: string;
  /** The withdrawal credentials for accessing staked ETH and rewards. This can be a BLS public key or an Ethereum address. */
  withdrawal_credentials?: string;
}

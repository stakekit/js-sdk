export interface StakeKitStakeDetailsViewDto {
  /** Total current stake balance. */
  balance: number;
  /** Net annual percentage yield. */
  net_apy: number;
  /** Total stake rewards. */
  rewards: number;
  /** The symbol of the token held by the user. */
  symbol: string;
  /** The address of the validator the user delegated assets to. */
  validator?: string;
  /** Array of validator addresses (for multi-validator integrations like TRON). */
  validators?: string[];
  /** Stakekit Integration ID. */
  yield_id: string;
}

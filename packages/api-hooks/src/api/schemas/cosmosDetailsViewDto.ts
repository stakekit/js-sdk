export interface CosmosDetailsViewDto {
  available_rewards: number;
  balance: number;
  delegated_at?: string;
  delegator_address: string;
  net_apy: number;
  rewards: number;
  undelegated_at?: string;
  updated_at: string;
  validator_address: string;
}

export interface TezosDetailsViewDto {
  activated_at?: string;
  activated_cycle?: number;
  backer_address: string;
  balance: number;
  delegated_at?: string;
  delegated_block?: number;
  delegated_cycle: number;
  gross_apy: number;
  rewards: number;
  stake_address: string;
  updated_at: string;
}

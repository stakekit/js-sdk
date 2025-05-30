import type { FeeConfigurationStatus } from './feeConfigurationStatus';

export interface FeeConfigurationWithApyDto {
  allocatorVaultContractAddress: string | null;
  computedRewardRate: number;
  depositFeeBps: number | null;
  feeWrapperContractAddress: string | null;
  id: string;
  integrationId: string;
  managementFeeBps: number | null;
  performanceFeeBps: number | null;
  projectId: string;
  status: FeeConfigurationStatus;
}

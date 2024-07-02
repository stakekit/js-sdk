export interface FeeConfigurationDto {
  allocatorVaultContractAddress: string | null;
  depositFeeBps: number | null;
  feeWrapperContractAddress: string | null;
  id: string;
  integrationId: string;
  managementFeeBps: number | null;
  performanceFeeBps: number | null;
  projectId: string;
}

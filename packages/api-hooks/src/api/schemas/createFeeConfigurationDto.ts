export interface CreateFeeConfigurationDto {
  depositFeeBps?: number;
  integrationId: string;
  managementFeeBps?: number;
  performanceFeeBps?: number;
}

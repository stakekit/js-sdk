import type { KeyCategory } from './keyCategory';

export interface UpdateTeamDto {
  activated?: boolean;
  serviceConditionsAccepted?: boolean;
  category?: KeyCategory;
  name?: string;
  providerFeePercentage?: number;
}

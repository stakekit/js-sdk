import type { KeyCategory } from './keyCategory';

export interface UpdateTeamDto {
  activated?: boolean;
  category?: KeyCategory;
  name?: string;
  serviceConditionsAccepted?: boolean;
}

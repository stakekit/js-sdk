import type { TeamContactDetails } from './teamContactDetails';
import type { TeamCategory } from './teamCategory';

export interface Team {
  id: string;
  createdAt: string;
  updatedAt: string;
  activated: boolean;
  deletedAt: string | null;
  contactDetails: TeamContactDetails;
  category: TeamCategory;
  name: string;
  serviceConditionsAcceptedAt: string | null;
  providerFeePercentage: number | null;
}

import type { TeamCategory } from './teamCategory';
import type { TeamContactDetails } from './teamContactDetails';

export interface Team {
  activated: boolean;
  category: TeamCategory;
  contactDetails: TeamContactDetails;
  createdAt: string;
  deletedAt: string | null;
  id: string;
  name: string;
  serviceConditionsAcceptedAt: string | null;
  updatedAt: string;
}

import type { TeamCategory } from './teamCategory';
import type { TeamContactDetails } from './teamContactDetails';
import type { TeamType } from './teamType';

export interface Team {
  activated: boolean;
  category: TeamCategory;
  contactDetails: TeamContactDetails;
  createdAt: string;
  deletedAt: string | null;
  id: string;
  name: string;
  providerId: string | null;
  serviceConditionsAcceptedAt: string | null;
  type: TeamType;
  updatedAt: string;
}

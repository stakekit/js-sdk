import type { UserDto } from './userDto';
import type { TeamDtoContactDetails } from './teamDtoContactDetails';

export interface TeamDto {
  activated: boolean;
  adminUsers: UserDto[];
  category: string;
  contactDetails: TeamDtoContactDetails;
  createdAt: string;
  deletedAt: string | null;
  id: string;
  name: string;
  serviceConditionsAcceptedAt: string | null;
}

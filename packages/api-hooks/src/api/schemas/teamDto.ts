import type { UserDto } from './userDto';
import type { TeamDtoContactDetails } from './teamDtoContactDetails';

export interface TeamDto {
  id: string;
  activated: boolean;
  adminUser: UserDto;
  deletedAt: string | null;
  createdAt: string;
  contactDetails: TeamDtoContactDetails;
  name: string;
  serviceConditionsAcceptedAt: string | null;
}

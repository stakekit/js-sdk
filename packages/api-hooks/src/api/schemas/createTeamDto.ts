import type { CreateTeamDtoContactDetails } from './createTeamDtoContactDetails';
import type { CreateTeamDtoUser } from './createTeamDtoUser';

export interface CreateTeamDto {
  contactDetails: CreateTeamDtoContactDetails;
  name: string;
  user: CreateTeamDtoUser;
}

import type { Role } from './role';

export interface UserDto {
  email: string;
  emailVerified: boolean;
  id: string;
  lastAccessedAt: string | null;
  name: string | null;
  role: Role;
  serviceConditionsAcceptedAt: string | null;
  surname: string | null;
  teamId: string;
}

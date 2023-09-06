import type { UserDto } from './userDto';

export interface AuthEmailLoginResponseDto {
  token: string;
  user: UserDto;
}

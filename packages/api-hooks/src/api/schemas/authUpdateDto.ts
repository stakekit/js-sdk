export interface AuthUpdateDto {
  name: string;
  surname: string;
  password: string;
  oldPassword: string | null;
}

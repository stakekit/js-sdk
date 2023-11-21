export interface AuthUpdateDto {
  name: string;
  oldPassword: string | null;
  password: string;
  surname: string;
}

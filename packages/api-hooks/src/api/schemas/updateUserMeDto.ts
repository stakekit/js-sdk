export interface UpdateUserMeDto {
  serviceConditionsAccepted?: boolean;
  active?: boolean;
  password?: string;
  name?: string;
  surname?: string;
}

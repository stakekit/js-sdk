import type { ValidatorDto } from './validatorDto';

export interface ValidatorSearchResultDto {
  integrationId: string;
  validators: ValidatorDto[];
}

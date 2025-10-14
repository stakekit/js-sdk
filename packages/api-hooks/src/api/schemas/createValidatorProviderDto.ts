import type { CreateValidatorProviderDtoRevshare } from './createValidatorProviderDtoRevshare';

export interface CreateValidatorProviderDto {
  name: string;
  preferred?: boolean;
  rank: number;
  revshare?: CreateValidatorProviderDtoRevshare;
  website: string;
}

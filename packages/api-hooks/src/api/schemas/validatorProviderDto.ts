import type { ValidatorProviderDtoRevshare } from './validatorProviderDtoRevshare';

export interface ValidatorProviderDto {
  createdAt: string;
  id: string;
  name: string;
  preferred: boolean;
  rank: number;
  revshare?: ValidatorProviderDtoRevshare;
  uniqueId: string;
  updatedAt: string;
  website: string;
}

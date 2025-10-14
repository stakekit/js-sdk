import type { UpdateValidatorProviderDtoRevshare } from './updateValidatorProviderDtoRevshare';

export interface UpdateValidatorProviderDto {
  /** CSV file for validator data */
  csvFile?: Blob;
  name?: string;
  preferred?: boolean;
  rank?: number;
  revshare?: UpdateValidatorProviderDtoRevshare;
  website?: string;
}

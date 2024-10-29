import type { StakeKitErrorDtoDetails } from './stakeKitErrorDtoDetails';

export interface StakeKitErrorDto {
  code: number;
  details?: StakeKitErrorDtoDetails;
  message: string;
  path?: string;
  type?: string;
}

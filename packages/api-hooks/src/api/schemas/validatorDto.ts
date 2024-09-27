import type { ValidatorStatusTypes } from './validatorStatusTypes';

export interface ValidatorDto {
  address: string;
  apr?: number;
  commission?: number;
  endDate?: string;
  image?: string;
  name?: string;
  preferred?: boolean;
  providerId?: string;
  remainingPossibleStake?: string;
  stakedBalance?: string;
  status: ValidatorStatusTypes;
  votingPower?: number;
  website?: string;
}

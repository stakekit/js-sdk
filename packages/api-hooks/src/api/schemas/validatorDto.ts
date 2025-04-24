import type { ValidatorStatusTypes } from './validatorStatusTypes';

export interface ValidatorDto {
  address: string;
  apr?: number;
  commission?: number;
  endDate?: string;
  image?: string;
  minimumStake?: string;
  name?: string;
  nominatorCount?: number;
  preferred?: boolean;
  providerId?: string;
  remainingPossibleStake?: string;
  remainingSlots?: number;
  stakedBalance?: string;
  status: ValidatorStatusTypes;
  votingPower?: number;
  website?: string;
}

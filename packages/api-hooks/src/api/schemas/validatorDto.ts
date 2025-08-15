import type { ValidatorStatusTypes } from './validatorStatusTypes';

export interface ValidatorDto {
  address: string;
  apr?: number;
  commission?: number;
  endDate?: string;
  image?: string;
  marketCap?: string;
  minimumStake?: string;
  name?: string;
  nominatorCount?: number;
  preferred?: boolean;
  pricePerShare?: string;
  providerId?: string;
  remainingPossibleStake?: string;
  remainingSlots?: number;
  stakedBalance?: string;
  status: ValidatorStatusTypes;
  subnetId?: number;
  subnetName?: string;
  tokenSymbol?: string;
  votingPower?: number;
  website?: string;
}

import type { CreateValidatorDtoStatus } from './createValidatorDtoStatus';

export interface CreateValidatorDto {
  address: string;
  apr?: number;
  commission?: number;
  endDate?: string;
  image?: string;
  integrationId: string;
  lastFoundAt?: string;
  mevCommission?: number;
  minimumStake?: string;
  name?: string;
  nominatorCount?: number;
  providerId?: string;
  remainingPossibleStake?: string;
  remainingSlots?: number;
  stakedBalance?: string;
  status?: CreateValidatorDtoStatus;
  subnetId?: number;
  votingPower?: number;
  website?: string;
}

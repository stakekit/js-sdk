import type { ValidatorStatusTypes } from './validatorStatusTypes';

export interface ValidatorDto {
  address: string;
  apr: number;
  commission: number;
  image: string;
  name: string;
  preferred: boolean;
  stakedBalance: string;
  status: ValidatorStatusTypes;
  votingPower: number;
  website: string;
}

export interface ValidatorDto {
  address: string;
  name: string;
  image: string;
  website: string;
  apr: number;
  commission: number;
  stakedBalance: string;
  votingPower: number;
  preferred: boolean;
  minRevShare: number;
  maxRevShare: number;
}

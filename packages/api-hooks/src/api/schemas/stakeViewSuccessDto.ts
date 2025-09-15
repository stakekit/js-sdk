import type { StakeViewSuccessDtoCommission } from './stakeViewSuccessDtoCommission';
import type { StakeViewSuccessDtoDetails } from './stakeViewSuccessDtoDetails';
import type { InterestViewDto } from './interestViewDto';
import type { StakeViewSuccessDtoRewardsItem } from './stakeViewSuccessDtoRewardsItem';
import type { StakeViewSuccessDtoStatus } from './stakeViewSuccessDtoStatus';

export interface StakeViewSuccessDto {
  /** The commission type */
  commission: StakeViewSuccessDtoCommission;
  /** The currency of the staked asset in Ledger's crypto currency ID */
  currency: string;
  /** Details view */
  details: StakeViewSuccessDtoDetails;
  /** The interest rate */
  interest: InterestViewDto;
  /** The logo of the protocol (path to logo in .svg format) */
  logo?: string;
  /** The name of the protocol */
  protocol_name: string;
  /** Rewards information */
  rewards: StakeViewSuccessDtoRewardsItem[];
  /** The date when the stake was created */
  since?: string;
  /** The staked balance, denominated in the smallest unit of the currency (e.g., wei for ETH). */
  staked_balance: string;
  /** The status of the stake */
  status: StakeViewSuccessDtoStatus;
}

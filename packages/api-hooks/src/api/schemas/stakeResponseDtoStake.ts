import type { StakeViewSuccessDto } from './stakeViewSuccessDto';
import type { StakeFailureDto } from './stakeFailureDto';

/**
 * Stake information
 */
export type StakeResponseDtoStake = StakeViewSuccessDto | StakeFailureDto;

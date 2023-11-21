import type { TimePeriodDto } from './timePeriodDto';
import type { YieldFeeDto } from './yieldFeeDto';
import type { TokenDto } from './tokenDto';
import type { YieldProviderDto } from './yieldProviderDto';
import type { YieldRevshareDto } from './yieldRevshareDto';
import type { RewardClaiming } from './rewardClaiming';
import type { RewardSchedule } from './rewardSchedule';
import type { YieldType } from './yieldType';

export interface YieldMetadataDto {
  cooldownPeriod?: TimePeriodDto;
  defaultValidator?: string;
  description: string;
  documentation: string;
  fee: YieldFeeDto;
  gasFeeToken: TokenDto;
  logoURI: string;
  minimumStake?: number;
  name: string;
  provider?: YieldProviderDto;
  revshare: YieldRevshareDto;
  rewardClaiming: RewardClaiming;
  rewardSchedule: RewardSchedule;
  rewardTokens?: TokenDto[];
  supportsLedgerWalletApi?: boolean;
  supportsMultipleValidators?: boolean;
  token: TokenDto;
  type: YieldType;
  warmupPeriod: TimePeriodDto;
  withdrawPeriod?: TimePeriodDto;
}

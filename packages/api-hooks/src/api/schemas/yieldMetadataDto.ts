import type { TimePeriodDto } from './timePeriodDto';
import type { TransactionFormat } from './transactionFormat';
import type { YieldFeeDto } from './yieldFeeDto';
import type { TokenDto } from './tokenDto';
import type { YieldProviderDto } from './yieldProviderDto';
import type { YieldRevshareDto } from './yieldRevshareDto';
import type { RewardClaiming } from './rewardClaiming';
import type { RewardSchedule } from './rewardSchedule';
import type { YieldType } from './yieldType';

export interface YieldMetadataDto {
  cooldownPeriod?: TimePeriodDto;
  description: string;
  documentation: string;
  extraTransactionFormatsSupported?: TransactionFormat[];
  fee: YieldFeeDto;
  gasFeeToken: TokenDto;
  isIntegrationAggregator?: boolean;
  lockupPeriod?: TimePeriodDto;
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
  tokens?: TokenDto[];
  type: YieldType;
  warmupPeriod: TimePeriodDto;
  withdrawPeriod?: TimePeriodDto;
}

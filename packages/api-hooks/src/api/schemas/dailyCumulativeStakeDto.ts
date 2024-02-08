import type { DailyCumulativeStakeDtoStatus } from './dailyCumulativeStakeDtoStatus';
import type { TokenDto } from './tokenDto';
import type { DailyCumulativeStakeDtoType } from './dailyCumulativeStakeDtoType';

export interface DailyCumulativeStakeDto {
  amount: string;
  amountUsd: string;
  date: string;
  integrationId: string | null;
  /** Related stakes status */
  status: DailyCumulativeStakeDtoStatus;
  token: TokenDto;
  /** Related stakes type */
  type: DailyCumulativeStakeDtoType;
}

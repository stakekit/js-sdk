import type { DailyCumulativeStakeDtoStatus } from './dailyCumulativeStakeDtoStatus';
import type { DailyCumulativeStakeDtoType } from './dailyCumulativeStakeDtoType';

export interface DailyCumulativeStakeDto {
  amountUsd: string;
  date: string;
  /** Related stakes status */
  status: DailyCumulativeStakeDtoStatus;
  /** Related stakes type */
  type: DailyCumulativeStakeDtoType;
}

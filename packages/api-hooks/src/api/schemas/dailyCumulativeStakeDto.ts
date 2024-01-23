import type { TokenDto } from './tokenDto';
import type { DailyCumulativeStakeDtoType } from './dailyCumulativeStakeDtoType';

export interface DailyCumulativeStakeDto {
  amount: string;
  date: string;
  integrationId: string | null;
  token: TokenDto;
  /** Related actions type */
  type: DailyCumulativeStakeDtoType;
}

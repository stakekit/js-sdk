import type { ActionArgumentResponseDto } from './actionArgumentResponseDto';
import type { YieldMetadataDto } from './yieldMetadataDto';
import type { RewardTypes } from './rewardTypes';
import type { YieldStatusResponseDto } from './yieldStatusResponseDto';
import type { TokenDto } from './tokenDto';
import type { ValidatorDto } from './validatorDto';

export interface YieldDto {
  apy: number;
  args: ActionArgumentResponseDto;
  /** The yield opportunity ID */
  id: string;
  isAvailable: boolean;
  metadata: YieldMetadataDto;
  rewardRate: number;
  rewardType: RewardTypes;
  status: YieldStatusResponseDto;
  token: TokenDto;
  tokens: TokenDto[];
  validators: ValidatorDto[];
}

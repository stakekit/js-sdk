import type { TokenDto } from './tokenDto';
import type { ActionArgumentResponseDto } from './actionArgumentResponseDto';
import type { YieldStatusResponseDto } from './yieldStatusResponseDto';
import type { YieldMetadataDto } from './yieldMetadataDto';
import type { ValidatorDto } from './validatorDto';

export interface YieldDto {
  /** The yield opportunity ID */
  id: string;
  token: TokenDto;
  args: ActionArgumentResponseDto;
  status: YieldStatusResponseDto;
  apy: number;
  metadata: YieldMetadataDto;
  validators: ValidatorDto[];
}

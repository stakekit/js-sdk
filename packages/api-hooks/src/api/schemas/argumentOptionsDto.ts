import type { AmountArgumentOptionsDto } from './amountArgumentOptionsDto';
import type { DurationArgumentOptionsDto } from './durationArgumentOptionsDto';
import type { ApeNativeArgumentOptionsDto } from './apeNativeArgumentOptionsDto';
import type { TronResourceArgumentOptionsDto } from './tronResourceArgumentOptionsDto';
import type { RequiredArgumentDto } from './requiredArgumentDto';

export interface ArgumentOptionsDto {
  amount?: AmountArgumentOptionsDto;
  duration?: DurationArgumentOptionsDto;
  nfts?: ApeNativeArgumentOptionsDto[];
  tronResource?: TronResourceArgumentOptionsDto;
  validatorAddress?: RequiredArgumentDto;
  validatorAddresses?: RequiredArgumentDto;
}

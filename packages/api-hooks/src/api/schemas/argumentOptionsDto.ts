import type { AmountArgumentOptionsDto } from './amountArgumentOptionsDto';
import type { DurationArgumentOptionsDto } from './durationArgumentOptionsDto';
import type { ApeNativeArgumentOptionsDto } from './apeNativeArgumentOptionsDto';
import type { RequiredArgumentDto } from './requiredArgumentDto';

export interface ArgumentOptionsDto {
  amount?: AmountArgumentOptionsDto;
  duration?: DurationArgumentOptionsDto;
  nfts?: ApeNativeArgumentOptionsDto[];
  validatorAddress?: RequiredArgumentDto;
  validatorAddresses?: RequiredArgumentDto;
}

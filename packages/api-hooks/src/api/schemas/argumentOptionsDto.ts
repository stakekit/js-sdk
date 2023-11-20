import type { AmountArgumentOptionsDto } from './amountArgumentOptionsDto';
import type { DurationArgumentOptionsDto } from './durationArgumentOptionsDto';
import type { RequiredArgumentDto } from './requiredArgumentDto';
import type { ApeNativeArgumentOptionsDto } from './apeNativeArgumentOptionsDto';

export interface ArgumentOptionsDto {
  amount?: AmountArgumentOptionsDto;
  duration?: DurationArgumentOptionsDto;
  validatorAddress?: RequiredArgumentDto;
  validatorAddresses?: RequiredArgumentDto;
  nfts?: ApeNativeArgumentOptionsDto[];
}

import type { AmountArgumentOptionsDto } from './amountArgumentOptionsDto';
import type { DurationArgumentOptionsDto } from './durationArgumentOptionsDto';
import type { ApeNativeArgumentOptionsDto } from './apeNativeArgumentOptionsDto';
import type { RequiredArgumentDto } from './requiredArgumentDto';
import type { TronResourceArgumentOptionsDto } from './tronResourceArgumentOptionsDto';

export interface ArgumentOptionsDto {
  amount?: AmountArgumentOptionsDto;
  duration?: DurationArgumentOptionsDto;
  nfts?: ApeNativeArgumentOptionsDto[];
  signatureVerification?: RequiredArgumentDto;
  tronResource?: TronResourceArgumentOptionsDto;
  validatorAddress?: RequiredArgumentDto;
  validatorAddresses?: RequiredArgumentDto;
}

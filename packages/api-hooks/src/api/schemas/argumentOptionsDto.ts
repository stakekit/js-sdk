import type { AmountArgumentOptionsDto } from './amountArgumentOptionsDto';
import type { DurationArgumentOptionsDto } from './durationArgumentOptionsDto';
import type { RequiredArgumentWithOptionsDto } from './requiredArgumentWithOptionsDto';
import type { ApeNativeArgumentOptionsDto } from './apeNativeArgumentOptionsDto';
import type { RequiredArgumentDto } from './requiredArgumentDto';
import type { TronResourceArgumentOptionsDto } from './tronResourceArgumentOptionsDto';

export interface ArgumentOptionsDto {
  amount?: AmountArgumentOptionsDto;
  duration?: DurationArgumentOptionsDto;
  feeConfigurationId?: RequiredArgumentWithOptionsDto;
  nfts?: ApeNativeArgumentOptionsDto[];
  providerId?: RequiredArgumentWithOptionsDto;
  receiverAddress?: RequiredArgumentDto;
  signatureVerification?: RequiredArgumentDto;
  subnetId?: RequiredArgumentDto;
  tronResource?: TronResourceArgumentOptionsDto;
  validatorAddress?: RequiredArgumentDto;
  validatorAddresses?: RequiredArgumentDto;
}

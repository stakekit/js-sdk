import type { ApeNativeArgumentsDto } from './apeNativeArgumentsDto';

export interface PendingActionArgumentsDto {
  amount?: string;
  validatorAddress?: string;
  duration?: number;
  nfts?: ApeNativeArgumentsDto;
}

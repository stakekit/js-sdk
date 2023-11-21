import type { ApeNativeArgumentsDto } from './apeNativeArgumentsDto';

export interface PendingActionArgumentsDto {
  amount?: string;
  duration?: number;
  nfts?: ApeNativeArgumentsDto;
  validatorAddress?: string;
  validatorAddresses?: string[];
}

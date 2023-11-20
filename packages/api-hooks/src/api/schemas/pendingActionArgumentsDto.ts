import type { ApeNativeArgumentsDto } from './apeNativeArgumentsDto';

export interface PendingActionArgumentsDto {
  amount?: string;
  validatorAddress?: string;
  validatorAddresses?: string[];
  duration?: number;
  nfts?: ApeNativeArgumentsDto;
}

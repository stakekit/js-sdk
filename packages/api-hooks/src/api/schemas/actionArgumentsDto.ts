import type { ApeNativeArgumentsDto } from './apeNativeArgumentsDto';

export interface ActionArgumentsDto {
  amount: string;
  validatorAddress?: string;
  duration?: number;
  nfts?: ApeNativeArgumentsDto;
}

import type { ApeNativeArgumentsDto } from './apeNativeArgumentsDto';

export interface ActionArgumentsDto {
  amount: string;
  validatorAddress?: string;
  validatorAddresses?: string[];
  duration?: number;
  nfts?: ApeNativeArgumentsDto;
  ledgerWalletAPICompatible?: boolean;
}

import type { ApeNativeArgumentsDto } from './apeNativeArgumentsDto';

export interface ActionArgumentsDto {
  amount: string;
  duration?: number;
  ledgerWalletAPICompatible?: boolean;
  nfts?: ApeNativeArgumentsDto;
  validatorAddress?: string;
  validatorAddresses?: string[];
}

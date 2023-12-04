import type { ApeNativeArgumentsDto } from './apeNativeArgumentsDto';
import type { TronResourceType } from './tronResourceType';

export interface ActionArgumentsDto {
  amount: string;
  duration?: number;
  ledgerWalletAPICompatible?: boolean;
  nfts?: ApeNativeArgumentsDto;
  tronResource?: TronResourceType;
  validatorAddress?: string;
  validatorAddresses?: string[];
}

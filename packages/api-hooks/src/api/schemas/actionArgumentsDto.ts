import type { ApeNativeArgumentsDto } from './apeNativeArgumentsDto';
import type { SignatureVerificationArgumentsDto } from './signatureVerificationArgumentsDto';
import type { TronResourceType } from './tronResourceType';

export interface ActionArgumentsDto {
  amount: string;
  duration?: number;
  ledgerWalletAPICompatible?: boolean;
  nfts?: ApeNativeArgumentsDto;
  signatureVerification?: SignatureVerificationArgumentsDto;
  tronResource?: TronResourceType;
  validatorAddress?: string;
  validatorAddresses?: string[];
}

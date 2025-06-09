import type { TokenDto } from './tokenDto';
import type { ApeNativeArgumentsDto } from './apeNativeArgumentsDto';
import type { SignatureVerificationArgumentsDto } from './signatureVerificationArgumentsDto';
import type { TronResourceType } from './tronResourceType';

export interface ActionArgumentsDto {
  amount: string;
  duration?: number;
  feeConfigurationId?: string;
  inputToken?: TokenDto;
  ledgerWalletAPICompatible?: boolean;
  nfts?: ApeNativeArgumentsDto;
  providerId?: string;
  signatureVerification?: SignatureVerificationArgumentsDto;
  subnetId?: number;
  tronResource?: TronResourceType;
  validatorAddress?: string;
  validatorAddresses?: string[];
}

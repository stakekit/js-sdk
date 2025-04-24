import type { AddressesDto } from './addressesDto';
import type { TokenDto } from './tokenDto';

export interface YieldRewardDto {
  address: AddressesDto;
  amount: string;
  amountWei: string;
  blockNumber: number;
  timestamp: string;
  token: TokenDto;
  transactionId?: string | null;
  validatorAddresses?: string[];
}

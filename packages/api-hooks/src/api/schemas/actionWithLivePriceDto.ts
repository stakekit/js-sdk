import type { AddressesDto } from './addressesDto';
import type { TokenDto } from './tokenDto';
import type { ActionStatus } from './actionStatus';
import type { TransactionDto } from './transactionDto';
import type { ActionTypes } from './actionTypes';

export interface ActionWithLivePriceDto {
  accountAddresses?: string[];
  addresses: AddressesDto;
  amount: string | null;
  completedAt: string | null;
  createdAt: string;
  currentStepIndex: number;
  currentUSDAmount: string | null;
  id: string;
  inputToken?: TokenDto;
  integrationId: string;
  status: ActionStatus;
  tokenId: string | null;
  transactions: TransactionDto[];
  type: ActionTypes;
  USDAmount: string | null;
  validatorAddress: string | null;
  validatorAddresses: string[] | null;
}

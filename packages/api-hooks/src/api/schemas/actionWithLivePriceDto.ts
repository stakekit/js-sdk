import type { ActionStatus } from './actionStatus';
import type { TransactionDto } from './transactionDto';
import type { ActionTypes } from './actionTypes';

export interface ActionWithLivePriceDto {
  amount: string | null;
  createdAt: string;
  currentStepIndex: number;
  currentUSDAmount: string | null;
  id: string;
  integrationId: string;
  status: ActionStatus;
  tokenId: string | null;
  transactions: TransactionDto[];
  type: ActionTypes;
  USDAmount: string | null;
  validatorAddress: string | null;
  validatorAddresses: string[] | null;
}

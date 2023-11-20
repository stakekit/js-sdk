import type { ActionStatus } from './actionStatus';
import type { ActionTypes } from './actionTypes';
import type { TransactionDto } from './transactionDto';

export interface ActionDto {
  id: string;
  integrationId: string;
  status: ActionStatus;
  type: ActionTypes;
  currentStepIndex: number;
  amount: string | null;
  tokenId: string | null;
  validatorAddress: string | null;
  validatorAddresses: string[] | null;
  transactions: TransactionDto[];
  createdAt: string;
}

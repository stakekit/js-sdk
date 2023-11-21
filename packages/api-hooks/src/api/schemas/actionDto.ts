import type { ActionStatus } from './actionStatus';
import type { TransactionDto } from './transactionDto';
import type { ActionTypes } from './actionTypes';

export interface ActionDto {
  amount: string | null;
  createdAt: string;
  currentStepIndex: number;
  id: string;
  integrationId: string;
  status: ActionStatus;
  tokenId: string | null;
  transactions: TransactionDto[];
  type: ActionTypes;
  validatorAddress: string | null;
  validatorAddresses: string[] | null;
}

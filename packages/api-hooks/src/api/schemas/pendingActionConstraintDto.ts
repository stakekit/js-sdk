import type { PendingActionConstraintAmountDto } from './pendingActionConstraintAmountDto';
import type { ActionTypes } from './actionTypes';

export interface PendingActionConstraintDto {
  amount?: PendingActionConstraintAmountDto;
  type: ActionTypes;
}

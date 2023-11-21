import type { PendingActionArgumentsDto } from './pendingActionArgumentsDto';
import type { ActionTypes } from './actionTypes';

export interface PendingActionRequestDto {
  args?: PendingActionArgumentsDto;
  integrationId: string;
  /** The corresponding passthrough for the pending action to be run, returned in the balances endpoint */
  passthrough: string;
  type: ActionTypes;
}

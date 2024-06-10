import type { PendingActionArgumentsDto } from './pendingActionArgumentsDto';
import type { PendingActionGasEstimateRequestDtoGasArgs } from './pendingActionGasEstimateRequestDtoGasArgs';
import type { ActionTypes } from './actionTypes';

export interface PendingActionGasEstimateRequestDto {
  args?: PendingActionArgumentsDto;
  /** Custom gas properties to request gas estimate with. Can include properties like `gasPrice`, `maxGasPerFee`, etc for EVM chains. */
  gasArgs?: PendingActionGasEstimateRequestDtoGasArgs;
  integrationId: string;
  /** The corresponding passthrough for the pending action to be run, returned in the balances endpoint */
  passthrough: string;
  type: ActionTypes;
}

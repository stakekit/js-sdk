import type { ActionArgumentOptionsDto } from './actionArgumentOptionsDto';
import type { ActionTypes } from './actionTypes';

export interface PendingActionDto {
  /** Any user chosen options for the pending action. Possible options can be  */
  args?: ActionArgumentOptionsDto;
  /** A server generated passthrough that must passed back when pulling the transactions for a given pending action */
  passthrough: string;
  type: ActionTypes;
}

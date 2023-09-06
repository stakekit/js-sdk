import type { ActionTypes } from './actionTypes';
import type { ActionArgumentOptionsDto } from './actionArgumentOptionsDto';

export interface PendingActionDto {
  /** The pending action type */
  type: ActionTypes;
  /** A server generated passthrough that must passed back when pulling the transactions for a given pending action */
  passthrough: string;
  /** Any user chosen options for the pending action. Possible options can be  */
  args?: ActionArgumentOptionsDto;
}

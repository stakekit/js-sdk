import type { FailureViewDtoDetails } from './failureViewDtoDetails';

export interface FailureViewDto {
  /** The error code */
  code: number;
  /** The error details */
  details: FailureViewDtoDetails;
  /** The error reason */
  reason: string;
}

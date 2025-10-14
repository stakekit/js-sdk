import type { ProtocolInterestViewDto } from './protocolInterestViewDto';

export interface GrowSuccessDto {
  /** The deposit token */
  deposit_token: string;
  /** The interest information */
  interest: ProtocolInterestViewDto;
  /** The converted network name */
  network: string;
}

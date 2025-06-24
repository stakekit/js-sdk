import type { ProtocolInterestViewDto } from './protocolInterestViewDto';
import type { Networks } from './networks';

export interface GrowSuccessDto {
  /** The deposit token */
  deposit_token: string;
  /** The interest information */
  interest: ProtocolInterestViewDto;
  network: Networks;
}

import type { AddressesDto } from './addressesDto';
import type { ActionArgumentsDto } from './actionArgumentsDto';

export interface ActionRequestDto {
  addresses: AddressesDto;
  args: ActionArgumentsDto;
  integrationId: string;
  referralCode?: string;
  skipPrechecks?: boolean;
}

import type { AddressesDto } from './addressesDto';
import type { ActionArgumentsDto } from './actionArgumentsDto';

export interface ActionRequestDto {
  integrationId: string;
  addresses: AddressesDto;
  args: ActionArgumentsDto;
}

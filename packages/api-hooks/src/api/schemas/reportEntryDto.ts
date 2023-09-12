import type { AddressesDto } from './addressesDto';
import type { ActionDto } from './actionDto';

export interface ReportEntryDto {
  address: AddressesDto;
  action: ActionDto;
}

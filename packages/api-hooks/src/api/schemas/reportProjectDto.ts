import type { ActionDto } from './actionDto';
import type { AddressesDto } from './addressesDto';

export interface ReportProjectDto {
  action: ActionDto;
  address: AddressesDto;
}

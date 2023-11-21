import type { ActionDto } from './actionDto';
import type { AddressesDto } from './addressesDto';
import type { YieldMetadataDto } from './yieldMetadataDto';

export interface ReportEntryDto {
  action: ActionDto;
  address: AddressesDto;
  metadata: YieldMetadataDto;
}

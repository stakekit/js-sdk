import type { AddressesDto } from './addressesDto';
import type { ActionDto } from './actionDto';
import type { YieldMetadataDto } from './yieldMetadataDto';

export interface ReportEntryDto {
  address: AddressesDto;
  action: ActionDto;
  metadata: YieldMetadataDto;
}

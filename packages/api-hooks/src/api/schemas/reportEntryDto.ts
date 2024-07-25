import type { ActionWithLivePriceDto } from './actionWithLivePriceDto';
import type { AddressesDto } from './addressesDto';
import type { YieldMetadataDto } from './yieldMetadataDto';

export interface ReportEntryDto {
  action: ActionWithLivePriceDto;
  address: AddressesDto;
  metadata: YieldMetadataDto;
}

import type { MasterBannedRegionDtoTagsItem } from './masterBannedRegionDtoTagsItem';

export interface MasterBannedRegionDto {
  id: string;
  country: string;
  region: string | null;
  tags: MasterBannedRegionDtoTagsItem[];
}

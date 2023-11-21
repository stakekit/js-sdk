import type { MasterBannedRegionDtoTagsItem } from './masterBannedRegionDtoTagsItem';

export interface MasterBannedRegionDto {
  country: string;
  id: string;
  region: string | null;
  tags: MasterBannedRegionDtoTagsItem[];
}

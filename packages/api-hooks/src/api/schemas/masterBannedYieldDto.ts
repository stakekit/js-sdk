import type { MasterBannedYieldDtoTagsItem } from './masterBannedYieldDtoTagsItem';

export interface MasterBannedYieldDto {
  country: string;
  region: string | null;
  tags: MasterBannedYieldDtoTagsItem[];
  yieldId: string;
}

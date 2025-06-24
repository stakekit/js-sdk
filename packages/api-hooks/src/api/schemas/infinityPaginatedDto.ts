import type { InfinityPaginatedDtoDataItem } from './infinityPaginatedDtoDataItem';

export interface InfinityPaginatedDto {
  /** Array of data items */
  data: InfinityPaginatedDtoDataItem[];
  hasNextPage: boolean;
  limit: number;
  page: number;
}

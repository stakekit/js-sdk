import type { InfinityPaginatedDtoData } from './infinityPaginatedDtoData';

export interface InfinityPaginatedDto {
  data: InfinityPaginatedDtoData;
  hasNextPage: boolean;
  limit: number;
  page: number;
}

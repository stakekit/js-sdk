import type { InfinityPaginatedDto } from './infinityPaginatedDto';
import type { YieldGetMyYields200AllOf } from './yieldGetMyYields200AllOf';

export type YieldGetMyYields200 = InfinityPaginatedDto &
  YieldGetMyYields200AllOf;

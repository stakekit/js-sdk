import type { InfinityPaginatedDto } from './infinityPaginatedDto';
import type { ReportProjectList200AllOf } from './reportProjectList200AllOf';

export type ReportProjectList200 = InfinityPaginatedDto &
  ReportProjectList200AllOf;

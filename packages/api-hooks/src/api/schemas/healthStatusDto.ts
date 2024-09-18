import type { HealthStatus } from './healthStatus';

export interface HealthStatusDto {
  db: HealthStatus;
  status: HealthStatus;
}

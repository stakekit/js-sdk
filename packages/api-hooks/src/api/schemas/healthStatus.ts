export type HealthStatus = (typeof HealthStatus)[keyof typeof HealthStatus];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const HealthStatus = {
  OK: 'OK',
  FAIL: 'FAIL',
  DEGRADED: 'DEGRADED',
} as const;

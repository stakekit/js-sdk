export type GasMode = (typeof GasMode)[keyof typeof GasMode];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const GasMode = {
  slow: 'slow',
  average: 'average',
  fast: 'fast',
  custom: 'custom',
} as const;

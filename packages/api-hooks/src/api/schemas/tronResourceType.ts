export type TronResourceType =
  (typeof TronResourceType)[keyof typeof TronResourceType];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const TronResourceType = {
  BANDWIDTH: 'BANDWIDTH',
  ENERGY: 'ENERGY',
} as const;

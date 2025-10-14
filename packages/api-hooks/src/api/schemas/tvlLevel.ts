export type TvlLevel = (typeof TvlLevel)[keyof typeof TvlLevel];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const TvlLevel = {
  network: 'network',
  protocol: 'protocol',
} as const;

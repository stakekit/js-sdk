export type TeamType = (typeof TeamType)[keyof typeof TeamType];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const TeamType = {
  provider: 'provider',
  integrator: 'integrator',
} as const;

export type Role = (typeof Role)[keyof typeof Role];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const Role = {
  admin: 'admin',
  member: 'member',
  superAdmin: 'superAdmin',
} as const;

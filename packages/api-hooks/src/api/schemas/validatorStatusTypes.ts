export type ValidatorStatusTypes =
  (typeof ValidatorStatusTypes)[keyof typeof ValidatorStatusTypes];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const ValidatorStatusTypes = {
  active: 'active',
  jailed: 'jailed',
  deactivating: 'deactivating',
  inactive: 'inactive',
  full: 'full',
  not_found: 'not_found',
} as const;

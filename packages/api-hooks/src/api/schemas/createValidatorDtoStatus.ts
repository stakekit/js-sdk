export type CreateValidatorDtoStatus =
  (typeof CreateValidatorDtoStatus)[keyof typeof CreateValidatorDtoStatus];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const CreateValidatorDtoStatus = {
  active: 'active',
  jailed: 'jailed',
  deactivating: 'deactivating',
  inactive: 'inactive',
  full: 'full',
  not_found: 'not_found',
} as const;

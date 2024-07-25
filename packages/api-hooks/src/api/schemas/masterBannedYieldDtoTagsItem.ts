export type MasterBannedYieldDtoTagsItem =
  (typeof MasterBannedYieldDtoTagsItem)[keyof typeof MasterBannedYieldDtoTagsItem];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const MasterBannedYieldDtoTagsItem = {
  Crypto_Ban: 'Crypto Ban',
  OFAC: 'OFAC',
  OFSI: 'OFSI',
  Pending_Litigation: 'Pending Litigation',
  Staking_Ban: 'Staking Ban',
} as const;

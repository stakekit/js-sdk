export type MasterBannedRegionDtoTagsItem =
  (typeof MasterBannedRegionDtoTagsItem)[keyof typeof MasterBannedRegionDtoTagsItem];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const MasterBannedRegionDtoTagsItem = {
  Crypto_Ban: 'Crypto Ban',
  OFAC: 'OFAC',
  OFSI: 'OFSI',
  Pending_Litigation: 'Pending Litigation',
  Staking_Ban: 'Staking Ban',
} as const;

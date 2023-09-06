export type GeolocationErrorTagsItem =
  (typeof GeolocationErrorTagsItem)[keyof typeof GeolocationErrorTagsItem];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const GeolocationErrorTagsItem = {
  Crypto_Ban: 'Crypto Ban',
  OFAC: 'OFAC',
  OFSI: 'OFSI',
  Pending_Litigation: 'Pending Litigation',
  Staking_Ban: 'Staking Ban',
} as const;

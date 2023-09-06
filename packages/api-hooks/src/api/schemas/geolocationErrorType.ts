export type GeolocationErrorType =
  (typeof GeolocationErrorType)[keyof typeof GeolocationErrorType];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const GeolocationErrorType = {
  GEO_LOCATION: 'GEO_LOCATION',
} as const;

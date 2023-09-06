import type { GeolocationErrorRegionCode } from './geolocationErrorRegionCode';
import type { GeolocationErrorTagsItem } from './geolocationErrorTagsItem';
import type { GeolocationErrorType } from './geolocationErrorType';

export interface GeolocationError {
  countryCode: string;
  regionCode?: GeolocationErrorRegionCode;
  tags?: GeolocationErrorTagsItem[];
  code: number;
  message: string;
  type: GeolocationErrorType;
}

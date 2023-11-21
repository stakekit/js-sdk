import type { GeolocationErrorRegionCode } from './geolocationErrorRegionCode';
import type { GeolocationErrorTagsItem } from './geolocationErrorTagsItem';
import type { GeolocationErrorType } from './geolocationErrorType';

export interface GeolocationError {
  code: number;
  countryCode: string;
  message: string;
  regionCode?: GeolocationErrorRegionCode;
  tags?: GeolocationErrorTagsItem[];
  type: GeolocationErrorType;
}

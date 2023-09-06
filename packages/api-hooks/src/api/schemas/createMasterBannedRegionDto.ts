export interface CreateMasterBannedRegionDto {
  country: string;
  isMandatory: boolean;
  region?: string;
  tags: string[];
}

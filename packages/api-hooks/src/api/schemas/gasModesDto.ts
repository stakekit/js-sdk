import type { GasModeValueDto } from './gasModeValueDto';

export interface GasModesDto {
  /** The denomination of the token gas is quoted in */
  denom: string;
  values: GasModeValueDto[];
}

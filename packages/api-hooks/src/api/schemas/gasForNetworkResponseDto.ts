import type { GasModesDto } from './gasModesDto';

export interface GasForNetworkResponseDto {
  customisable: boolean;
  modes: GasModesDto;
}

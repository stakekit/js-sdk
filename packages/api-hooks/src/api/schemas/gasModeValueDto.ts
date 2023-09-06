import type { GasMode } from './gasMode';
import type { GasModeValueDtoGasArgs } from './gasModeValueDtoGasArgs';

export interface GasModeValueDto {
  name: GasMode;
  value: string;
  /** Custom gas properties to request transaction construction with. Can include properties like `gasPrice`, `maxGasPerFee`, etc for EVM chains. */
  gasArgs: GasModeValueDtoGasArgs;
}

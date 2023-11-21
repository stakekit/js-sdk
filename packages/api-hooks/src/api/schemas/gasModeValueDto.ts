import type { GasModeValueDtoGasArgs } from './gasModeValueDtoGasArgs';
import type { GasMode } from './gasMode';

export interface GasModeValueDto {
  /** Custom gas properties to request transaction construction with. Can include properties like `gasPrice`, `maxGasPerFee`, etc for EVM chains. */
  gasArgs: GasModeValueDtoGasArgs;
  name: GasMode;
  value: string;
}

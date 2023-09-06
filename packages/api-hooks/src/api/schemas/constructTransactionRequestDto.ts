import type { ConstructTransactionRequestDtoGasArgs } from './constructTransactionRequestDtoGasArgs';

export interface ConstructTransactionRequestDto {
  /** Custom gas properties to request transaction construction with. Can include properties like `gasPrice`, `maxGasPerFee`, etc for EVM chains. */
  gasArgs?: ConstructTransactionRequestDtoGasArgs;
}

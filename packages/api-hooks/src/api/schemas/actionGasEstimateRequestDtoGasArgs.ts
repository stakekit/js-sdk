import type { CosmosGasArgsDto } from './cosmosGasArgsDto';
import type { EvmEIP1559GasArgsDto } from './evmEIP1559GasArgsDto';
import type { EvmLegacyGasArgsDto } from './evmLegacyGasArgsDto';

/**
 * Custom gas properties to request gas estimate with. Can include properties like `gasPrice`, `maxGasPerFee`, etc for EVM chains.
 */
export type ActionGasEstimateRequestDtoGasArgs =
  | CosmosGasArgsDto
  | EvmEIP1559GasArgsDto
  | EvmLegacyGasArgsDto;

import type { EvmEIP1559GasArgsDtoType } from './evmEIP1559GasArgsDtoType';

export interface EvmEIP1559GasArgsDto {
  type: EvmEIP1559GasArgsDtoType;
  maxFeePerGas: string;
  maxPriorityFeePerGas: string;
}

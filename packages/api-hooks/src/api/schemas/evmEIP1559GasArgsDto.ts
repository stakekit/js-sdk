import type { EvmEIP1559GasArgsDtoType } from './evmEIP1559GasArgsDtoType';

export interface EvmEIP1559GasArgsDto {
  maxFeePerGas: string;
  maxPriorityFeePerGas: string;
  type: EvmEIP1559GasArgsDtoType;
}

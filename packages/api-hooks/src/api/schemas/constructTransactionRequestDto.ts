import type { ConstructTransactionRequestDtoGasArgs } from './constructTransactionRequestDtoGasArgs';
import type { TransactionFormat } from './transactionFormat';

export interface ConstructTransactionRequestDto {
  /** Custom gas properties to request transaction construction with. Can include properties like `gasPrice`, `maxGasPerFee`, etc for EVM chains. */
  gasArgs?: ConstructTransactionRequestDtoGasArgs;
  ledgerWalletAPICompatible?: boolean;
  transactionFormat?: TransactionFormat;
}

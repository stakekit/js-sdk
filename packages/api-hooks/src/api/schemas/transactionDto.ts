import type { Networks } from './networks';
import type { TransactionStatus } from './transactionStatus';
import type { TransactionType } from './transactionType';
import type { TransactionDtoGasEstimate } from './transactionDtoGasEstimate';

export interface TransactionDto {
  id: string;
  network: Networks;
  status: TransactionStatus;
  type: TransactionType;
  hash: string | null;
  signedTransaction: string | null;
  unsignedTransaction: string | null;
  stepIndex: number;
  error: string | null;
  gasEstimate: TransactionDtoGasEstimate;
}

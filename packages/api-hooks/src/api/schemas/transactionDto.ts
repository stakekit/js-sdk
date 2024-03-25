import type { TransactionDtoGasEstimate } from './transactionDtoGasEstimate';
import type { Networks } from './networks';
import type { TransactionStatus } from './transactionStatus';
import type { TransactionType } from './transactionType';

export interface TransactionDto {
  error: string | null;
  explorerUrl: string | null;
  gasEstimate: TransactionDtoGasEstimate;
  hash: string | null;
  id: string;
  ledgerHwAppId: string | null;
  network: Networks;
  signedTransaction: string | null;
  stakeId: string;
  status: TransactionStatus;
  stepIndex: number;
  type: TransactionType;
  unsignedTransaction: string | null;
}

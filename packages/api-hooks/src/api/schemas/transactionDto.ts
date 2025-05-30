import type { TransactionDtoAnnotatedTransaction } from './transactionDtoAnnotatedTransaction';
import type { TransactionDtoGasEstimate } from './transactionDtoGasEstimate';
import type { Networks } from './networks';
import type { TransactionStatus } from './transactionStatus';
import type { TransactionDtoStructuredTransaction } from './transactionDtoStructuredTransaction';
import type { TransactionType } from './transactionType';

export interface TransactionDto {
  accountAddresses?: string[];
  annotatedTransaction: TransactionDtoAnnotatedTransaction;
  broadcastedAt: string | null;
  createdAt: string;
  error: string | null;
  explorerUrl: string | null;
  gasEstimate: TransactionDtoGasEstimate;
  hash: string | null;
  id: string;
  isMessage: boolean;
  ledgerHwAppId: string | null;
  network: Networks;
  signedTransaction: string | null;
  stakeId: string;
  status: TransactionStatus;
  stepIndex: number;
  structuredTransaction: TransactionDtoStructuredTransaction;
  type: TransactionType;
  unsignedTransaction: string | null;
}

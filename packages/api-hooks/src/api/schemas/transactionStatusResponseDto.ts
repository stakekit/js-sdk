import type { TransactionStatus } from './transactionStatus';
import type { Networks } from './networks';
import type { TransactionStatusResponseDtoRaw } from './transactionStatusResponseDtoRaw';

export interface TransactionStatusResponseDto {
  status: TransactionStatus;
  url: string;
  blockNumber?: string;
  network: Networks;
  hash: string;
  raw: TransactionStatusResponseDtoRaw;
}

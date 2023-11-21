import type { Networks } from './networks';
import type { TransactionStatusResponseDtoRaw } from './transactionStatusResponseDtoRaw';
import type { TransactionStatus } from './transactionStatus';

export interface TransactionStatusResponseDto {
  blockNumber?: string;
  hash: string;
  network: Networks;
  raw: TransactionStatusResponseDtoRaw;
  status: TransactionStatus;
  url: string;
}

import type { TokenDto } from './tokenDto';
import type { TransactionType } from './transactionType';

export interface TransactionGasEstimateDto {
  amount: string | null;
  gasLimit?: string;
  stepIndex: number;
  token: TokenDto;
  type: TransactionType;
}

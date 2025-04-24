import type { TokenDto } from './tokenDto';
import type { TransactionGasEstimateDto } from './transactionGasEstimateDto';

export interface ActionGasEstimateDto {
  amount: string | null;
  gasLimit?: string;
  token: TokenDto;
  transactions: TransactionGasEstimateDto[];
}

import type { TokenDto } from './tokenDto';

export interface GasEstimateDto {
  amount: string;
  token: TokenDto;
  gasLimit?: string;
}

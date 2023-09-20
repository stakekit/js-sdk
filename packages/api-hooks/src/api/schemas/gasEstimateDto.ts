import type { TokenDto } from './tokenDto';

export interface GasEstimateDto {
  amount: string | null;
  token: TokenDto;
  gasLimit?: string;
}

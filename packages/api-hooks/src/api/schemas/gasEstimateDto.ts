import type { TokenDto } from './tokenDto';

export interface GasEstimateDto {
  amount: string | null;
  gasLimit?: string;
  token: TokenDto;
}

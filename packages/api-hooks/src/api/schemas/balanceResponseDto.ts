import type { TokenDto } from './tokenDto';

export interface BalanceResponseDto {
  amount: string;
  availableYields: string[];
  token: TokenDto;
}

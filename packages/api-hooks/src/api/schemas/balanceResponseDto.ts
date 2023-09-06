import type { TokenDto } from './tokenDto';

export interface BalanceResponseDto {
  token: TokenDto;
  amount: string;
}

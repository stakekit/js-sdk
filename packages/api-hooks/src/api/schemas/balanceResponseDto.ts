import type { TokenDto } from './tokenDto';

export interface BalanceResponseDto {
  amount: string;
  token: TokenDto;
}

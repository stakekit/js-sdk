import type { TokenDto } from './tokenDto';

export interface TokenBalanceScanResponseDto {
  token: TokenDto;
  amount: string;
  availableYields: string[];
}

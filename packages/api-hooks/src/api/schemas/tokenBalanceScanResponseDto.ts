import type { TokenDto } from './tokenDto';

export interface TokenBalanceScanResponseDto {
  amount: string;
  availableYields: string[];
  token: TokenDto;
}

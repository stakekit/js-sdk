import type { TokenDto } from './tokenDto';

export interface TokenWithAvailableYieldsDto {
  token: TokenDto;
  availableYields: string[];
}

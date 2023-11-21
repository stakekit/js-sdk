import type { TokenDto } from './tokenDto';

export interface TokenWithAvailableYieldsDto {
  availableYields: string[];
  token: TokenDto;
}

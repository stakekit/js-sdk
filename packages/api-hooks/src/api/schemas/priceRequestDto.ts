import type { TokenDto } from './tokenDto';

export interface PriceRequestDto {
  currency: string;
  tokenList: TokenDto[];
}

import type { Networks } from './networks';

export interface TokenDto {
  name: string;
  network: Networks;
  symbol: string;
  decimals: number;
  address?: string;
  coinGeckoId?: string;
  logoURI?: string;
}

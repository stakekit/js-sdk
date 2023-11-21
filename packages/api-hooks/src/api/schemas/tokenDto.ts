import type { Networks } from './networks';

export interface TokenDto {
  address?: string;
  coinGeckoId?: string;
  decimals: number;
  logoURI?: string;
  name: string;
  network: Networks;
  symbol: string;
}

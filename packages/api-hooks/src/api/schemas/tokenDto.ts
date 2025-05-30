import type { Networks } from './networks';

export interface TokenDto {
  address?: string;
  coinGeckoId?: string;
  decimals: number;
  feeConfigurationId?: string;
  isPoints?: boolean;
  logoURI?: string;
  name: string;
  network: Networks;
  symbol: string;
}

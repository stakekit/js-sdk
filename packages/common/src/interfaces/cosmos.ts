import { CosmosNetworks } from '../enums';

export interface CosmosChainConfig {
  network: CosmosNetworks;
  chainId: string;
  name: string;
  denom: string;
  minimalDenom: string;
  decimals: number;
  bech32Prefix: string;
  coinGeckoId?: string;
}

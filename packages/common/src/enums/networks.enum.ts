export enum EvmNetworks {
  AvalancheC = 'avalanche-c',
  AvalancheCAtomic = 'avalanche-c-atomic',
  AvalancheP = 'avalanche-p',
  Arbitrum = 'arbitrum',
  Binance = 'binance',
  Celo = 'celo',
  Ethereum = 'ethereum',
  EthereumGoerli = 'ethereum-goerli',
  Fantom = 'fantom',
  Harmony = 'harmony',
  Optimism = 'optimism',
  Polygon = 'polygon',
}

export enum CosmosNetworks {
  Akash = 'akash',
  Cosmos = 'cosmos',
  Juno = 'juno',
  Kava = 'kava',
  Osmosis = 'osmosis',
  Stargaze = 'stargaze',
}

export enum MiscNetworks {
  BinanceBeacon = 'binancebeacon',
  Near = 'near',
  Solana = 'solana',
  Tezos = 'tezos',
}

export const Networks = { ...EvmNetworks, ...CosmosNetworks, ...MiscNetworks };
export type Networks = EvmNetworks | CosmosNetworks | MiscNetworks;

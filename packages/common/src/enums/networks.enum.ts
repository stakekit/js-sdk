export enum EvmNetworks {
  AvalancheC = 'avalanche-c', // NEVER USE A DASH FOR NETWORK NAMES
  AvalancheCAtomic = 'avalanche-c-atomic',
  AvalancheP = 'avalanche-p',
  Arbitrum = 'arbitrum',
  Binance = 'binance',
  // BinanceTestnet = 'binancetestnet',
  Celo = 'celo',
  Ethereum = 'ethereum',
  EthereumGoerli = 'ethereum-goerli',
  Fantom = 'fantom',
  Gnosis = 'gnosis',
  Harmony = 'harmony',
  Moonriver = 'moonriver',
  Optimism = 'optimism',
  OKC = 'okc',
  Polygon = 'polygon',
  zkSync = 'zksync',
}

export enum CosmosNetworks {
  Akash = 'akash',
  Cosmos = 'cosmos',
  Juno = 'juno',
  Kava = 'kava',
  Osmosis = 'osmosis',
  Persistence = 'persistence',
  Stargaze = 'stargaze',
}

export enum MiscNetworks {
  BinanceBeacon = 'binancebeacon',
  // BinanceBeaconGanges = 'binancebeaconganges',
  Near = 'near',
  Solana = 'solana',
  Tezos = 'tezos',
  Terra = 'terra',
}

export const Networks = { ...EvmNetworks, ...CosmosNetworks, ...MiscNetworks };
export type Networks = EvmNetworks | CosmosNetworks | MiscNetworks;

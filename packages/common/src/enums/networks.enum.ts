export enum EvmNetworks {
  AvalancheC = 'avalanche-c',
  AvalancheCAtomic = 'avalanche-c-atomic',
  AvalancheP = 'avalanche-p',
  Arbitrum = 'arbitrum',
  Binance = 'binance',
  Celo = 'celo',
  Ethereum = 'ethereum',
  EthereumGoerli = 'ethereum-goerli',
  EthereumHolesky = 'ethereum-holesky',
  Fantom = 'fantom',
  Harmony = 'harmony',
  Optimism = 'optimism',
  Polygon = 'polygon',
  Gnosis = 'gnosis',
  Moonriver = 'moonriver',
  OKC = 'okc',
  zkSync = 'zksync',
  Viction = 'viction',
}

export enum CosmosNetworks {
  Agoric = 'agoric',
  Akash = 'akash',
  Axelar = 'axelar',
  BandProtocol = 'band-protocol',
  Bitsong = 'bitsong',
  Canto = 'canto',
  Chihuahua = 'chihuahua',
  Comdex = 'comdex',
  Coreum = 'coreum',
  Cosmos = 'cosmos',
  Crescent = 'crescent',
  Cronos = 'cronos',
  Cudos = 'cudos',
  Desmos = 'desmos',
  Dydx = 'dydx',
  Evmos = 'evmos',
  FetchAi = 'fetch-ai',
  GravityBridge = 'gravity-bridge',
  Injective = 'injective',
  IRISnet = 'irisnet',
  Juno = 'juno',
  Kava = 'kava',
  KiNetwork = 'ki-network',
  MarsProtocol = 'mars-protocol',
  NYM = 'nym',
  OKExChain = 'okex-chain',
  Onomy = 'onomy',
  Osmosis = 'osmosis',
  Persistence = 'persistence',
  Quicksilver = 'quicksilver',
  Regen = 'regen',
  Secret = 'secret',
  Sentinel = 'sentinel',
  Sommelier = 'sommelier',
  StaFi = 'stafi',
  Stargaze = 'stargaze',
  Stride = 'stride',
  Teritori = 'teritori',
  TGrade = 'tgrade',
  Umee = 'umee',
}

export enum SubstrateNetworks {
  Polkadot = 'polkadot',
  Westend = 'westend',
  Kusama = 'kusama',
}

export enum MiscNetworks {
  BinanceBeacon = 'binancebeacon',
  Cardano = 'cardano',
  Near = 'near',
  Solana = 'solana',
  Tezos = 'tezos',
  Tron = 'tron',
}

export const Networks = {
  ...EvmNetworks,
  ...CosmosNetworks,
  ...SubstrateNetworks,
  ...MiscNetworks,
};
export type Networks =
  | EvmNetworks
  | CosmosNetworks
  | SubstrateNetworks
  | MiscNetworks;

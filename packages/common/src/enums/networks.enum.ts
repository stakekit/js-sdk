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
  Gnosis = 'gnosis',
  Moonriver = 'moonriver',
  OKC = 'okc',
  zkSync = 'zksync',
}

export enum CosmosNetworks {
  Akash = 'akash',
  Cosmos = 'cosmos',
  Juno = 'juno',
  Kava = 'kava',
  Osmosis = 'osmosis',
  Stargaze = 'stargaze',
  Onomy = 'onomy',
  Persistence = 'persistence',
  Axelar = 'axelar',
  Quicksilver = 'quicksilver',
  Agoric = 'agoric',
  BandProtocol = 'band-protocol',
  Bitsong = 'bitsong',
  Canto = 'canto',
  Chihuahua = 'chihuahua',
  Comdex = 'comdex',
  Crescent = 'crescent',
  Cronos = 'cronos',
  Cudos = 'cudos',
  Evmos = 'evmos',
  FetchAi = 'fetch-ai',
  GravityBridge = 'gravity-bridge',
  Injective = 'injective',
  IRISnet = 'irisnet',
  KiNetwork = 'ki-network',
  MarsProtocol = 'mars-protocol',
  NYM = 'nym',
  OKExChain = 'okex-chain',
  Regen = 'regen',
  Secret = 'secret',
  Sentinel = 'sentinel',
  Sommelier = 'sommelier',
  StaFi = 'stafi',
  Stride = 'stride',
  Teritori = 'teritori',
  TGrade = 'tgrade',
  Umee = 'umee',
  Coreum = 'coreum',
  Desmos = 'desmos',
}

export enum SubstrateNetworks {
  Polkadot = 'polkadot',
  Westend = 'westend',
  Kusama = 'kusama',
}

export enum MiscNetworks {
  BinanceBeacon = 'binancebeacon',
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

export enum EvmNetworks {
  // Ethereum & L2s
  Ethereum = 'ethereum',
  EthereumGoerli = 'ethereum-goerli',
  EthereumHolesky = 'ethereum-holesky',
  EthereumSepolia = 'ethereum-sepolia',
  Arbitrum = 'arbitrum',
  Base = 'base',
  Gnosis = 'gnosis',
  Optimism = 'optimism',
  Polygon = 'polygon',
  Starknet = 'starknet',
  zkSync = 'zksync',
  Linea = 'linea',
  Unichain = 'unichain',

  // Other EVM
  AvalancheC = 'avalanche-c',
  AvalancheCAtomic = 'avalanche-c-atomic',
  AvalancheP = 'avalanche-p',
  Binance = 'binance',
  Celo = 'celo',
  Fantom = 'fantom',
  Harmony = 'harmony',
  Moonriver = 'moonriver',
  OKC = 'okc',
  Viction = 'viction',
  Core = 'core',
  Sonic = 'sonic',
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
  Sei = 'sei',
  Mantra = 'mantra',
  Celestia = 'celestia',
  Saga = 'saga',
  Zetachain = 'zetachain',
  Dymension = 'dymension',
  HumansAi = 'humansai',
  Neutron = 'neutron',
}

export enum SubstrateNetworks {
  Polkadot = 'polkadot',
  Westend = 'westend',
  Kusama = 'kusama',
  Bittensor = 'bittensor',
}

export enum MiscNetworks {
  BinanceBeacon = 'binancebeacon',
  Cardano = 'cardano',
  Near = 'near',
  Solana = 'solana',
  Tezos = 'tezos',
  Tron = 'tron',
  Ton = 'ton',
  TonTestnet = 'ton-testnet',
  Aptos = 'aptos',
  Stellar = 'stellar',
  StellarTestnet = 'stellar-testnet',
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

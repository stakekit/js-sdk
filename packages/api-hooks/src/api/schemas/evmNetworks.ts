export type EvmNetworks = (typeof EvmNetworks)[keyof typeof EvmNetworks];

// eslint-disable-next-line @typescript-eslint/no-redeclare
export const EvmNetworks = {
  ethereum: 'ethereum',
  'ethereum-goerli': 'ethereum-goerli',
  'ethereum-holesky': 'ethereum-holesky',
  arbitrum: 'arbitrum',
  base: 'base',
  gnosis: 'gnosis',
  optimism: 'optimism',
  polygon: 'polygon',
  starknet: 'starknet',
  zksync: 'zksync',
  linea: 'linea',
  'avalanche-c': 'avalanche-c',
  'avalanche-c-atomic': 'avalanche-c-atomic',
  'avalanche-p': 'avalanche-p',
  binance: 'binance',
  celo: 'celo',
  fantom: 'fantom',
  harmony: 'harmony',
  moonriver: 'moonriver',
  okc: 'okc',
  viction: 'viction',
  core: 'core',
  sonic: 'sonic',
} as const;

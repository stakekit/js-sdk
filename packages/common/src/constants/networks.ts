import { CosmosNetworks, Networks } from '../enums';
import { cosmosChainConfig } from './cosmos-chains';

export const NetworkToCoinGeckoPlatformId: { [x in Networks]?: string } = {
  [Networks.Ethereum]: 'ethereum',
  [Networks.Solana]: 'solana',
  [Networks.Celo]: 'celo',
  [Networks.Optimism]: 'optimistic-ethereum',
  [Networks.AvalancheC]: 'avalanche',
  [Networks.Fantom]: 'fantom',
  [Networks.Polygon]: 'polygon-pos',
  [Networks.Binance]: 'binance-smart-chain',
  [Networks.Harmony]: 'harmony-shard-0',
  [Networks.Arbitrum]: 'arbitrum-one',
  [Networks.Tezos]: 'tezos',
  [Networks.Cardano]: 'cardano',
  [Networks.Starknet]: 'starknet',
  [Networks.Base]: 'base',
  [Networks.Linea]: 'linea',
  [Networks.zkSync]: 'zksync',
  [Networks.Core]: 'coredaoorg',
  [Networks.HyperEVM]: 'hyperliquid',

  ...Object.values(CosmosNetworks).reduce(
    (accum, n) => ({
      ...accum,
      [n]: cosmosChainConfig[n].coinGeckoId,
    }),
    {},
  ),
};

export const ChainIds: { [x in Networks]?: string } = {
  [Networks.Arbitrum]: '42161',
  [Networks.AvalancheC]: '43114',
  [Networks.Binance]: '56',
  [Networks.Celo]: '42220',
  [Networks.Ethereum]: '1',
  [Networks.EthereumGoerli]: '5',
  [Networks.EthereumHolesky]: '17000',
  [Networks.Fantom]: '250',
  [Networks.Near]: 'near',
  [Networks.Harmony]: '1666600000',
  [Networks.Optimism]: '10',
  [Networks.Polygon]: '137',
  [Networks.Akash]: 'akashnet-2',
  [Networks.Solana]: '4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ',
  [Networks.Tezos]: 'NetXdQprcVkpaWU',
  [Networks.Starknet]: '23448594291968334',
  [Networks.Viction]: '88',
  [Networks.Base]: '8453',
  [Networks.Linea]: '59144',
  [Networks.zkSync]: '324',
  [Networks.Core]: '1116',
  [Networks.HyperEVM]: '999',

  ...Object.values(CosmosNetworks).reduce(
    (accum, n) => ({
      ...accum,
      [n]: cosmosChainConfig[n].chainId,
    }),
    {},
  ),
};

import type { CosmosAdditionalAddressesDto } from './cosmosAdditionalAddressesDto';
import type { BinanceAdditionalAddressesDto } from './binanceAdditionalAddressesDto';
import type { SolanaAdditionalAddressesDto } from './solanaAdditionalAddressesDto';
import type { TezosAdditionalAddressesDto } from './tezosAdditionalAddressesDto';
import type { AvalancheCAdditionalAddressesDto } from './avalancheCAdditionalAddressesDto';

export type AddressesDtoAdditionalAddresses =
  | CosmosAdditionalAddressesDto
  | BinanceAdditionalAddressesDto
  | SolanaAdditionalAddressesDto
  | TezosAdditionalAddressesDto
  | AvalancheCAdditionalAddressesDto;

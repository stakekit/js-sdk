import type { EthDeFiDetailsViewDto } from './ethDeFiDetailsViewDto';
import type { AdaDetailsViewDto } from './adaDetailsViewDto';
import type { CosmosDetailsViewDto } from './cosmosDetailsViewDto';
import type { EthNativeDetailsViewDto } from './ethNativeDetailsViewDto';
import type { InjectiveDetailsViewDto } from './injectiveDetailsViewDto';
import type { KilnEthereumPoolingDetailsViewDto } from './kilnEthereumPoolingDetailsViewDto';
import type { NearDetailsViewDto } from './nearDetailsViewDto';
import type { OsmosisDetailsViewDto } from './osmosisDetailsViewDto';
import type { SolanaDetailsViewDto } from './solanaDetailsViewDto';
import type { StakeKitStakeDetailsViewDto } from './stakeKitStakeDetailsViewDto';
import type { StakeKitVaultDetailsViewDto } from './stakeKitVaultDetailsViewDto';
import type { TezosDetailsViewDto } from './tezosDetailsViewDto';

/**
 * Details view
 */
export type StakeViewSuccessDtoDetails =
  | EthDeFiDetailsViewDto
  | AdaDetailsViewDto
  | CosmosDetailsViewDto
  | EthNativeDetailsViewDto
  | InjectiveDetailsViewDto
  | KilnEthereumPoolingDetailsViewDto
  | NearDetailsViewDto
  | OsmosisDetailsViewDto
  | SolanaDetailsViewDto
  | StakeKitStakeDetailsViewDto
  | StakeKitVaultDetailsViewDto
  | TezosDetailsViewDto;

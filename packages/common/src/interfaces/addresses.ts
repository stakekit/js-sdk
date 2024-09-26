export interface CosmosAdditionalAddresses {
  cosmosPubKey: string;
}

export interface TezosAdditionalAddresses {
  tezosPubKey: string;
}

export interface BinanceAdditionalAddresses {
  binanceBeaconAddress: string;
}

export interface SolanaAdditionalAddresses {
  stakeAccounts?: string[];
  lidoStakeAccounts?: string[];
}

export interface TezosAdditionalAddresses {
  tezosPubKey: string;
}

export interface AvalancheCAdditionalAddresses {
  cAddressBech: string;
  pAddressBech: string;
}

export interface TonAdditionalAddresses {
  tonPubKey: string;
}

export type AdditionalAddresses =
  | CosmosAdditionalAddresses
  | BinanceAdditionalAddresses
  | SolanaAdditionalAddresses
  | TezosAdditionalAddresses
  | AvalancheCAdditionalAddresses
  | TonAdditionalAddresses;

export interface Addresses {
  address: string;
  additionalAddresses?: AdditionalAddresses;
}

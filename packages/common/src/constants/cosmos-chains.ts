import { CosmosGasDenom, CosmosNetworks, Networks } from '../enums';
import { CosmosChainConfig } from '../interfaces';

export const cosmosChainConfig: {
  [x in CosmosNetworks]: CosmosChainConfig;
} = {
  [Networks.Akash]: {
    network: Networks.Akash,
    chainId: 'akashnet-2',
    name: 'Akash',
    denom: CosmosGasDenom.AKT,
    minimalDenom: CosmosGasDenom.uakt,
    decimals: 6,
    bech32Prefix: 'akash',
    coinGeckoId: 'akash-network',

    // https://figment.io/protocols/akash/
    validatorAddress: 'akashvaloper1mp0t9f4lpgu2tqa2maxk3vp8kugn8meyua86fh',

    unbondingPeriodDays: 21,
  },
  [Networks.Cosmos]: {
    network: Networks.Cosmos,
    chainId: 'cosmoshub-4',
    name: 'Cosmos',
    denom: CosmosGasDenom.ATOM,
    minimalDenom: CosmosGasDenom.uatom,
    decimals: 6,
    bech32Prefix: 'cosmos',
    coinGeckoId: 'cosmos',

    // https://figment.io/protocols/cosmos/
    validatorAddress: 'cosmosvaloper1hjct6q7npsspsg3dgvzk3sdf89spmlpfdn6m9d',
    figmentTransactionSearchUri: 'cosmos--search.datahub.figment.io',

    unbondingPeriodDays: 21,
  },
  [Networks.Kava]: {
    network: Networks.Kava,
    chainId: 'kava-9',
    name: 'Kava',
    denom: CosmosGasDenom.KAVA,
    minimalDenom: CosmosGasDenom.ukava,
    decimals: 6,
    bech32Prefix: 'kava',
    coinGeckoId: 'kava',

    // https://figment.io/protocols/kava/
    validatorAddress: 'kavavaloper1xhxzmj8fvkqn76knay9x2chfra826369dhdu2c',

    unbondingPeriodDays: 21,
  },
  [Networks.Osmosis]: {
    network: Networks.Osmosis,
    chainId: 'osmosis-1',
    name: 'Osmosis',
    denom: CosmosGasDenom.OSMO,
    minimalDenom: CosmosGasDenom.uosmo,
    decimals: 6,
    bech32Prefix: 'osmo',
    coinGeckoId: 'osmosis',

    // https://figment.io/protocols/osmosis/
    validatorAddress: 'osmovaloper1hjct6q7npsspsg3dgvzk3sdf89spmlpf6t4agt',
    unbondingPeriodDays: 14,
  },
  [Networks.Juno]: {
    network: Networks.Juno,
    chainId: 'juno-1',
    name: 'Juno',
    denom: CosmosGasDenom.JUNO,
    minimalDenom: CosmosGasDenom.ujuno,
    decimals: 6,
    bech32Prefix: 'juno',
    coinGeckoId: 'juno-network',

    validatorAddress: 'junovaloper1hjct6q7npsspsg3dgvzk3sdf89spmlpfpgm64m',
    unbondingPeriodDays: 28,
  },
  [Networks.Stargaze]: {
    network: Networks.Stargaze,
    chainId: 'stargaze-1',
    name: 'Stargaze',
    denom: CosmosGasDenom.STARS,
    minimalDenom: CosmosGasDenom.ustars,
    decimals: 6,
    bech32Prefix: 'stars',
    coinGeckoId: 'stargaze',
    // https://figment.io/protocols/stargaze/
    validatorAddress: 'starsvaloper13htkxk8nw6qwhfdugllp8ldtgt5nm80xf679h5',
    unbondingPeriodDays: 14,
  },
};

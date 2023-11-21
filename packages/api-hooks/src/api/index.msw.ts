import { faker } from '@faker-js/faker';
import { HttpResponse, delay, http } from 'msw';
import {
  ActionStatus,
  ActionTypes,
  BalanceTypes,
  GasMode,
  Networks,
  RewardClaiming,
  RewardSchedule,
  TransactionStatus,
  TransactionType,
  YieldProviders,
  YieldType,
} from './schemas';

export const getActionControllerGetActionMock = () => ({
  amount: faker.helpers.arrayElement([faker.word.sample(), null]),
  createdAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
  currentStepIndex: faker.number.int({ min: undefined, max: undefined }),
  id: faker.word.sample(),
  integrationId: faker.word.sample(),
  status: faker.helpers.arrayElement(Object.values(ActionStatus)),
  tokenId: faker.helpers.arrayElement([faker.word.sample(), null]),
  transactions: Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => ({
    error: faker.helpers.arrayElement([faker.word.sample(), null]),
    explorerUrl: faker.helpers.arrayElement([faker.word.sample(), null]),
    gasEstimate: {
      amount: faker.helpers.arrayElement([faker.word.sample(), null]),
      gasLimit: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      token: {
        address: faker.helpers.arrayElement([faker.word.sample(), undefined]),
        coinGeckoId: faker.helpers.arrayElement([
          faker.word.sample(),
          undefined,
        ]),
        decimals: faker.number.int({ min: undefined, max: undefined }),
        logoURI: faker.helpers.arrayElement([faker.word.sample(), undefined]),
        name: faker.word.sample(),
        network: faker.helpers.arrayElement(Object.values(Networks)),
        symbol: faker.word.sample(),
      },
    },
    hash: faker.helpers.arrayElement([faker.word.sample(), null]),
    id: faker.word.sample(),
    network: faker.helpers.arrayElement(Object.values(Networks)),
    signedTransaction: faker.helpers.arrayElement([faker.word.sample(), null]),
    stakeId: faker.word.sample(),
    status: faker.helpers.arrayElement(Object.values(TransactionStatus)),
    stepIndex: faker.number.int({ min: undefined, max: undefined }),
    type: faker.helpers.arrayElement(Object.values(TransactionType)),
    unsignedTransaction: faker.helpers.arrayElement([
      faker.word.sample(),
      null,
    ]),
  })),
  type: faker.helpers.arrayElement(Object.values(ActionTypes)),
  validatorAddress: faker.helpers.arrayElement([faker.word.sample(), null]),
  validatorAddresses: Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => faker.word.sample()),
});

export const getActionControllerEnterMock = () => ({
  amount: faker.helpers.arrayElement([faker.word.sample(), null]),
  createdAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
  currentStepIndex: faker.number.int({ min: undefined, max: undefined }),
  id: faker.word.sample(),
  integrationId: faker.word.sample(),
  status: faker.helpers.arrayElement(Object.values(ActionStatus)),
  tokenId: faker.helpers.arrayElement([faker.word.sample(), null]),
  transactions: Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => ({
    error: faker.helpers.arrayElement([faker.word.sample(), null]),
    explorerUrl: faker.helpers.arrayElement([faker.word.sample(), null]),
    gasEstimate: {
      amount: faker.helpers.arrayElement([faker.word.sample(), null]),
      gasLimit: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      token: {
        address: faker.helpers.arrayElement([faker.word.sample(), undefined]),
        coinGeckoId: faker.helpers.arrayElement([
          faker.word.sample(),
          undefined,
        ]),
        decimals: faker.number.int({ min: undefined, max: undefined }),
        logoURI: faker.helpers.arrayElement([faker.word.sample(), undefined]),
        name: faker.word.sample(),
        network: faker.helpers.arrayElement(Object.values(Networks)),
        symbol: faker.word.sample(),
      },
    },
    hash: faker.helpers.arrayElement([faker.word.sample(), null]),
    id: faker.word.sample(),
    network: faker.helpers.arrayElement(Object.values(Networks)),
    signedTransaction: faker.helpers.arrayElement([faker.word.sample(), null]),
    stakeId: faker.word.sample(),
    status: faker.helpers.arrayElement(Object.values(TransactionStatus)),
    stepIndex: faker.number.int({ min: undefined, max: undefined }),
    type: faker.helpers.arrayElement(Object.values(TransactionType)),
    unsignedTransaction: faker.helpers.arrayElement([
      faker.word.sample(),
      null,
    ]),
  })),
  type: faker.helpers.arrayElement(Object.values(ActionTypes)),
  validatorAddress: faker.helpers.arrayElement([faker.word.sample(), null]),
  validatorAddresses: Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => faker.word.sample()),
});

export const getActionControllerExitMock = () => ({
  amount: faker.helpers.arrayElement([faker.word.sample(), null]),
  createdAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
  currentStepIndex: faker.number.int({ min: undefined, max: undefined }),
  id: faker.word.sample(),
  integrationId: faker.word.sample(),
  status: faker.helpers.arrayElement(Object.values(ActionStatus)),
  tokenId: faker.helpers.arrayElement([faker.word.sample(), null]),
  transactions: Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => ({
    error: faker.helpers.arrayElement([faker.word.sample(), null]),
    explorerUrl: faker.helpers.arrayElement([faker.word.sample(), null]),
    gasEstimate: {
      amount: faker.helpers.arrayElement([faker.word.sample(), null]),
      gasLimit: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      token: {
        address: faker.helpers.arrayElement([faker.word.sample(), undefined]),
        coinGeckoId: faker.helpers.arrayElement([
          faker.word.sample(),
          undefined,
        ]),
        decimals: faker.number.int({ min: undefined, max: undefined }),
        logoURI: faker.helpers.arrayElement([faker.word.sample(), undefined]),
        name: faker.word.sample(),
        network: faker.helpers.arrayElement(Object.values(Networks)),
        symbol: faker.word.sample(),
      },
    },
    hash: faker.helpers.arrayElement([faker.word.sample(), null]),
    id: faker.word.sample(),
    network: faker.helpers.arrayElement(Object.values(Networks)),
    signedTransaction: faker.helpers.arrayElement([faker.word.sample(), null]),
    stakeId: faker.word.sample(),
    status: faker.helpers.arrayElement(Object.values(TransactionStatus)),
    stepIndex: faker.number.int({ min: undefined, max: undefined }),
    type: faker.helpers.arrayElement(Object.values(TransactionType)),
    unsignedTransaction: faker.helpers.arrayElement([
      faker.word.sample(),
      null,
    ]),
  })),
  type: faker.helpers.arrayElement(Object.values(ActionTypes)),
  validatorAddress: faker.helpers.arrayElement([faker.word.sample(), null]),
  validatorAddresses: Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => faker.word.sample()),
});

export const getActionControllerPendingMock = () => ({
  amount: faker.helpers.arrayElement([faker.word.sample(), null]),
  createdAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
  currentStepIndex: faker.number.int({ min: undefined, max: undefined }),
  id: faker.word.sample(),
  integrationId: faker.word.sample(),
  status: faker.helpers.arrayElement(Object.values(ActionStatus)),
  tokenId: faker.helpers.arrayElement([faker.word.sample(), null]),
  transactions: Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => ({
    error: faker.helpers.arrayElement([faker.word.sample(), null]),
    explorerUrl: faker.helpers.arrayElement([faker.word.sample(), null]),
    gasEstimate: {
      amount: faker.helpers.arrayElement([faker.word.sample(), null]),
      gasLimit: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      token: {
        address: faker.helpers.arrayElement([faker.word.sample(), undefined]),
        coinGeckoId: faker.helpers.arrayElement([
          faker.word.sample(),
          undefined,
        ]),
        decimals: faker.number.int({ min: undefined, max: undefined }),
        logoURI: faker.helpers.arrayElement([faker.word.sample(), undefined]),
        name: faker.word.sample(),
        network: faker.helpers.arrayElement(Object.values(Networks)),
        symbol: faker.word.sample(),
      },
    },
    hash: faker.helpers.arrayElement([faker.word.sample(), null]),
    id: faker.word.sample(),
    network: faker.helpers.arrayElement(Object.values(Networks)),
    signedTransaction: faker.helpers.arrayElement([faker.word.sample(), null]),
    stakeId: faker.word.sample(),
    status: faker.helpers.arrayElement(Object.values(TransactionStatus)),
    stepIndex: faker.number.int({ min: undefined, max: undefined }),
    type: faker.helpers.arrayElement(Object.values(TransactionType)),
    unsignedTransaction: faker.helpers.arrayElement([
      faker.word.sample(),
      null,
    ]),
  })),
  type: faker.helpers.arrayElement(Object.values(ActionTypes)),
  validatorAddress: faker.helpers.arrayElement([faker.word.sample(), null]),
  validatorAddresses: Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => faker.word.sample()),
});

export const getTransactionControllerGetTransactionMock = () => ({
  error: faker.helpers.arrayElement([faker.word.sample(), null]),
  explorerUrl: faker.helpers.arrayElement([faker.word.sample(), null]),
  gasEstimate: {
    amount: faker.helpers.arrayElement([faker.word.sample(), null]),
    gasLimit: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    token: {
      address: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      coinGeckoId: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      decimals: faker.number.int({ min: undefined, max: undefined }),
      logoURI: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      name: faker.word.sample(),
      network: faker.helpers.arrayElement(Object.values(Networks)),
      symbol: faker.word.sample(),
    },
  },
  hash: faker.helpers.arrayElement([faker.word.sample(), null]),
  id: faker.word.sample(),
  network: faker.helpers.arrayElement(Object.values(Networks)),
  signedTransaction: faker.helpers.arrayElement([faker.word.sample(), null]),
  stakeId: faker.word.sample(),
  status: faker.helpers.arrayElement(Object.values(TransactionStatus)),
  stepIndex: faker.number.int({ min: undefined, max: undefined }),
  type: faker.helpers.arrayElement(Object.values(TransactionType)),
  unsignedTransaction: faker.helpers.arrayElement([faker.word.sample(), null]),
});

export const getTransactionControllerConstructMock = () => ({
  error: faker.helpers.arrayElement([faker.word.sample(), null]),
  explorerUrl: faker.helpers.arrayElement([faker.word.sample(), null]),
  gasEstimate: {
    amount: faker.helpers.arrayElement([faker.word.sample(), null]),
    gasLimit: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    token: {
      address: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      coinGeckoId: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      decimals: faker.number.int({ min: undefined, max: undefined }),
      logoURI: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      name: faker.word.sample(),
      network: faker.helpers.arrayElement(Object.values(Networks)),
      symbol: faker.word.sample(),
    },
  },
  hash: faker.helpers.arrayElement([faker.word.sample(), null]),
  id: faker.word.sample(),
  network: faker.helpers.arrayElement(Object.values(Networks)),
  signedTransaction: faker.helpers.arrayElement([faker.word.sample(), null]),
  stakeId: faker.word.sample(),
  status: faker.helpers.arrayElement(Object.values(TransactionStatus)),
  stepIndex: faker.number.int({ min: undefined, max: undefined }),
  type: faker.helpers.arrayElement(Object.values(TransactionType)),
  unsignedTransaction: faker.helpers.arrayElement([faker.word.sample(), null]),
});

export const getTransactionControllerSubmitMock = () => ({
  link: faker.word.sample(),
  transactionHash: faker.word.sample(),
});

export const getTransactionControllerGetTransactionStatusFromIdMock = () => ({
  blockNumber: faker.helpers.arrayElement([faker.word.sample(), undefined]),
  hash: faker.word.sample(),
  network: faker.helpers.arrayElement(Object.values(Networks)),
  raw: {},
  status: faker.helpers.arrayElement(Object.values(TransactionStatus)),
  url: faker.word.sample(),
});

export const getTransactionControllerGetGasForNetworkMock = () => ({
  customisable: faker.datatype.boolean(),
  modes: {
    denom: faker.word.sample(),
    values: Array.from(
      { length: faker.number.int({ min: 1, max: 10 }) },
      (_, i) => i + 1,
    ).map(() => ({
      gasArgs: faker.helpers.arrayElement([
        { gasPrice: faker.word.sample() },
        {
          maxFeePerGas: faker.word.sample(),
          maxPriorityFeePerGas: faker.word.sample(),
          type: faker.number.int({ min: undefined, max: undefined }),
        },
        {},
      ]),
      name: faker.helpers.arrayElement(Object.values(GasMode)),
      value: faker.word.sample(),
    })),
  },
});

export const getTokenControllerGetTokensMock = () =>
  Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => ({
    availableYields: Array.from(
      { length: faker.number.int({ min: 1, max: 10 }) },
      (_, i) => i + 1,
    ).map(() => faker.word.sample()),
    token: {
      address: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      coinGeckoId: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      decimals: faker.number.int({ min: undefined, max: undefined }),
      logoURI: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      name: faker.word.sample(),
      network: faker.helpers.arrayElement(Object.values(Networks)),
      symbol: faker.word.sample(),
    },
  }));

export const getTokenControllerGetTokenPricesMock = () => ({});

export const getTokenControllerGetTokenBalancesMock = () =>
  Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => ({
    amount: faker.word.sample(),
    token: {
      address: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      coinGeckoId: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      decimals: faker.number.int({ min: undefined, max: undefined }),
      logoURI: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      name: faker.word.sample(),
      network: faker.helpers.arrayElement(Object.values(Networks)),
      symbol: faker.word.sample(),
    },
  }));

export const getTokenControllerTokenBalancesScanMock = () =>
  Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => ({
    amount: faker.word.sample(),
    availableYields: Array.from(
      { length: faker.number.int({ min: 1, max: 10 }) },
      (_, i) => i + 1,
    ).map(() => faker.word.sample()),
    token: {
      address: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      coinGeckoId: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      decimals: faker.number.int({ min: undefined, max: undefined }),
      logoURI: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      name: faker.word.sample(),
      network: faker.helpers.arrayElement(Object.values(Networks)),
      symbol: faker.word.sample(),
    },
  }));

export const getYieldControllerYieldsMock = () => ({
  data: {},
  hasNextPage: faker.datatype.boolean(),
  limit: faker.number.int({ min: undefined, max: undefined }),
  page: faker.number.int({ min: undefined, max: undefined }),
});

export const getYieldControllerGetMultipleYieldBalancesMock = () =>
  Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => ({
    balances: Array.from(
      { length: faker.number.int({ min: 1, max: 10 }) },
      (_, i) => i + 1,
    ).map(() => ({
      amount: faker.word.sample(),
      date: faker.helpers.arrayElement([
        `${faker.date.past().toISOString().split('.')[0]}Z`,
        undefined,
      ]),
      pendingActions: Array.from(
        { length: faker.number.int({ min: 1, max: 10 }) },
        (_, i) => i + 1,
      ).map(() => ({
        args: faker.helpers.arrayElement([
          {
            addresses: faker.helpers.arrayElement([
              {
                additionalAddresses: faker.helpers.arrayElement([
                  Array.from(
                    { length: faker.number.int({ min: 1, max: 10 }) },
                    (_, i) => i + 1,
                  ).map(() => ({})),
                  undefined,
                ]),
                address: faker.helpers.arrayElement([
                  {
                    network: faker.helpers.arrayElement([
                      'avalanche-c',
                      'avalanche-c-atomic',
                      'avalanche-p',
                      'arbitrum',
                      'binance',
                      'celo',
                      'ethereum',
                      'ethereum-goerli',
                      'fantom',
                      'harmony',
                      'optimism',
                      'polygon',
                      'akash',
                      'cosmos',
                      'juno',
                      'kava',
                      'osmosis',
                      'stargaze',
                      'onomy',
                      'persistence',
                      'axelar',
                      'quicksilver',
                      'agoric',
                      'band-protocol',
                      'bitsong',
                      'canto',
                      'chihuahua',
                      'comdex',
                      'crescent',
                      'cronos',
                      'cudos',
                      'evmos',
                      'fetch-ai',
                      'gravity-bridge',
                      'injective',
                      'irisnet',
                      'ki-network',
                      'mars-protocol',
                      'nym',
                      'okex-chain',
                      'regen',
                      'secret',
                      'sentinel',
                      'sommelier',
                      'stafi',
                      'stride',
                      'teritori',
                      'tgrade',
                      'umee',
                      'coreum',
                      'desmos',
                      'polkadot',
                      'binancebeacon',
                      'near',
                      'solana',
                      'tezos',
                      'tron',
                    ]),
                    required: faker.datatype.boolean(),
                  },
                  undefined,
                ]),
              },
              undefined,
            ]),
            args: faker.helpers.arrayElement([
              {
                amount: faker.helpers.arrayElement([
                  {
                    maximum: faker.helpers.arrayElement([
                      faker.number.int({ min: undefined, max: undefined }),
                      undefined,
                    ]),
                    minimum: faker.helpers.arrayElement([
                      faker.number.int({ min: undefined, max: undefined }),
                      undefined,
                    ]),
                    required: faker.datatype.boolean(),
                  },
                  undefined,
                ]),
                duration: faker.helpers.arrayElement([
                  {
                    maximum: faker.helpers.arrayElement([
                      faker.number.int({ min: undefined, max: undefined }),
                      undefined,
                    ]),
                    minimum: faker.helpers.arrayElement([
                      faker.number.int({ min: undefined, max: undefined }),
                      undefined,
                    ]),
                    required: faker.datatype.boolean(),
                  },
                  undefined,
                ]),
                nfts: faker.helpers.arrayElement([
                  Array.from(
                    { length: faker.number.int({ min: 1, max: 10 }) },
                    (_, i) => i + 1,
                  ).map(() => ({
                    bakcId: faker.helpers.arrayElement([
                      { required: faker.datatype.boolean() },
                      undefined,
                    ]),
                    baycId: faker.helpers.arrayElement([
                      { required: faker.datatype.boolean() },
                      undefined,
                    ]),
                    maycId: faker.helpers.arrayElement([
                      { required: faker.datatype.boolean() },
                      undefined,
                    ]),
                  })),
                  undefined,
                ]),
                validatorAddress: faker.helpers.arrayElement([
                  { required: faker.datatype.boolean() },
                  undefined,
                ]),
                validatorAddresses: faker.helpers.arrayElement([
                  { required: faker.datatype.boolean() },
                  undefined,
                ]),
              },
              undefined,
            ]),
          },
          undefined,
        ]),
        passthrough: faker.word.sample(),
        type: faker.helpers.arrayElement(Object.values(ActionTypes)),
      })),
      pricePerShare: faker.word.sample(),
      token: {
        address: faker.helpers.arrayElement([faker.word.sample(), undefined]),
        coinGeckoId: faker.helpers.arrayElement([
          faker.word.sample(),
          undefined,
        ]),
        decimals: faker.number.int({ min: undefined, max: undefined }),
        logoURI: faker.helpers.arrayElement([faker.word.sample(), undefined]),
        name: faker.word.sample(),
        network: faker.helpers.arrayElement(Object.values(Networks)),
        symbol: faker.word.sample(),
      },
      type: faker.helpers.arrayElement(Object.values(BalanceTypes)),
      validatorAddress: faker.helpers.arrayElement([
        faker.word.sample(),
        undefined,
      ]),
      validatorAddresses: faker.helpers.arrayElement([
        Array.from(
          { length: faker.number.int({ min: 1, max: 10 }) },
          (_, i) => i + 1,
        ).map(() => faker.word.sample()),
        undefined,
      ]),
    })),
    integrationId: faker.word.sample(),
  }));

export const getYieldControllerYieldBalancesScanMock = () =>
  Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => ({
    balances: Array.from(
      { length: faker.number.int({ min: 1, max: 10 }) },
      (_, i) => i + 1,
    ).map(() => ({
      amount: faker.word.sample(),
      date: faker.helpers.arrayElement([
        `${faker.date.past().toISOString().split('.')[0]}Z`,
        undefined,
      ]),
      pendingActions: Array.from(
        { length: faker.number.int({ min: 1, max: 10 }) },
        (_, i) => i + 1,
      ).map(() => ({
        args: faker.helpers.arrayElement([
          {
            addresses: faker.helpers.arrayElement([
              {
                additionalAddresses: faker.helpers.arrayElement([
                  Array.from(
                    { length: faker.number.int({ min: 1, max: 10 }) },
                    (_, i) => i + 1,
                  ).map(() => ({})),
                  undefined,
                ]),
                address: faker.helpers.arrayElement([
                  {
                    network: faker.helpers.arrayElement([
                      'avalanche-c',
                      'avalanche-c-atomic',
                      'avalanche-p',
                      'arbitrum',
                      'binance',
                      'celo',
                      'ethereum',
                      'ethereum-goerli',
                      'fantom',
                      'harmony',
                      'optimism',
                      'polygon',
                      'akash',
                      'cosmos',
                      'juno',
                      'kava',
                      'osmosis',
                      'stargaze',
                      'onomy',
                      'persistence',
                      'axelar',
                      'quicksilver',
                      'agoric',
                      'band-protocol',
                      'bitsong',
                      'canto',
                      'chihuahua',
                      'comdex',
                      'crescent',
                      'cronos',
                      'cudos',
                      'evmos',
                      'fetch-ai',
                      'gravity-bridge',
                      'injective',
                      'irisnet',
                      'ki-network',
                      'mars-protocol',
                      'nym',
                      'okex-chain',
                      'regen',
                      'secret',
                      'sentinel',
                      'sommelier',
                      'stafi',
                      'stride',
                      'teritori',
                      'tgrade',
                      'umee',
                      'coreum',
                      'desmos',
                      'polkadot',
                      'binancebeacon',
                      'near',
                      'solana',
                      'tezos',
                      'tron',
                    ]),
                    required: faker.datatype.boolean(),
                  },
                  undefined,
                ]),
              },
              undefined,
            ]),
            args: faker.helpers.arrayElement([
              {
                amount: faker.helpers.arrayElement([
                  {
                    maximum: faker.helpers.arrayElement([
                      faker.number.int({ min: undefined, max: undefined }),
                      undefined,
                    ]),
                    minimum: faker.helpers.arrayElement([
                      faker.number.int({ min: undefined, max: undefined }),
                      undefined,
                    ]),
                    required: faker.datatype.boolean(),
                  },
                  undefined,
                ]),
                duration: faker.helpers.arrayElement([
                  {
                    maximum: faker.helpers.arrayElement([
                      faker.number.int({ min: undefined, max: undefined }),
                      undefined,
                    ]),
                    minimum: faker.helpers.arrayElement([
                      faker.number.int({ min: undefined, max: undefined }),
                      undefined,
                    ]),
                    required: faker.datatype.boolean(),
                  },
                  undefined,
                ]),
                nfts: faker.helpers.arrayElement([
                  Array.from(
                    { length: faker.number.int({ min: 1, max: 10 }) },
                    (_, i) => i + 1,
                  ).map(() => ({
                    bakcId: faker.helpers.arrayElement([
                      { required: faker.datatype.boolean() },
                      undefined,
                    ]),
                    baycId: faker.helpers.arrayElement([
                      { required: faker.datatype.boolean() },
                      undefined,
                    ]),
                    maycId: faker.helpers.arrayElement([
                      { required: faker.datatype.boolean() },
                      undefined,
                    ]),
                  })),
                  undefined,
                ]),
                validatorAddress: faker.helpers.arrayElement([
                  { required: faker.datatype.boolean() },
                  undefined,
                ]),
                validatorAddresses: faker.helpers.arrayElement([
                  { required: faker.datatype.boolean() },
                  undefined,
                ]),
              },
              undefined,
            ]),
          },
          undefined,
        ]),
        passthrough: faker.word.sample(),
        type: faker.helpers.arrayElement(Object.values(ActionTypes)),
      })),
      pricePerShare: faker.word.sample(),
      token: {
        address: faker.helpers.arrayElement([faker.word.sample(), undefined]),
        coinGeckoId: faker.helpers.arrayElement([
          faker.word.sample(),
          undefined,
        ]),
        decimals: faker.number.int({ min: undefined, max: undefined }),
        logoURI: faker.helpers.arrayElement([faker.word.sample(), undefined]),
        name: faker.word.sample(),
        network: faker.helpers.arrayElement(Object.values(Networks)),
        symbol: faker.word.sample(),
      },
      type: faker.helpers.arrayElement(Object.values(BalanceTypes)),
      validatorAddress: faker.helpers.arrayElement([
        faker.word.sample(),
        undefined,
      ]),
      validatorAddresses: faker.helpers.arrayElement([
        Array.from(
          { length: faker.number.int({ min: 1, max: 10 }) },
          (_, i) => i + 1,
        ).map(() => faker.word.sample()),
        undefined,
      ]),
    })),
    integrationId: faker.word.sample(),
  }));

export const getYieldControllerGetMyYieldsMock = () => ({
  data: {},
  hasNextPage: faker.datatype.boolean(),
  limit: faker.number.int({ min: undefined, max: undefined }),
  page: faker.number.int({ min: undefined, max: undefined }),
});

export const getYieldControllerFindValidatorsMock = () =>
  Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => ({
    integrationId: faker.word.sample(),
    validators: Array.from(
      { length: faker.number.int({ min: 1, max: 10 }) },
      (_, i) => i + 1,
    ).map(() => ({
      address: faker.word.sample(),
      apr: faker.number.int({ min: undefined, max: undefined }),
      commission: faker.number.int({ min: undefined, max: undefined }),
      image: faker.word.sample(),
      name: faker.word.sample(),
      preferred: faker.datatype.boolean(),
      stakedBalance: faker.word.sample(),
      votingPower: faker.number.int({ min: undefined, max: undefined }),
      website: faker.word.sample(),
    })),
  }));

export const getYieldControllerYieldOpportunityMock = () => ({
  apy: faker.number.int({ min: undefined, max: undefined }),
  args: {
    enter: {
      addresses: faker.helpers.arrayElement([
        {
          additionalAddresses: faker.helpers.arrayElement([
            Array.from(
              { length: faker.number.int({ min: 1, max: 10 }) },
              (_, i) => i + 1,
            ).map(() => ({})),
            undefined,
          ]),
          address: faker.helpers.arrayElement([
            {
              network: faker.helpers.arrayElement([
                'avalanche-c',
                'avalanche-c-atomic',
                'avalanche-p',
                'arbitrum',
                'binance',
                'celo',
                'ethereum',
                'ethereum-goerli',
                'fantom',
                'harmony',
                'optimism',
                'polygon',
                'akash',
                'cosmos',
                'juno',
                'kava',
                'osmosis',
                'stargaze',
                'onomy',
                'persistence',
                'axelar',
                'quicksilver',
                'agoric',
                'band-protocol',
                'bitsong',
                'canto',
                'chihuahua',
                'comdex',
                'crescent',
                'cronos',
                'cudos',
                'evmos',
                'fetch-ai',
                'gravity-bridge',
                'injective',
                'irisnet',
                'ki-network',
                'mars-protocol',
                'nym',
                'okex-chain',
                'regen',
                'secret',
                'sentinel',
                'sommelier',
                'stafi',
                'stride',
                'teritori',
                'tgrade',
                'umee',
                'coreum',
                'desmos',
                'polkadot',
                'binancebeacon',
                'near',
                'solana',
                'tezos',
                'tron',
              ]),
              required: faker.datatype.boolean(),
            },
            undefined,
          ]),
        },
        undefined,
      ]),
    },
    exit: faker.helpers.arrayElement([
      {
        addresses: faker.helpers.arrayElement([
          {
            additionalAddresses: faker.helpers.arrayElement([
              Array.from(
                { length: faker.number.int({ min: 1, max: 10 }) },
                (_, i) => i + 1,
              ).map(() => ({})),
              undefined,
            ]),
            address: faker.helpers.arrayElement([
              {
                network: faker.helpers.arrayElement([
                  'avalanche-c',
                  'avalanche-c-atomic',
                  'avalanche-p',
                  'arbitrum',
                  'binance',
                  'celo',
                  'ethereum',
                  'ethereum-goerli',
                  'fantom',
                  'harmony',
                  'optimism',
                  'polygon',
                  'akash',
                  'cosmos',
                  'juno',
                  'kava',
                  'osmosis',
                  'stargaze',
                  'onomy',
                  'persistence',
                  'axelar',
                  'quicksilver',
                  'agoric',
                  'band-protocol',
                  'bitsong',
                  'canto',
                  'chihuahua',
                  'comdex',
                  'crescent',
                  'cronos',
                  'cudos',
                  'evmos',
                  'fetch-ai',
                  'gravity-bridge',
                  'injective',
                  'irisnet',
                  'ki-network',
                  'mars-protocol',
                  'nym',
                  'okex-chain',
                  'regen',
                  'secret',
                  'sentinel',
                  'sommelier',
                  'stafi',
                  'stride',
                  'teritori',
                  'tgrade',
                  'umee',
                  'coreum',
                  'desmos',
                  'polkadot',
                  'binancebeacon',
                  'near',
                  'solana',
                  'tezos',
                  'tron',
                ]),
                required: faker.datatype.boolean(),
              },
              undefined,
            ]),
          },
          undefined,
        ]),
      },
      undefined,
    ]),
  },
  id: faker.word.sample(),
  isAvailable: faker.datatype.boolean(),
  metadata: {
    cooldownPeriod: faker.helpers.arrayElement([
      { days: faker.number.int({ min: undefined, max: undefined }) },
      undefined,
    ]),
    defaultValidator: faker.helpers.arrayElement([
      faker.word.sample(),
      undefined,
    ]),
    description: faker.word.sample(),
    documentation: faker.word.sample(),
    fee: { enabled: faker.datatype.boolean() },
    gasFeeToken: {
      address: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      coinGeckoId: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      decimals: faker.number.int({ min: undefined, max: undefined }),
      logoURI: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      name: faker.word.sample(),
      network: faker.helpers.arrayElement(Object.values(Networks)),
      symbol: faker.word.sample(),
    },
    logoURI: faker.word.sample(),
    minimumStake: faker.helpers.arrayElement([
      faker.number.int({ min: undefined, max: undefined }),
      undefined,
    ]),
    name: faker.word.sample(),
    provider: faker.helpers.arrayElement([
      {
        description: faker.word.sample(),
        externalLink: faker.word.sample(),
        id: faker.helpers.arrayElement(Object.values(YieldProviders)),
        logoURI: faker.word.sample(),
        name: faker.word.sample(),
      },
      undefined,
    ]),
    revshare: { enabled: faker.datatype.boolean() },
    rewardClaiming: faker.helpers.arrayElement(Object.values(RewardClaiming)),
    rewardSchedule: faker.helpers.arrayElement(Object.values(RewardSchedule)),
    rewardTokens: faker.helpers.arrayElement([
      Array.from(
        { length: faker.number.int({ min: 1, max: 10 }) },
        (_, i) => i + 1,
      ).map(() => ({
        address: faker.helpers.arrayElement([faker.word.sample(), undefined]),
        coinGeckoId: faker.helpers.arrayElement([
          faker.word.sample(),
          undefined,
        ]),
        decimals: faker.number.int({ min: undefined, max: undefined }),
        logoURI: faker.helpers.arrayElement([faker.word.sample(), undefined]),
        name: faker.word.sample(),
        network: faker.helpers.arrayElement(Object.values(Networks)),
        symbol: faker.word.sample(),
      })),
      undefined,
    ]),
    supportsLedgerWalletApi: faker.helpers.arrayElement([
      faker.datatype.boolean(),
      undefined,
    ]),
    supportsMultipleValidators: faker.helpers.arrayElement([
      faker.datatype.boolean(),
      undefined,
    ]),
    token: {
      address: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      coinGeckoId: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      decimals: faker.number.int({ min: undefined, max: undefined }),
      logoURI: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      name: faker.word.sample(),
      network: faker.helpers.arrayElement(Object.values(Networks)),
      symbol: faker.word.sample(),
    },
    type: faker.helpers.arrayElement(Object.values(YieldType)),
    warmupPeriod: {
      days: faker.number.int({ min: undefined, max: undefined }),
    },
    withdrawPeriod: faker.helpers.arrayElement([
      { days: faker.number.int({ min: undefined, max: undefined }) },
      undefined,
    ]),
  },
  status: { enter: faker.datatype.boolean(), exit: faker.datatype.boolean() },
  token: {
    address: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    coinGeckoId: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    decimals: faker.number.int({ min: undefined, max: undefined }),
    logoURI: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    name: faker.word.sample(),
    network: faker.helpers.arrayElement(Object.values(Networks)),
    symbol: faker.word.sample(),
  },
  validators: Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => ({
    address: faker.word.sample(),
    apr: faker.number.int({ min: undefined, max: undefined }),
    commission: faker.number.int({ min: undefined, max: undefined }),
    image: faker.word.sample(),
    name: faker.word.sample(),
    preferred: faker.datatype.boolean(),
    stakedBalance: faker.word.sample(),
    votingPower: faker.number.int({ min: undefined, max: undefined }),
    website: faker.word.sample(),
  })),
});

export const getYieldControllerGetValidatorsMock = () =>
  Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => ({
    address: faker.word.sample(),
    apr: faker.number.int({ min: undefined, max: undefined }),
    commission: faker.number.int({ min: undefined, max: undefined }),
    image: faker.word.sample(),
    name: faker.word.sample(),
    preferred: faker.datatype.boolean(),
    stakedBalance: faker.word.sample(),
    votingPower: faker.number.int({ min: undefined, max: undefined }),
    website: faker.word.sample(),
  }));

export const getYieldControllerGetSingleYieldBalancesMock = () =>
  Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => ({
    amount: faker.word.sample(),
    date: faker.helpers.arrayElement([
      `${faker.date.past().toISOString().split('.')[0]}Z`,
      undefined,
    ]),
    pendingActions: Array.from(
      { length: faker.number.int({ min: 1, max: 10 }) },
      (_, i) => i + 1,
    ).map(() => ({
      args: faker.helpers.arrayElement([
        {
          addresses: faker.helpers.arrayElement([
            {
              additionalAddresses: faker.helpers.arrayElement([
                Array.from(
                  { length: faker.number.int({ min: 1, max: 10 }) },
                  (_, i) => i + 1,
                ).map(() => ({})),
                undefined,
              ]),
              address: faker.helpers.arrayElement([
                {
                  network: faker.helpers.arrayElement([
                    'avalanche-c',
                    'avalanche-c-atomic',
                    'avalanche-p',
                    'arbitrum',
                    'binance',
                    'celo',
                    'ethereum',
                    'ethereum-goerli',
                    'fantom',
                    'harmony',
                    'optimism',
                    'polygon',
                    'akash',
                    'cosmos',
                    'juno',
                    'kava',
                    'osmosis',
                    'stargaze',
                    'onomy',
                    'persistence',
                    'axelar',
                    'quicksilver',
                    'agoric',
                    'band-protocol',
                    'bitsong',
                    'canto',
                    'chihuahua',
                    'comdex',
                    'crescent',
                    'cronos',
                    'cudos',
                    'evmos',
                    'fetch-ai',
                    'gravity-bridge',
                    'injective',
                    'irisnet',
                    'ki-network',
                    'mars-protocol',
                    'nym',
                    'okex-chain',
                    'regen',
                    'secret',
                    'sentinel',
                    'sommelier',
                    'stafi',
                    'stride',
                    'teritori',
                    'tgrade',
                    'umee',
                    'coreum',
                    'desmos',
                    'polkadot',
                    'binancebeacon',
                    'near',
                    'solana',
                    'tezos',
                    'tron',
                  ]),
                  required: faker.datatype.boolean(),
                },
                undefined,
              ]),
            },
            undefined,
          ]),
          args: faker.helpers.arrayElement([
            {
              amount: faker.helpers.arrayElement([
                {
                  maximum: faker.helpers.arrayElement([
                    faker.number.int({ min: undefined, max: undefined }),
                    undefined,
                  ]),
                  minimum: faker.helpers.arrayElement([
                    faker.number.int({ min: undefined, max: undefined }),
                    undefined,
                  ]),
                  required: faker.datatype.boolean(),
                },
                undefined,
              ]),
              duration: faker.helpers.arrayElement([
                {
                  maximum: faker.helpers.arrayElement([
                    faker.number.int({ min: undefined, max: undefined }),
                    undefined,
                  ]),
                  minimum: faker.helpers.arrayElement([
                    faker.number.int({ min: undefined, max: undefined }),
                    undefined,
                  ]),
                  required: faker.datatype.boolean(),
                },
                undefined,
              ]),
              nfts: faker.helpers.arrayElement([
                Array.from(
                  { length: faker.number.int({ min: 1, max: 10 }) },
                  (_, i) => i + 1,
                ).map(() => ({
                  bakcId: faker.helpers.arrayElement([
                    { required: faker.datatype.boolean() },
                    undefined,
                  ]),
                  baycId: faker.helpers.arrayElement([
                    { required: faker.datatype.boolean() },
                    undefined,
                  ]),
                  maycId: faker.helpers.arrayElement([
                    { required: faker.datatype.boolean() },
                    undefined,
                  ]),
                })),
                undefined,
              ]),
              validatorAddress: faker.helpers.arrayElement([
                { required: faker.datatype.boolean() },
                undefined,
              ]),
              validatorAddresses: faker.helpers.arrayElement([
                { required: faker.datatype.boolean() },
                undefined,
              ]),
            },
            undefined,
          ]),
        },
        undefined,
      ]),
      passthrough: faker.word.sample(),
      type: faker.helpers.arrayElement(Object.values(ActionTypes)),
    })),
    pricePerShare: faker.word.sample(),
    token: {
      address: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      coinGeckoId: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      decimals: faker.number.int({ min: undefined, max: undefined }),
      logoURI: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      name: faker.word.sample(),
      network: faker.helpers.arrayElement(Object.values(Networks)),
      symbol: faker.word.sample(),
    },
    type: faker.helpers.arrayElement(Object.values(BalanceTypes)),
    validatorAddress: faker.helpers.arrayElement([
      faker.word.sample(),
      undefined,
    ]),
    validatorAddresses: faker.helpers.arrayElement([
      Array.from(
        { length: faker.number.int({ min: 1, max: 10 }) },
        (_, i) => i + 1,
      ).map(() => faker.word.sample()),
      undefined,
    ]),
  }));

export const getStakeKitMSW = () => [
  http.get('*/v1/actions/:actionId', async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(getActionControllerGetActionMock()),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }),
  http.post('*/v1/actions/enter', async () => {
    await delay(1000);
    return new HttpResponse(JSON.stringify(getActionControllerEnterMock()), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),
  http.post('*/v1/actions/exit', async () => {
    await delay(1000);
    return new HttpResponse(JSON.stringify(getActionControllerExitMock()), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),
  http.post('*/v1/actions/pending', async () => {
    await delay(1000);
    return new HttpResponse(JSON.stringify(getActionControllerPendingMock()), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),
  http.get('*/v1/transactions/:transactionId', async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(getTransactionControllerGetTransactionMock()),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }),
  http.patch('*/v1/transactions/:transactionId', async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(getTransactionControllerConstructMock()),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }),
  http.post('*/v1/transactions/:transactionId/submit', async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(getTransactionControllerSubmitMock()),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }),
  http.post('*/v1/transactions/:transactionId/submit_hash', async () => {
    await delay(1000);
    return new HttpResponse(null, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),
  http.get('*/v1/transactions/:transactionId/status', async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(getTransactionControllerGetTransactionStatusFromIdMock()),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }),
  http.get('*/v1/transactions/gas/:network', async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(getTransactionControllerGetGasForNetworkMock()),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }),
  http.get('*/v1/tokens', async () => {
    await delay(1000);
    return new HttpResponse(JSON.stringify(getTokenControllerGetTokensMock()), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),
  http.post('*/v1/tokens/prices', async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(getTokenControllerGetTokenPricesMock()),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }),
  http.post('*/v1/tokens/balances', async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(getTokenControllerGetTokenBalancesMock()),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }),
  http.post('*/v1/tokens/balances/scan', async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(getTokenControllerTokenBalancesScanMock()),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }),
  http.get('*/v1/yields', async () => {
    await delay(1000);
    return new HttpResponse(JSON.stringify(getYieldControllerYieldsMock()), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),
  http.post('*/v1/yields/balances', async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(getYieldControllerGetMultipleYieldBalancesMock()),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }),
  http.post('*/v1/yields/balances/scan', async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(getYieldControllerYieldBalancesScanMock()),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }),
  http.get('*/v1/yields/enabled', async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(getYieldControllerGetMyYieldsMock()),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }),
  http.get('*/v1/yields/enabled/networks', async () => {
    await delay(1000);
    return new HttpResponse(null, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }),
  http.get('*/v1/yields/validators', async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(getYieldControllerFindValidatorsMock()),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }),
  http.get('*/v1/yields/:integrationId', async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(getYieldControllerYieldOpportunityMock()),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }),
  http.get('*/v1/yields/:integrationId/validators', async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(getYieldControllerGetValidatorsMock()),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }),
  http.post('*/v1/yields/:integrationId/balances', async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(getYieldControllerGetSingleYieldBalancesMock()),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  }),
];

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
  RewardTypes,
  TransactionStatus,
  TransactionType,
  ValidatorStatusTypes,
  YieldProviders,
  YieldType,
} from './schemas';
import type {
  ActionDto,
  BalanceResponseDto,
  GasEstimateDto,
  GasForNetworkResponseDto,
  PriceResponseDto,
  SubmitResponseDto,
  TokenBalanceScanResponseDto,
  TokenWithAvailableYieldsDto,
  TransactionDto,
  TransactionStatusResponseDto,
  TransactionVerificationMessageDto,
  ValidatorDto,
  ValidatorSearchResultDto,
  YieldBalanceDto,
  YieldBalancesWithIntegrationIdDto,
  YieldDto,
  YieldGetMyYields200,
  YieldYields200,
} from './schemas';

export const getActionControllerGetActionResponseMock = (
  overrideResponse: any = {},
): ActionDto => ({
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
        isPoints: faker.helpers.arrayElement([
          faker.datatype.boolean(),
          undefined,
        ]),
        logoURI: faker.helpers.arrayElement([faker.word.sample(), undefined]),
        name: faker.word.sample(),
        network: faker.helpers.arrayElement(Object.values(Networks)),
        symbol: faker.word.sample(),
        ...overrideResponse,
      },
      ...overrideResponse,
    },
    hash: faker.helpers.arrayElement([faker.word.sample(), null]),
    id: faker.word.sample(),
    isMessage: faker.datatype.boolean(),
    ledgerHwAppId: faker.helpers.arrayElement([faker.word.sample(), null]),
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
    ...overrideResponse,
  })),
  type: faker.helpers.arrayElement(Object.values(ActionTypes)),
  validatorAddress: faker.helpers.arrayElement([faker.word.sample(), null]),
  validatorAddresses: Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => faker.word.sample()),
  ...overrideResponse,
});

export const getActionControllerGetGasEstimateResponseMock = (
  overrideResponse: any = {},
): GasEstimateDto => ({
  amount: faker.helpers.arrayElement([faker.word.sample(), null]),
  gasLimit: faker.helpers.arrayElement([faker.word.sample(), undefined]),
  token: {
    address: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    coinGeckoId: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    decimals: faker.number.int({ min: undefined, max: undefined }),
    isPoints: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
    logoURI: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    name: faker.word.sample(),
    network: faker.helpers.arrayElement(Object.values(Networks)),
    symbol: faker.word.sample(),
    ...overrideResponse,
  },
  ...overrideResponse,
});

export const getActionControllerEnterResponseMock = (
  overrideResponse: any = {},
): ActionDto => ({
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
        isPoints: faker.helpers.arrayElement([
          faker.datatype.boolean(),
          undefined,
        ]),
        logoURI: faker.helpers.arrayElement([faker.word.sample(), undefined]),
        name: faker.word.sample(),
        network: faker.helpers.arrayElement(Object.values(Networks)),
        symbol: faker.word.sample(),
        ...overrideResponse,
      },
      ...overrideResponse,
    },
    hash: faker.helpers.arrayElement([faker.word.sample(), null]),
    id: faker.word.sample(),
    isMessage: faker.datatype.boolean(),
    ledgerHwAppId: faker.helpers.arrayElement([faker.word.sample(), null]),
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
    ...overrideResponse,
  })),
  type: faker.helpers.arrayElement(Object.values(ActionTypes)),
  validatorAddress: faker.helpers.arrayElement([faker.word.sample(), null]),
  validatorAddresses: Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => faker.word.sample()),
  ...overrideResponse,
});

export const getActionControllerExitResponseMock = (
  overrideResponse: any = {},
): ActionDto => ({
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
        isPoints: faker.helpers.arrayElement([
          faker.datatype.boolean(),
          undefined,
        ]),
        logoURI: faker.helpers.arrayElement([faker.word.sample(), undefined]),
        name: faker.word.sample(),
        network: faker.helpers.arrayElement(Object.values(Networks)),
        symbol: faker.word.sample(),
        ...overrideResponse,
      },
      ...overrideResponse,
    },
    hash: faker.helpers.arrayElement([faker.word.sample(), null]),
    id: faker.word.sample(),
    isMessage: faker.datatype.boolean(),
    ledgerHwAppId: faker.helpers.arrayElement([faker.word.sample(), null]),
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
    ...overrideResponse,
  })),
  type: faker.helpers.arrayElement(Object.values(ActionTypes)),
  validatorAddress: faker.helpers.arrayElement([faker.word.sample(), null]),
  validatorAddresses: Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => faker.word.sample()),
  ...overrideResponse,
});

export const getActionControllerPendingResponseMock = (
  overrideResponse: any = {},
): ActionDto => ({
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
        isPoints: faker.helpers.arrayElement([
          faker.datatype.boolean(),
          undefined,
        ]),
        logoURI: faker.helpers.arrayElement([faker.word.sample(), undefined]),
        name: faker.word.sample(),
        network: faker.helpers.arrayElement(Object.values(Networks)),
        symbol: faker.word.sample(),
        ...overrideResponse,
      },
      ...overrideResponse,
    },
    hash: faker.helpers.arrayElement([faker.word.sample(), null]),
    id: faker.word.sample(),
    isMessage: faker.datatype.boolean(),
    ledgerHwAppId: faker.helpers.arrayElement([faker.word.sample(), null]),
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
    ...overrideResponse,
  })),
  type: faker.helpers.arrayElement(Object.values(ActionTypes)),
  validatorAddress: faker.helpers.arrayElement([faker.word.sample(), null]),
  validatorAddresses: Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => faker.word.sample()),
  ...overrideResponse,
});

export const getActionControllerEnterGasEstimationResponseMock = (
  overrideResponse: any = {},
): GasEstimateDto => ({
  amount: faker.helpers.arrayElement([faker.word.sample(), null]),
  gasLimit: faker.helpers.arrayElement([faker.word.sample(), undefined]),
  token: {
    address: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    coinGeckoId: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    decimals: faker.number.int({ min: undefined, max: undefined }),
    isPoints: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
    logoURI: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    name: faker.word.sample(),
    network: faker.helpers.arrayElement(Object.values(Networks)),
    symbol: faker.word.sample(),
    ...overrideResponse,
  },
  ...overrideResponse,
});

export const getActionControllerExitGasEstimateResponseMock = (
  overrideResponse: any = {},
): GasEstimateDto => ({
  amount: faker.helpers.arrayElement([faker.word.sample(), null]),
  gasLimit: faker.helpers.arrayElement([faker.word.sample(), undefined]),
  token: {
    address: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    coinGeckoId: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    decimals: faker.number.int({ min: undefined, max: undefined }),
    isPoints: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
    logoURI: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    name: faker.word.sample(),
    network: faker.helpers.arrayElement(Object.values(Networks)),
    symbol: faker.word.sample(),
    ...overrideResponse,
  },
  ...overrideResponse,
});

export const getActionControllerPendingGasEstimateResponseMock = (
  overrideResponse: any = {},
): GasEstimateDto => ({
  amount: faker.helpers.arrayElement([faker.word.sample(), null]),
  gasLimit: faker.helpers.arrayElement([faker.word.sample(), undefined]),
  token: {
    address: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    coinGeckoId: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    decimals: faker.number.int({ min: undefined, max: undefined }),
    isPoints: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
    logoURI: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    name: faker.word.sample(),
    network: faker.helpers.arrayElement(Object.values(Networks)),
    symbol: faker.word.sample(),
    ...overrideResponse,
  },
  ...overrideResponse,
});

export const getTransactionControllerGetTransactionResponseMock = (
  overrideResponse: any = {},
): TransactionDto => ({
  error: faker.helpers.arrayElement([faker.word.sample(), null]),
  explorerUrl: faker.helpers.arrayElement([faker.word.sample(), null]),
  gasEstimate: {
    amount: faker.helpers.arrayElement([faker.word.sample(), null]),
    gasLimit: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    token: {
      address: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      coinGeckoId: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      decimals: faker.number.int({ min: undefined, max: undefined }),
      isPoints: faker.helpers.arrayElement([
        faker.datatype.boolean(),
        undefined,
      ]),
      logoURI: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      name: faker.word.sample(),
      network: faker.helpers.arrayElement(Object.values(Networks)),
      symbol: faker.word.sample(),
      ...overrideResponse,
    },
    ...overrideResponse,
  },
  hash: faker.helpers.arrayElement([faker.word.sample(), null]),
  id: faker.word.sample(),
  isMessage: faker.datatype.boolean(),
  ledgerHwAppId: faker.helpers.arrayElement([faker.word.sample(), null]),
  network: faker.helpers.arrayElement(Object.values(Networks)),
  signedTransaction: faker.helpers.arrayElement([faker.word.sample(), null]),
  stakeId: faker.word.sample(),
  status: faker.helpers.arrayElement(Object.values(TransactionStatus)),
  stepIndex: faker.number.int({ min: undefined, max: undefined }),
  type: faker.helpers.arrayElement(Object.values(TransactionType)),
  unsignedTransaction: faker.helpers.arrayElement([faker.word.sample(), null]),
  ...overrideResponse,
});

export const getTransactionControllerConstructResponseMock = (
  overrideResponse: any = {},
): TransactionDto => ({
  error: faker.helpers.arrayElement([faker.word.sample(), null]),
  explorerUrl: faker.helpers.arrayElement([faker.word.sample(), null]),
  gasEstimate: {
    amount: faker.helpers.arrayElement([faker.word.sample(), null]),
    gasLimit: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    token: {
      address: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      coinGeckoId: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      decimals: faker.number.int({ min: undefined, max: undefined }),
      isPoints: faker.helpers.arrayElement([
        faker.datatype.boolean(),
        undefined,
      ]),
      logoURI: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      name: faker.word.sample(),
      network: faker.helpers.arrayElement(Object.values(Networks)),
      symbol: faker.word.sample(),
      ...overrideResponse,
    },
    ...overrideResponse,
  },
  hash: faker.helpers.arrayElement([faker.word.sample(), null]),
  id: faker.word.sample(),
  isMessage: faker.datatype.boolean(),
  ledgerHwAppId: faker.helpers.arrayElement([faker.word.sample(), null]),
  network: faker.helpers.arrayElement(Object.values(Networks)),
  signedTransaction: faker.helpers.arrayElement([faker.word.sample(), null]),
  stakeId: faker.word.sample(),
  status: faker.helpers.arrayElement(Object.values(TransactionStatus)),
  stepIndex: faker.number.int({ min: undefined, max: undefined }),
  type: faker.helpers.arrayElement(Object.values(TransactionType)),
  unsignedTransaction: faker.helpers.arrayElement([faker.word.sample(), null]),
  ...overrideResponse,
});

export const getTransactionControllerSubmitResponseMock = (
  overrideResponse: any = {},
): SubmitResponseDto => ({
  link: faker.word.sample(),
  transactionHash: faker.word.sample(),
  ...overrideResponse,
});

export const getTransactionControllerGetTransactionStatusFromIdResponseMock = (
  overrideResponse: any = {},
): TransactionStatusResponseDto => ({
  blockNumber: faker.helpers.arrayElement([faker.word.sample(), undefined]),
  hash: faker.word.sample(),
  network: faker.helpers.arrayElement(Object.values(Networks)),
  raw: {},
  status: faker.helpers.arrayElement(Object.values(TransactionStatus)),
  url: faker.word.sample(),
  ...overrideResponse,
});

export const getTransactionControllerGetGasForNetworkResponseMock = (
  overrideResponse: any = {},
): GasForNetworkResponseDto => ({
  customisable: faker.datatype.boolean(),
  modes: {
    denom: faker.word.sample(),
    values: Array.from(
      { length: faker.number.int({ min: 1, max: 10 }) },
      (_, i) => i + 1,
    ).map(() => ({
      gasArgs: faker.helpers.arrayElement([
        { gasPrice: faker.word.sample(), ...overrideResponse },
        {
          maxFeePerGas: faker.word.sample(),
          maxPriorityFeePerGas: faker.word.sample(),
          type: faker.number.int({ min: undefined, max: undefined }),
          ...overrideResponse,
        },
        { ...overrideResponse },
      ]),
      name: faker.helpers.arrayElement(Object.values(GasMode)),
      value: faker.word.sample(),
      ...overrideResponse,
    })),
    ...overrideResponse,
  },
  ...overrideResponse,
});

export const getTransactionControllerGetTransactionStatusByNetworkAndHashResponseMock =
  (overrideResponse: any = {}): TransactionStatusResponseDto => ({
    blockNumber: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    hash: faker.word.sample(),
    network: faker.helpers.arrayElement(Object.values(Networks)),
    raw: {},
    status: faker.helpers.arrayElement(Object.values(TransactionStatus)),
    url: faker.word.sample(),
    ...overrideResponse,
  });

export const getTransactionControllerGetTransactionVerificationMessageForNetworkResponseMock =
  (overrideResponse: any = {}): TransactionVerificationMessageDto => ({
    message: faker.word.sample(),
    ...overrideResponse,
  });

export const getTokenControllerGetTokensResponseMock = (
  overrideResponse: any = {},
): TokenWithAvailableYieldsDto[] =>
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
      isPoints: faker.helpers.arrayElement([
        faker.datatype.boolean(),
        undefined,
      ]),
      logoURI: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      name: faker.word.sample(),
      network: faker.helpers.arrayElement(Object.values(Networks)),
      symbol: faker.word.sample(),
      ...overrideResponse,
    },
    ...overrideResponse,
  }));

export const getTokenControllerGetTokenPricesResponseMock = (
  overrideResponse: any = {},
): PriceResponseDto => ({ ...overrideResponse });

export const getTokenControllerGetTokenBalancesResponseMock = (
  overrideResponse: any = {},
): BalanceResponseDto[] =>
  Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => ({
    amount: faker.word.sample(),
    token: {
      address: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      coinGeckoId: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      decimals: faker.number.int({ min: undefined, max: undefined }),
      isPoints: faker.helpers.arrayElement([
        faker.datatype.boolean(),
        undefined,
      ]),
      logoURI: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      name: faker.word.sample(),
      network: faker.helpers.arrayElement(Object.values(Networks)),
      symbol: faker.word.sample(),
      ...overrideResponse,
    },
    ...overrideResponse,
  }));

export const getTokenControllerTokenBalancesScanResponseMock = (
  overrideResponse: any = {},
): TokenBalanceScanResponseDto[] =>
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
      isPoints: faker.helpers.arrayElement([
        faker.datatype.boolean(),
        undefined,
      ]),
      logoURI: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      name: faker.word.sample(),
      network: faker.helpers.arrayElement(Object.values(Networks)),
      symbol: faker.word.sample(),
      ...overrideResponse,
    },
    ...overrideResponse,
  }));

export const getYieldControllerYieldsResponseMock = (
  overrideResponse: any = {},
): YieldYields200 => ({
  data: {},
  hasNextPage: faker.datatype.boolean(),
  limit: faker.number.int({ min: undefined, max: undefined }),
  page: faker.number.int({ min: undefined, max: undefined }),
  ...overrideResponse,
  ...overrideResponse,
});

export const getYieldControllerGetMultipleYieldBalancesResponseMock = (
  overrideResponse: any = {},
): YieldBalancesWithIntegrationIdDto[] =>
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
      groupId: faker.string.uuid(),
      label: faker.helpers.arrayElement([
        { params: {}, type: faker.word.sample(), ...overrideResponse },
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
                  ).map(() => ({ ...overrideResponse })),
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
                      'ethereum-holesky',
                      'fantom',
                      'harmony',
                      'optimism',
                      'polygon',
                      'gnosis',
                      'moonriver',
                      'okc',
                      'zksync',
                      'viction',
                      'agoric',
                      'akash',
                      'axelar',
                      'band-protocol',
                      'bitsong',
                      'canto',
                      'chihuahua',
                      'comdex',
                      'coreum',
                      'cosmos',
                      'crescent',
                      'cronos',
                      'cudos',
                      'desmos',
                      'dydx',
                      'evmos',
                      'fetch-ai',
                      'gravity-bridge',
                      'injective',
                      'irisnet',
                      'juno',
                      'kava',
                      'ki-network',
                      'mars-protocol',
                      'nym',
                      'okex-chain',
                      'onomy',
                      'osmosis',
                      'persistence',
                      'quicksilver',
                      'regen',
                      'secret',
                      'sentinel',
                      'sommelier',
                      'stafi',
                      'stargaze',
                      'stride',
                      'teritori',
                      'tgrade',
                      'umee',
                      'polkadot',
                      'kusama',
                      'westend',
                      'binancebeacon',
                      'near',
                      'solana',
                      'tezos',
                      'tron',
                    ] as const),
                    required: faker.datatype.boolean(),
                    ...overrideResponse,
                  },
                  undefined,
                ]),
                ...overrideResponse,
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
                    ...overrideResponse,
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
                    ...overrideResponse,
                  },
                  undefined,
                ]),
                nfts: faker.helpers.arrayElement([
                  Array.from(
                    { length: faker.number.int({ min: 1, max: 10 }) },
                    (_, i) => i + 1,
                  ).map(() => ({
                    bakcId: faker.helpers.arrayElement([
                      {
                        required: faker.datatype.boolean(),
                        ...overrideResponse,
                      },
                      undefined,
                    ]),
                    baycId: faker.helpers.arrayElement([
                      {
                        required: faker.datatype.boolean(),
                        ...overrideResponse,
                      },
                      undefined,
                    ]),
                    maycId: faker.helpers.arrayElement([
                      {
                        required: faker.datatype.boolean(),
                        ...overrideResponse,
                      },
                      undefined,
                    ]),
                    ...overrideResponse,
                  })),
                  undefined,
                ]),
                signatureVerification: faker.helpers.arrayElement([
                  { required: faker.datatype.boolean(), ...overrideResponse },
                  undefined,
                ]),
                tronResource: faker.helpers.arrayElement([
                  {
                    options: Array.from(
                      { length: faker.number.int({ min: 1, max: 10 }) },
                      (_, i) => i + 1,
                    ).map(() => faker.word.sample()),
                    required: faker.datatype.boolean(),
                    ...overrideResponse,
                  },
                  undefined,
                ]),
                validatorAddress: faker.helpers.arrayElement([
                  { required: faker.datatype.boolean(), ...overrideResponse },
                  undefined,
                ]),
                validatorAddresses: faker.helpers.arrayElement([
                  { required: faker.datatype.boolean(), ...overrideResponse },
                  undefined,
                ]),
                ...overrideResponse,
              },
              undefined,
            ]),
            ...overrideResponse,
          },
          undefined,
        ]),
        passthrough: faker.word.sample(),
        type: faker.helpers.arrayElement(Object.values(ActionTypes)),
        ...overrideResponse,
      })),
      pricePerShare: faker.word.sample(),
      providerId: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      token: {
        address: faker.helpers.arrayElement([faker.word.sample(), undefined]),
        coinGeckoId: faker.helpers.arrayElement([
          faker.word.sample(),
          undefined,
        ]),
        decimals: faker.number.int({ min: undefined, max: undefined }),
        isPoints: faker.helpers.arrayElement([
          faker.datatype.boolean(),
          undefined,
        ]),
        logoURI: faker.helpers.arrayElement([faker.word.sample(), undefined]),
        name: faker.word.sample(),
        network: faker.helpers.arrayElement(Object.values(Networks)),
        symbol: faker.word.sample(),
        ...overrideResponse,
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
      ...overrideResponse,
    })),
    integrationId: faker.word.sample(),
    ...overrideResponse,
  }));

export const getYieldControllerYieldBalancesScanResponseMock = (
  overrideResponse: any = {},
): YieldBalancesWithIntegrationIdDto[] =>
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
      groupId: faker.string.uuid(),
      label: faker.helpers.arrayElement([
        { params: {}, type: faker.word.sample(), ...overrideResponse },
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
                  ).map(() => ({ ...overrideResponse })),
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
                      'ethereum-holesky',
                      'fantom',
                      'harmony',
                      'optimism',
                      'polygon',
                      'gnosis',
                      'moonriver',
                      'okc',
                      'zksync',
                      'viction',
                      'agoric',
                      'akash',
                      'axelar',
                      'band-protocol',
                      'bitsong',
                      'canto',
                      'chihuahua',
                      'comdex',
                      'coreum',
                      'cosmos',
                      'crescent',
                      'cronos',
                      'cudos',
                      'desmos',
                      'dydx',
                      'evmos',
                      'fetch-ai',
                      'gravity-bridge',
                      'injective',
                      'irisnet',
                      'juno',
                      'kava',
                      'ki-network',
                      'mars-protocol',
                      'nym',
                      'okex-chain',
                      'onomy',
                      'osmosis',
                      'persistence',
                      'quicksilver',
                      'regen',
                      'secret',
                      'sentinel',
                      'sommelier',
                      'stafi',
                      'stargaze',
                      'stride',
                      'teritori',
                      'tgrade',
                      'umee',
                      'polkadot',
                      'kusama',
                      'westend',
                      'binancebeacon',
                      'near',
                      'solana',
                      'tezos',
                      'tron',
                    ] as const),
                    required: faker.datatype.boolean(),
                    ...overrideResponse,
                  },
                  undefined,
                ]),
                ...overrideResponse,
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
                    ...overrideResponse,
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
                    ...overrideResponse,
                  },
                  undefined,
                ]),
                nfts: faker.helpers.arrayElement([
                  Array.from(
                    { length: faker.number.int({ min: 1, max: 10 }) },
                    (_, i) => i + 1,
                  ).map(() => ({
                    bakcId: faker.helpers.arrayElement([
                      {
                        required: faker.datatype.boolean(),
                        ...overrideResponse,
                      },
                      undefined,
                    ]),
                    baycId: faker.helpers.arrayElement([
                      {
                        required: faker.datatype.boolean(),
                        ...overrideResponse,
                      },
                      undefined,
                    ]),
                    maycId: faker.helpers.arrayElement([
                      {
                        required: faker.datatype.boolean(),
                        ...overrideResponse,
                      },
                      undefined,
                    ]),
                    ...overrideResponse,
                  })),
                  undefined,
                ]),
                signatureVerification: faker.helpers.arrayElement([
                  { required: faker.datatype.boolean(), ...overrideResponse },
                  undefined,
                ]),
                tronResource: faker.helpers.arrayElement([
                  {
                    options: Array.from(
                      { length: faker.number.int({ min: 1, max: 10 }) },
                      (_, i) => i + 1,
                    ).map(() => faker.word.sample()),
                    required: faker.datatype.boolean(),
                    ...overrideResponse,
                  },
                  undefined,
                ]),
                validatorAddress: faker.helpers.arrayElement([
                  { required: faker.datatype.boolean(), ...overrideResponse },
                  undefined,
                ]),
                validatorAddresses: faker.helpers.arrayElement([
                  { required: faker.datatype.boolean(), ...overrideResponse },
                  undefined,
                ]),
                ...overrideResponse,
              },
              undefined,
            ]),
            ...overrideResponse,
          },
          undefined,
        ]),
        passthrough: faker.word.sample(),
        type: faker.helpers.arrayElement(Object.values(ActionTypes)),
        ...overrideResponse,
      })),
      pricePerShare: faker.word.sample(),
      providerId: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      token: {
        address: faker.helpers.arrayElement([faker.word.sample(), undefined]),
        coinGeckoId: faker.helpers.arrayElement([
          faker.word.sample(),
          undefined,
        ]),
        decimals: faker.number.int({ min: undefined, max: undefined }),
        isPoints: faker.helpers.arrayElement([
          faker.datatype.boolean(),
          undefined,
        ]),
        logoURI: faker.helpers.arrayElement([faker.word.sample(), undefined]),
        name: faker.word.sample(),
        network: faker.helpers.arrayElement(Object.values(Networks)),
        symbol: faker.word.sample(),
        ...overrideResponse,
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
      ...overrideResponse,
    })),
    integrationId: faker.word.sample(),
    ...overrideResponse,
  }));

export const getYieldControllerGetMyYieldsResponseMock = (
  overrideResponse: any = {},
): YieldGetMyYields200 => ({
  data: {},
  hasNextPage: faker.datatype.boolean(),
  limit: faker.number.int({ min: undefined, max: undefined }),
  page: faker.number.int({ min: undefined, max: undefined }),
  ...overrideResponse,
  ...overrideResponse,
});

export const getYieldControllerFindValidatorsResponseMock = (
  overrideResponse: any = {},
): ValidatorSearchResultDto[] =>
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
      apr: faker.helpers.arrayElement([
        faker.number.int({ min: undefined, max: undefined }),
        undefined,
      ]),
      commission: faker.helpers.arrayElement([
        faker.number.int({ min: undefined, max: undefined }),
        undefined,
      ]),
      image: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      name: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      preferred: faker.helpers.arrayElement([
        faker.datatype.boolean(),
        undefined,
      ]),
      providerId: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      stakedBalance: faker.helpers.arrayElement([
        faker.word.sample(),
        undefined,
      ]),
      status: faker.helpers.arrayElement(Object.values(ValidatorStatusTypes)),
      votingPower: faker.helpers.arrayElement([
        faker.number.int({ min: undefined, max: undefined }),
        undefined,
      ]),
      website: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      ...overrideResponse,
    })),
    ...overrideResponse,
  }));

export const getYieldControllerYieldOpportunityResponseMock = (
  overrideResponse: any = {},
): YieldDto => ({
  apy: faker.number.int({ min: undefined, max: undefined }),
  args: {
    enter: {
      addresses: faker.helpers.arrayElement([
        {
          additionalAddresses: faker.helpers.arrayElement([
            Array.from(
              { length: faker.number.int({ min: 1, max: 10 }) },
              (_, i) => i + 1,
            ).map(() => ({ ...overrideResponse })),
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
                'ethereum-holesky',
                'fantom',
                'harmony',
                'optimism',
                'polygon',
                'gnosis',
                'moonriver',
                'okc',
                'zksync',
                'viction',
                'agoric',
                'akash',
                'axelar',
                'band-protocol',
                'bitsong',
                'canto',
                'chihuahua',
                'comdex',
                'coreum',
                'cosmos',
                'crescent',
                'cronos',
                'cudos',
                'desmos',
                'dydx',
                'evmos',
                'fetch-ai',
                'gravity-bridge',
                'injective',
                'irisnet',
                'juno',
                'kava',
                'ki-network',
                'mars-protocol',
                'nym',
                'okex-chain',
                'onomy',
                'osmosis',
                'persistence',
                'quicksilver',
                'regen',
                'secret',
                'sentinel',
                'sommelier',
                'stafi',
                'stargaze',
                'stride',
                'teritori',
                'tgrade',
                'umee',
                'polkadot',
                'kusama',
                'westend',
                'binancebeacon',
                'near',
                'solana',
                'tezos',
                'tron',
              ] as const),
              required: faker.datatype.boolean(),
              ...overrideResponse,
            },
            undefined,
          ]),
          ...overrideResponse,
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
              ...overrideResponse,
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
              ...overrideResponse,
            },
            undefined,
          ]),
          nfts: faker.helpers.arrayElement([
            Array.from(
              { length: faker.number.int({ min: 1, max: 10 }) },
              (_, i) => i + 1,
            ).map(() => ({
              bakcId: faker.helpers.arrayElement([
                { required: faker.datatype.boolean(), ...overrideResponse },
                undefined,
              ]),
              baycId: faker.helpers.arrayElement([
                { required: faker.datatype.boolean(), ...overrideResponse },
                undefined,
              ]),
              maycId: faker.helpers.arrayElement([
                { required: faker.datatype.boolean(), ...overrideResponse },
                undefined,
              ]),
              ...overrideResponse,
            })),
            undefined,
          ]),
          signatureVerification: faker.helpers.arrayElement([
            { required: faker.datatype.boolean(), ...overrideResponse },
            undefined,
          ]),
          tronResource: faker.helpers.arrayElement([
            {
              options: Array.from(
                { length: faker.number.int({ min: 1, max: 10 }) },
                (_, i) => i + 1,
              ).map(() => faker.word.sample()),
              required: faker.datatype.boolean(),
              ...overrideResponse,
            },
            undefined,
          ]),
          validatorAddress: faker.helpers.arrayElement([
            { required: faker.datatype.boolean(), ...overrideResponse },
            undefined,
          ]),
          validatorAddresses: faker.helpers.arrayElement([
            { required: faker.datatype.boolean(), ...overrideResponse },
            undefined,
          ]),
          ...overrideResponse,
        },
        undefined,
      ]),
      ...overrideResponse,
    },
    exit: faker.helpers.arrayElement([
      {
        addresses: faker.helpers.arrayElement([
          {
            additionalAddresses: faker.helpers.arrayElement([
              Array.from(
                { length: faker.number.int({ min: 1, max: 10 }) },
                (_, i) => i + 1,
              ).map(() => ({ ...overrideResponse })),
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
                  'ethereum-holesky',
                  'fantom',
                  'harmony',
                  'optimism',
                  'polygon',
                  'gnosis',
                  'moonriver',
                  'okc',
                  'zksync',
                  'viction',
                  'agoric',
                  'akash',
                  'axelar',
                  'band-protocol',
                  'bitsong',
                  'canto',
                  'chihuahua',
                  'comdex',
                  'coreum',
                  'cosmos',
                  'crescent',
                  'cronos',
                  'cudos',
                  'desmos',
                  'dydx',
                  'evmos',
                  'fetch-ai',
                  'gravity-bridge',
                  'injective',
                  'irisnet',
                  'juno',
                  'kava',
                  'ki-network',
                  'mars-protocol',
                  'nym',
                  'okex-chain',
                  'onomy',
                  'osmosis',
                  'persistence',
                  'quicksilver',
                  'regen',
                  'secret',
                  'sentinel',
                  'sommelier',
                  'stafi',
                  'stargaze',
                  'stride',
                  'teritori',
                  'tgrade',
                  'umee',
                  'polkadot',
                  'kusama',
                  'westend',
                  'binancebeacon',
                  'near',
                  'solana',
                  'tezos',
                  'tron',
                ] as const),
                required: faker.datatype.boolean(),
                ...overrideResponse,
              },
              undefined,
            ]),
            ...overrideResponse,
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
                ...overrideResponse,
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
                ...overrideResponse,
              },
              undefined,
            ]),
            nfts: faker.helpers.arrayElement([
              Array.from(
                { length: faker.number.int({ min: 1, max: 10 }) },
                (_, i) => i + 1,
              ).map(() => ({
                bakcId: faker.helpers.arrayElement([
                  { required: faker.datatype.boolean(), ...overrideResponse },
                  undefined,
                ]),
                baycId: faker.helpers.arrayElement([
                  { required: faker.datatype.boolean(), ...overrideResponse },
                  undefined,
                ]),
                maycId: faker.helpers.arrayElement([
                  { required: faker.datatype.boolean(), ...overrideResponse },
                  undefined,
                ]),
                ...overrideResponse,
              })),
              undefined,
            ]),
            signatureVerification: faker.helpers.arrayElement([
              { required: faker.datatype.boolean(), ...overrideResponse },
              undefined,
            ]),
            tronResource: faker.helpers.arrayElement([
              {
                options: Array.from(
                  { length: faker.number.int({ min: 1, max: 10 }) },
                  (_, i) => i + 1,
                ).map(() => faker.word.sample()),
                required: faker.datatype.boolean(),
                ...overrideResponse,
              },
              undefined,
            ]),
            validatorAddress: faker.helpers.arrayElement([
              { required: faker.datatype.boolean(), ...overrideResponse },
              undefined,
            ]),
            validatorAddresses: faker.helpers.arrayElement([
              { required: faker.datatype.boolean(), ...overrideResponse },
              undefined,
            ]),
            ...overrideResponse,
          },
          undefined,
        ]),
        ...overrideResponse,
      },
      undefined,
    ]),
    ...overrideResponse,
  },
  id: faker.word.sample(),
  isAvailable: faker.datatype.boolean(),
  metadata: {
    cooldownPeriod: faker.helpers.arrayElement([
      {
        days: faker.number.int({ min: undefined, max: undefined }),
        ...overrideResponse,
      },
      undefined,
    ]),
    defaultValidator: faker.helpers.arrayElement([
      faker.word.sample(),
      undefined,
    ]),
    description: faker.word.sample(),
    documentation: faker.word.sample(),
    fee: { enabled: faker.datatype.boolean(), ...overrideResponse },
    gasFeeToken: {
      address: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      coinGeckoId: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      decimals: faker.number.int({ min: undefined, max: undefined }),
      isPoints: faker.helpers.arrayElement([
        faker.datatype.boolean(),
        undefined,
      ]),
      logoURI: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      name: faker.word.sample(),
      network: faker.helpers.arrayElement(Object.values(Networks)),
      symbol: faker.word.sample(),
      ...overrideResponse,
    },
    isIntegrationAggregator: faker.helpers.arrayElement([
      faker.datatype.boolean(),
      undefined,
    ]),
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
        ...overrideResponse,
      },
      undefined,
    ]),
    revshare: { enabled: faker.datatype.boolean(), ...overrideResponse },
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
        isPoints: faker.helpers.arrayElement([
          faker.datatype.boolean(),
          undefined,
        ]),
        logoURI: faker.helpers.arrayElement([faker.word.sample(), undefined]),
        name: faker.word.sample(),
        network: faker.helpers.arrayElement(Object.values(Networks)),
        symbol: faker.word.sample(),
        ...overrideResponse,
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
      isPoints: faker.helpers.arrayElement([
        faker.datatype.boolean(),
        undefined,
      ]),
      logoURI: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      name: faker.word.sample(),
      network: faker.helpers.arrayElement(Object.values(Networks)),
      symbol: faker.word.sample(),
      ...overrideResponse,
    },
    tokens: faker.helpers.arrayElement([
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
        isPoints: faker.helpers.arrayElement([
          faker.datatype.boolean(),
          undefined,
        ]),
        logoURI: faker.helpers.arrayElement([faker.word.sample(), undefined]),
        name: faker.word.sample(),
        network: faker.helpers.arrayElement(Object.values(Networks)),
        symbol: faker.word.sample(),
        ...overrideResponse,
      })),
      undefined,
    ]),
    type: faker.helpers.arrayElement(Object.values(YieldType)),
    warmupPeriod: {
      days: faker.number.int({ min: undefined, max: undefined }),
      ...overrideResponse,
    },
    withdrawPeriod: faker.helpers.arrayElement([
      {
        days: faker.number.int({ min: undefined, max: undefined }),
        ...overrideResponse,
      },
      undefined,
    ]),
    ...overrideResponse,
  },
  rewardRate: faker.number.int({ min: undefined, max: undefined }),
  rewardType: faker.helpers.arrayElement(Object.values(RewardTypes)),
  status: {
    enter: faker.datatype.boolean(),
    exit: faker.datatype.boolean(),
    ...overrideResponse,
  },
  token: {
    address: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    coinGeckoId: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    decimals: faker.number.int({ min: undefined, max: undefined }),
    isPoints: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
    logoURI: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    name: faker.word.sample(),
    network: faker.helpers.arrayElement(Object.values(Networks)),
    symbol: faker.word.sample(),
    ...overrideResponse,
  },
  tokens: Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => ({
    address: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    coinGeckoId: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    decimals: faker.number.int({ min: undefined, max: undefined }),
    isPoints: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
    logoURI: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    name: faker.word.sample(),
    network: faker.helpers.arrayElement(Object.values(Networks)),
    symbol: faker.word.sample(),
    ...overrideResponse,
  })),
  validators: Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => ({
    address: faker.word.sample(),
    apr: faker.helpers.arrayElement([
      faker.number.int({ min: undefined, max: undefined }),
      undefined,
    ]),
    commission: faker.helpers.arrayElement([
      faker.number.int({ min: undefined, max: undefined }),
      undefined,
    ]),
    image: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    name: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    preferred: faker.helpers.arrayElement([
      faker.datatype.boolean(),
      undefined,
    ]),
    providerId: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    stakedBalance: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    status: faker.helpers.arrayElement(Object.values(ValidatorStatusTypes)),
    votingPower: faker.helpers.arrayElement([
      faker.number.int({ min: undefined, max: undefined }),
      undefined,
    ]),
    website: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    ...overrideResponse,
  })),
  ...overrideResponse,
});

export const getYieldControllerGetValidatorsResponseMock = (
  overrideResponse: any = {},
): ValidatorDto[] =>
  Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => ({
    address: faker.word.sample(),
    apr: faker.helpers.arrayElement([
      faker.number.int({ min: undefined, max: undefined }),
      undefined,
    ]),
    commission: faker.helpers.arrayElement([
      faker.number.int({ min: undefined, max: undefined }),
      undefined,
    ]),
    image: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    name: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    preferred: faker.helpers.arrayElement([
      faker.datatype.boolean(),
      undefined,
    ]),
    providerId: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    stakedBalance: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    status: faker.helpers.arrayElement(Object.values(ValidatorStatusTypes)),
    votingPower: faker.helpers.arrayElement([
      faker.number.int({ min: undefined, max: undefined }),
      undefined,
    ]),
    website: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    ...overrideResponse,
  }));

export const getYieldControllerGetSingleYieldBalancesResponseMock = (
  overrideResponse: any = {},
): YieldBalanceDto[] =>
  Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => ({
    amount: faker.word.sample(),
    date: faker.helpers.arrayElement([
      `${faker.date.past().toISOString().split('.')[0]}Z`,
      undefined,
    ]),
    groupId: faker.string.uuid(),
    label: faker.helpers.arrayElement([
      { params: {}, type: faker.word.sample(), ...overrideResponse },
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
                ).map(() => ({ ...overrideResponse })),
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
                    'ethereum-holesky',
                    'fantom',
                    'harmony',
                    'optimism',
                    'polygon',
                    'gnosis',
                    'moonriver',
                    'okc',
                    'zksync',
                    'viction',
                    'agoric',
                    'akash',
                    'axelar',
                    'band-protocol',
                    'bitsong',
                    'canto',
                    'chihuahua',
                    'comdex',
                    'coreum',
                    'cosmos',
                    'crescent',
                    'cronos',
                    'cudos',
                    'desmos',
                    'dydx',
                    'evmos',
                    'fetch-ai',
                    'gravity-bridge',
                    'injective',
                    'irisnet',
                    'juno',
                    'kava',
                    'ki-network',
                    'mars-protocol',
                    'nym',
                    'okex-chain',
                    'onomy',
                    'osmosis',
                    'persistence',
                    'quicksilver',
                    'regen',
                    'secret',
                    'sentinel',
                    'sommelier',
                    'stafi',
                    'stargaze',
                    'stride',
                    'teritori',
                    'tgrade',
                    'umee',
                    'polkadot',
                    'kusama',
                    'westend',
                    'binancebeacon',
                    'near',
                    'solana',
                    'tezos',
                    'tron',
                  ] as const),
                  required: faker.datatype.boolean(),
                  ...overrideResponse,
                },
                undefined,
              ]),
              ...overrideResponse,
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
                  ...overrideResponse,
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
                  ...overrideResponse,
                },
                undefined,
              ]),
              nfts: faker.helpers.arrayElement([
                Array.from(
                  { length: faker.number.int({ min: 1, max: 10 }) },
                  (_, i) => i + 1,
                ).map(() => ({
                  bakcId: faker.helpers.arrayElement([
                    { required: faker.datatype.boolean(), ...overrideResponse },
                    undefined,
                  ]),
                  baycId: faker.helpers.arrayElement([
                    { required: faker.datatype.boolean(), ...overrideResponse },
                    undefined,
                  ]),
                  maycId: faker.helpers.arrayElement([
                    { required: faker.datatype.boolean(), ...overrideResponse },
                    undefined,
                  ]),
                  ...overrideResponse,
                })),
                undefined,
              ]),
              signatureVerification: faker.helpers.arrayElement([
                { required: faker.datatype.boolean(), ...overrideResponse },
                undefined,
              ]),
              tronResource: faker.helpers.arrayElement([
                {
                  options: Array.from(
                    { length: faker.number.int({ min: 1, max: 10 }) },
                    (_, i) => i + 1,
                  ).map(() => faker.word.sample()),
                  required: faker.datatype.boolean(),
                  ...overrideResponse,
                },
                undefined,
              ]),
              validatorAddress: faker.helpers.arrayElement([
                { required: faker.datatype.boolean(), ...overrideResponse },
                undefined,
              ]),
              validatorAddresses: faker.helpers.arrayElement([
                { required: faker.datatype.boolean(), ...overrideResponse },
                undefined,
              ]),
              ...overrideResponse,
            },
            undefined,
          ]),
          ...overrideResponse,
        },
        undefined,
      ]),
      passthrough: faker.word.sample(),
      type: faker.helpers.arrayElement(Object.values(ActionTypes)),
      ...overrideResponse,
    })),
    pricePerShare: faker.word.sample(),
    providerId: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    token: {
      address: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      coinGeckoId: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      decimals: faker.number.int({ min: undefined, max: undefined }),
      isPoints: faker.helpers.arrayElement([
        faker.datatype.boolean(),
        undefined,
      ]),
      logoURI: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      name: faker.word.sample(),
      network: faker.helpers.arrayElement(Object.values(Networks)),
      symbol: faker.word.sample(),
      ...overrideResponse,
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
    ...overrideResponse,
  }));

export const getActionControllerGetActionMockHandler = (
  overrideResponse?: ActionDto,
) => {
  return http.get('*/v1/actions/:actionId', async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse
          ? overrideResponse
          : getActionControllerGetActionResponseMock(),
      ),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  });
};

export const getActionControllerGetGasEstimateMockHandler = (
  overrideResponse?: GasEstimateDto,
) => {
  return http.get('*/v1/actions/:actionId/gas-estimate', async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse
          ? overrideResponse
          : getActionControllerGetGasEstimateResponseMock(),
      ),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  });
};

export const getActionControllerEnterMockHandler = (
  overrideResponse?: ActionDto,
) => {
  return http.post('*/v1/actions/enter', async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse
          ? overrideResponse
          : getActionControllerEnterResponseMock(),
      ),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  });
};

export const getActionControllerExitMockHandler = (
  overrideResponse?: ActionDto,
) => {
  return http.post('*/v1/actions/exit', async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse
          ? overrideResponse
          : getActionControllerExitResponseMock(),
      ),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  });
};

export const getActionControllerPendingMockHandler = (
  overrideResponse?: ActionDto,
) => {
  return http.post('*/v1/actions/pending', async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse
          ? overrideResponse
          : getActionControllerPendingResponseMock(),
      ),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  });
};

export const getActionControllerEnterGasEstimationMockHandler = (
  overrideResponse?: GasEstimateDto,
) => {
  return http.post('*/v1/actions/enter/estimate-gas', async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse
          ? overrideResponse
          : getActionControllerEnterGasEstimationResponseMock(),
      ),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  });
};

export const getActionControllerExitGasEstimateMockHandler = (
  overrideResponse?: GasEstimateDto,
) => {
  return http.post('*/v1/actions/exit/estimate-gas', async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse
          ? overrideResponse
          : getActionControllerExitGasEstimateResponseMock(),
      ),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  });
};

export const getActionControllerPendingGasEstimateMockHandler = (
  overrideResponse?: GasEstimateDto,
) => {
  return http.post('*/v1/actions/pending/estimate-gas', async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse
          ? overrideResponse
          : getActionControllerPendingGasEstimateResponseMock(),
      ),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  });
};

export const getTransactionControllerGetTransactionMockHandler = (
  overrideResponse?: TransactionDto,
) => {
  return http.get('*/v1/transactions/:transactionId', async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse
          ? overrideResponse
          : getTransactionControllerGetTransactionResponseMock(),
      ),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  });
};

export const getTransactionControllerConstructMockHandler = (
  overrideResponse?: TransactionDto,
) => {
  return http.patch('*/v1/transactions/:transactionId', async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse
          ? overrideResponse
          : getTransactionControllerConstructResponseMock(),
      ),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  });
};

export const getTransactionControllerSubmitMockHandler = (
  overrideResponse?: SubmitResponseDto,
) => {
  return http.post('*/v1/transactions/:transactionId/submit', async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse
          ? overrideResponse
          : getTransactionControllerSubmitResponseMock(),
      ),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  });
};

export const getTransactionControllerSubmitHashMockHandler = () => {
  return http.post('*/v1/transactions/:transactionId/submit_hash', async () => {
    await delay(1000);
    return new HttpResponse(null, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });
};

export const getTransactionControllerGetTransactionStatusFromIdMockHandler = (
  overrideResponse?: TransactionStatusResponseDto,
) => {
  return http.get('*/v1/transactions/:transactionId/status', async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse
          ? overrideResponse
          : getTransactionControllerGetTransactionStatusFromIdResponseMock(),
      ),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  });
};

export const getTransactionControllerGetGasForNetworkMockHandler = (
  overrideResponse?: GasForNetworkResponseDto,
) => {
  return http.get('*/v1/transactions/gas/:network', async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse
          ? overrideResponse
          : getTransactionControllerGetGasForNetworkResponseMock(),
      ),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  });
};

export const getTransactionControllerGetTransactionStatusByNetworkAndHashMockHandler =
  (overrideResponse?: TransactionStatusResponseDto) => {
    return http.get('*/v1/transactions/status/:network/:hash', async () => {
      await delay(1000);
      return new HttpResponse(
        JSON.stringify(
          overrideResponse
            ? overrideResponse
            : getTransactionControllerGetTransactionStatusByNetworkAndHashResponseMock(),
        ),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    });
  };

export const getTransactionControllerGetTransactionVerificationMessageForNetworkMockHandler =
  (overrideResponse?: TransactionVerificationMessageDto) => {
    return http.post('*/v1/transactions/verification/:network', async () => {
      await delay(1000);
      return new HttpResponse(
        JSON.stringify(
          overrideResponse
            ? overrideResponse
            : getTransactionControllerGetTransactionVerificationMessageForNetworkResponseMock(),
        ),
        {
          status: 200,
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
    });
  };

export const getTokenControllerGetTokensMockHandler = (
  overrideResponse?: TokenWithAvailableYieldsDto[],
) => {
  return http.get('*/v1/tokens', async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse
          ? overrideResponse
          : getTokenControllerGetTokensResponseMock(),
      ),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  });
};

export const getTokenControllerGetTokenPricesMockHandler = (
  overrideResponse?: PriceResponseDto,
) => {
  return http.post('*/v1/tokens/prices', async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse
          ? overrideResponse
          : getTokenControllerGetTokenPricesResponseMock(),
      ),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  });
};

export const getTokenControllerGetTokenBalancesMockHandler = (
  overrideResponse?: BalanceResponseDto[],
) => {
  return http.post('*/v1/tokens/balances', async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse
          ? overrideResponse
          : getTokenControllerGetTokenBalancesResponseMock(),
      ),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  });
};

export const getTokenControllerTokenBalancesScanMockHandler = (
  overrideResponse?: TokenBalanceScanResponseDto[],
) => {
  return http.post('*/v1/tokens/balances/scan', async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse
          ? overrideResponse
          : getTokenControllerTokenBalancesScanResponseMock(),
      ),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  });
};

export const getYieldControllerYieldsMockHandler = (
  overrideResponse?: YieldYields200,
) => {
  return http.get('*/v1/yields', async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse
          ? overrideResponse
          : getYieldControllerYieldsResponseMock(),
      ),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  });
};

export const getYieldControllerGetMultipleYieldBalancesMockHandler = (
  overrideResponse?: YieldBalancesWithIntegrationIdDto[],
) => {
  return http.post('*/v1/yields/balances', async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse
          ? overrideResponse
          : getYieldControllerGetMultipleYieldBalancesResponseMock(),
      ),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  });
};

export const getYieldControllerYieldBalancesScanMockHandler = (
  overrideResponse?: YieldBalancesWithIntegrationIdDto[],
) => {
  return http.post('*/v1/yields/balances/scan', async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse
          ? overrideResponse
          : getYieldControllerYieldBalancesScanResponseMock(),
      ),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  });
};

export const getYieldControllerGetMyYieldsMockHandler = (
  overrideResponse?: YieldGetMyYields200,
) => {
  return http.get('*/v1/yields/enabled', async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse
          ? overrideResponse
          : getYieldControllerGetMyYieldsResponseMock(),
      ),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  });
};

export const getYieldControllerGetMyNetworksMockHandler = () => {
  return http.get('*/v1/yields/enabled/networks', async () => {
    await delay(1000);
    return new HttpResponse(null, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  });
};

export const getYieldControllerFindValidatorsMockHandler = (
  overrideResponse?: ValidatorSearchResultDto[],
) => {
  return http.get('*/v1/yields/validators', async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse
          ? overrideResponse
          : getYieldControllerFindValidatorsResponseMock(),
      ),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  });
};

export const getYieldControllerYieldOpportunityMockHandler = (
  overrideResponse?: YieldDto,
) => {
  return http.get('*/v1/yields/:integrationId', async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse
          ? overrideResponse
          : getYieldControllerYieldOpportunityResponseMock(),
      ),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  });
};

export const getYieldControllerGetValidatorsMockHandler = (
  overrideResponse?: ValidatorDto[],
) => {
  return http.get('*/v1/yields/:integrationId/validators', async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse
          ? overrideResponse
          : getYieldControllerGetValidatorsResponseMock(),
      ),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  });
};

export const getYieldControllerGetSingleYieldBalancesMockHandler = (
  overrideResponse?: YieldBalanceDto[],
) => {
  return http.post('*/v1/yields/:integrationId/balances', async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse
          ? overrideResponse
          : getYieldControllerGetSingleYieldBalancesResponseMock(),
      ),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
  });
};
export const getStakeKitMock = () => [
  getActionControllerGetActionMockHandler(),
  getActionControllerGetGasEstimateMockHandler(),
  getActionControllerEnterMockHandler(),
  getActionControllerExitMockHandler(),
  getActionControllerPendingMockHandler(),
  getActionControllerEnterGasEstimationMockHandler(),
  getActionControllerExitGasEstimateMockHandler(),
  getActionControllerPendingGasEstimateMockHandler(),
  getTransactionControllerGetTransactionMockHandler(),
  getTransactionControllerConstructMockHandler(),
  getTransactionControllerSubmitMockHandler(),
  getTransactionControllerSubmitHashMockHandler(),
  getTransactionControllerGetTransactionStatusFromIdMockHandler(),
  getTransactionControllerGetGasForNetworkMockHandler(),
  getTransactionControllerGetTransactionStatusByNetworkAndHashMockHandler(),
  getTransactionControllerGetTransactionVerificationMessageForNetworkMockHandler(),
  getTokenControllerGetTokensMockHandler(),
  getTokenControllerGetTokenPricesMockHandler(),
  getTokenControllerGetTokenBalancesMockHandler(),
  getTokenControllerTokenBalancesScanMockHandler(),
  getYieldControllerYieldsMockHandler(),
  getYieldControllerGetMultipleYieldBalancesMockHandler(),
  getYieldControllerYieldBalancesScanMockHandler(),
  getYieldControllerGetMyYieldsMockHandler(),
  getYieldControllerGetMyNetworksMockHandler(),
  getYieldControllerFindValidatorsMockHandler(),
  getYieldControllerYieldOpportunityMockHandler(),
  getYieldControllerGetValidatorsMockHandler(),
  getYieldControllerGetSingleYieldBalancesMockHandler(),
];

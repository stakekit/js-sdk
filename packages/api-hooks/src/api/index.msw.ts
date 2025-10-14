import { faker } from '@faker-js/faker';
import { HttpResponse, delay, http } from 'msw';
import {
  ActionStatus,
  ActionTypes,
  BalanceTypes,
  CommissionAppliesTo,
  ERCStandards,
  FeeConfigurationStatus,
  GasMode,
  HealthStatus,
  Networks,
  RewardClaiming,
  RewardSchedule,
  RewardTypes,
  TransactionFormat,
  TransactionStatus,
  TransactionType,
  TvlLevel,
  ValidatorStatusTypes,
  YieldProviders,
  YieldType,
} from './schemas';
import type {
  ActionDto,
  ActionGasEstimateDto,
  ActionList200,
  BalanceResponseDto,
  FeeConfigurationDto,
  GasForNetworkResponseDto,
  HealthStatusDto,
  PriceResponseDto,
  ReportProjectGetDailyPerformance200,
  ReportProjectGetDailyRevenues200,
  ReportProjectGetRewards200,
  ReportProjectList200,
  SubmitResponseDto,
  TokenWithAvailableYieldsDto,
  TransactionDto,
  TransactionStatusResponseDto,
  TransactionVerificationMessageDto,
  ValidatorSearchResultDto,
  YieldBalanceDto,
  YieldBalancesWithIntegrationIdDto,
  YieldDto,
  YieldGetMyYields200,
  YieldRewardsSummaryResponseDto,
  YieldV2GetFeeConfigurations200,
  YieldV2Yields200,
} from './schemas';

export const getHealthControllerHealthV2ResponseMock = (
  overrideResponse: any = {},
): HealthStatusDto => ({
  db: faker.helpers.arrayElement(Object.values(HealthStatus)),
  status: faker.helpers.arrayElement(Object.values(HealthStatus)),
  ...overrideResponse,
});

export const getReportProjectControllerListResponseMock = (
  overrideResponse: any = {},
): ReportProjectList200 => ({
  data: Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => ({})),
  hasNextPage: faker.datatype.boolean(),
  limit: faker.number.int({ min: undefined, max: undefined }),
  page: faker.number.int({ min: undefined, max: undefined }),
  ...overrideResponse,
  ...overrideResponse,
});

export const getReportProjectControllerGetRewardsResponseMock = (
  overrideResponse: any = {},
): ReportProjectGetRewards200 => ({
  data: Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => ({})),
  hasNextPage: faker.datatype.boolean(),
  limit: faker.number.int({ min: undefined, max: undefined }),
  page: faker.number.int({ min: undefined, max: undefined }),
  ...overrideResponse,
  ...overrideResponse,
});

export const getReportProjectControllerGetDailyRevenuesResponseMock = (
  overrideResponse: any = {},
): ReportProjectGetDailyRevenues200 => ({
  data: Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => ({})),
  hasNextPage: faker.datatype.boolean(),
  limit: faker.number.int({ min: undefined, max: undefined }),
  page: faker.number.int({ min: undefined, max: undefined }),
  ...overrideResponse,
  ...overrideResponse,
});

export const getReportProjectControllerGetDailyPerformanceResponseMock = (
  overrideResponse: any = {},
): ReportProjectGetDailyPerformance200 => ({
  data: Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => ({})),
  hasNextPage: faker.datatype.boolean(),
  limit: faker.number.int({ min: undefined, max: undefined }),
  page: faker.number.int({ min: undefined, max: undefined }),
  ...overrideResponse,
  ...overrideResponse,
});

export const getActionControllerGetActionResponseMock = (
  overrideResponse: any = {},
): ActionDto => ({
  accountAddresses: faker.helpers.arrayElement([
    Array.from(
      { length: faker.number.int({ min: 1, max: 10 }) },
      (_, i) => i + 1,
    ).map(() => faker.word.sample()),
    undefined,
  ]),
  addresses: {
    additionalAddresses: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        { cosmosPubKey: faker.word.sample(), ...overrideResponse },
        { binanceBeaconAddress: faker.word.sample(), ...overrideResponse },
        {
          lidoStakeAccounts: Array.from(
            { length: faker.number.int({ min: 1, max: 10 }) },
            (_, i) => i + 1,
          ).map(() => faker.word.sample()),
          stakeAccounts: Array.from(
            { length: faker.number.int({ min: 1, max: 10 }) },
            (_, i) => i + 1,
          ).map(() => faker.word.sample()),
          ...overrideResponse,
        },
        { tezosPubKey: faker.word.sample(), ...overrideResponse },
        {
          cAddressBech: faker.word.sample(),
          pAddressBech: faker.word.sample(),
          ...overrideResponse,
        },
      ]),
      undefined,
    ]),
    address: faker.word.sample(),
    ...overrideResponse,
  },
  amount: faker.helpers.arrayElement([faker.word.sample(), null]),
  completedAt: faker.helpers.arrayElement([
    `${faker.date.past().toISOString().split('.')[0]}Z`,
    null,
  ]),
  createdAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
  currentStepIndex: faker.number.int({ min: undefined, max: undefined }),
  id: faker.word.sample(),
  inputToken: faker.helpers.arrayElement([
    {
      address: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      coinGeckoId: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      decimals: faker.number.int({ min: undefined, max: undefined }),
      feeConfigurationId: faker.helpers.arrayElement([
        faker.word.sample(),
        undefined,
      ]),
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
    undefined,
  ]),
  integrationId: faker.word.sample(),
  projectId: faker.helpers.arrayElement([faker.word.sample(), null]),
  status: faker.helpers.arrayElement(Object.values(ActionStatus)),
  tokenId: faker.helpers.arrayElement([faker.word.sample(), null]),
  transactions: Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => ({
    accountAddresses: faker.helpers.arrayElement([
      Array.from(
        { length: faker.number.int({ min: 1, max: 10 }) },
        (_, i) => i + 1,
      ).map(() => faker.word.sample()),
      undefined,
    ]),
    annotatedTransaction: {
      fields: Array.from(
        { length: faker.number.int({ min: 1, max: 10 }) },
        (_, i) => i + 1,
      ).map(() => ({
        description: faker.word.sample(),
        key: faker.word.sample(),
        label: faker.word.sample(),
        value: faker.word.sample(),
        ...overrideResponse,
      })),
      ...overrideResponse,
    },
    broadcastedAt: faker.helpers.arrayElement([
      `${faker.date.past().toISOString().split('.')[0]}Z`,
      null,
    ]),
    createdAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
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
        feeConfigurationId: faker.helpers.arrayElement([
          faker.word.sample(),
          undefined,
        ]),
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
    structuredTransaction: faker.helpers.arrayElement([
      {
        balance: faker.helpers.arrayElement([
          faker.number.int({ min: undefined, max: undefined }),
          undefined,
        ]),
        frozen_balance: faker.helpers.arrayElement([
          faker.number.int({ min: undefined, max: undefined }),
          undefined,
        ]),
        lock: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
        lock_period: faker.helpers.arrayElement([
          faker.number.int({ min: undefined, max: undefined }),
          undefined,
        ]),
        owner_address: faker.word.sample(),
        receiver_address: faker.helpers.arrayElement([
          faker.word.sample(),
          undefined,
        ]),
        resource: faker.helpers.arrayElement([faker.word.sample(), undefined]),
        type: faker.word.sample(),
        unfreeze_balance: faker.helpers.arrayElement([
          faker.number.int({ min: undefined, max: undefined }),
          undefined,
        ]),
        votes: faker.helpers.arrayElement([
          Array.from(
            { length: faker.number.int({ min: 1, max: 10 }) },
            (_, i) => i + 1,
          ).map(() => ({
            vote_address: faker.helpers.arrayElement([
              faker.word.sample(),
              undefined,
            ]),
            vote_count: faker.helpers.arrayElement([
              faker.number.int({ min: undefined, max: undefined }),
              undefined,
            ]),
            ...overrideResponse,
          })),
          undefined,
        ]),
        ...overrideResponse,
      },
    ]),
    type: faker.helpers.arrayElement(Object.values(TransactionType)),
    unsignedTransaction: faker.helpers.arrayElement([
      faker.word.sample(),
      null,
    ]),
    ...overrideResponse,
  })),
  type: faker.helpers.arrayElement(Object.values(ActionTypes)),
  USDAmount: faker.helpers.arrayElement([faker.word.sample(), null]),
  validatorAddress: faker.helpers.arrayElement([faker.word.sample(), null]),
  validatorAddresses: Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => faker.word.sample()),
  ...overrideResponse,
});

export const getActionControllerGetGasEstimateResponseMock = (
  overrideResponse: any = {},
): ActionGasEstimateDto => ({
  amount: faker.helpers.arrayElement([faker.word.sample(), null]),
  gasLimit: faker.helpers.arrayElement([faker.word.sample(), undefined]),
  token: {
    address: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    coinGeckoId: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    decimals: faker.number.int({ min: undefined, max: undefined }),
    feeConfigurationId: faker.helpers.arrayElement([
      faker.word.sample(),
      undefined,
    ]),
    isPoints: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
    logoURI: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    name: faker.word.sample(),
    network: faker.helpers.arrayElement(Object.values(Networks)),
    symbol: faker.word.sample(),
    ...overrideResponse,
  },
  transactions: Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => ({
    amount: faker.helpers.arrayElement([faker.word.sample(), null]),
    gasLimit: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    stepIndex: faker.number.int({ min: undefined, max: undefined }),
    token: {
      address: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      coinGeckoId: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      decimals: faker.number.int({ min: undefined, max: undefined }),
      feeConfigurationId: faker.helpers.arrayElement([
        faker.word.sample(),
        undefined,
      ]),
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
    type: faker.helpers.arrayElement(Object.values(TransactionType)),
    ...overrideResponse,
  })),
  ...overrideResponse,
});

export const getActionControllerEnterResponseMock = (
  overrideResponse: any = {},
): ActionDto => ({
  accountAddresses: faker.helpers.arrayElement([
    Array.from(
      { length: faker.number.int({ min: 1, max: 10 }) },
      (_, i) => i + 1,
    ).map(() => faker.word.sample()),
    undefined,
  ]),
  addresses: {
    additionalAddresses: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        { cosmosPubKey: faker.word.sample(), ...overrideResponse },
        { binanceBeaconAddress: faker.word.sample(), ...overrideResponse },
        {
          lidoStakeAccounts: Array.from(
            { length: faker.number.int({ min: 1, max: 10 }) },
            (_, i) => i + 1,
          ).map(() => faker.word.sample()),
          stakeAccounts: Array.from(
            { length: faker.number.int({ min: 1, max: 10 }) },
            (_, i) => i + 1,
          ).map(() => faker.word.sample()),
          ...overrideResponse,
        },
        { tezosPubKey: faker.word.sample(), ...overrideResponse },
        {
          cAddressBech: faker.word.sample(),
          pAddressBech: faker.word.sample(),
          ...overrideResponse,
        },
      ]),
      undefined,
    ]),
    address: faker.word.sample(),
    ...overrideResponse,
  },
  amount: faker.helpers.arrayElement([faker.word.sample(), null]),
  completedAt: faker.helpers.arrayElement([
    `${faker.date.past().toISOString().split('.')[0]}Z`,
    null,
  ]),
  createdAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
  currentStepIndex: faker.number.int({ min: undefined, max: undefined }),
  id: faker.word.sample(),
  inputToken: faker.helpers.arrayElement([
    {
      address: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      coinGeckoId: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      decimals: faker.number.int({ min: undefined, max: undefined }),
      feeConfigurationId: faker.helpers.arrayElement([
        faker.word.sample(),
        undefined,
      ]),
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
    undefined,
  ]),
  integrationId: faker.word.sample(),
  projectId: faker.helpers.arrayElement([faker.word.sample(), null]),
  status: faker.helpers.arrayElement(Object.values(ActionStatus)),
  tokenId: faker.helpers.arrayElement([faker.word.sample(), null]),
  transactions: Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => ({
    accountAddresses: faker.helpers.arrayElement([
      Array.from(
        { length: faker.number.int({ min: 1, max: 10 }) },
        (_, i) => i + 1,
      ).map(() => faker.word.sample()),
      undefined,
    ]),
    annotatedTransaction: {
      fields: Array.from(
        { length: faker.number.int({ min: 1, max: 10 }) },
        (_, i) => i + 1,
      ).map(() => ({
        description: faker.word.sample(),
        key: faker.word.sample(),
        label: faker.word.sample(),
        value: faker.word.sample(),
        ...overrideResponse,
      })),
      ...overrideResponse,
    },
    broadcastedAt: faker.helpers.arrayElement([
      `${faker.date.past().toISOString().split('.')[0]}Z`,
      null,
    ]),
    createdAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
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
        feeConfigurationId: faker.helpers.arrayElement([
          faker.word.sample(),
          undefined,
        ]),
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
    structuredTransaction: faker.helpers.arrayElement([
      {
        balance: faker.helpers.arrayElement([
          faker.number.int({ min: undefined, max: undefined }),
          undefined,
        ]),
        frozen_balance: faker.helpers.arrayElement([
          faker.number.int({ min: undefined, max: undefined }),
          undefined,
        ]),
        lock: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
        lock_period: faker.helpers.arrayElement([
          faker.number.int({ min: undefined, max: undefined }),
          undefined,
        ]),
        owner_address: faker.word.sample(),
        receiver_address: faker.helpers.arrayElement([
          faker.word.sample(),
          undefined,
        ]),
        resource: faker.helpers.arrayElement([faker.word.sample(), undefined]),
        type: faker.word.sample(),
        unfreeze_balance: faker.helpers.arrayElement([
          faker.number.int({ min: undefined, max: undefined }),
          undefined,
        ]),
        votes: faker.helpers.arrayElement([
          Array.from(
            { length: faker.number.int({ min: 1, max: 10 }) },
            (_, i) => i + 1,
          ).map(() => ({
            vote_address: faker.helpers.arrayElement([
              faker.word.sample(),
              undefined,
            ]),
            vote_count: faker.helpers.arrayElement([
              faker.number.int({ min: undefined, max: undefined }),
              undefined,
            ]),
            ...overrideResponse,
          })),
          undefined,
        ]),
        ...overrideResponse,
      },
    ]),
    type: faker.helpers.arrayElement(Object.values(TransactionType)),
    unsignedTransaction: faker.helpers.arrayElement([
      faker.word.sample(),
      null,
    ]),
    ...overrideResponse,
  })),
  type: faker.helpers.arrayElement(Object.values(ActionTypes)),
  USDAmount: faker.helpers.arrayElement([faker.word.sample(), null]),
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
  accountAddresses: faker.helpers.arrayElement([
    Array.from(
      { length: faker.number.int({ min: 1, max: 10 }) },
      (_, i) => i + 1,
    ).map(() => faker.word.sample()),
    undefined,
  ]),
  addresses: {
    additionalAddresses: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        { cosmosPubKey: faker.word.sample(), ...overrideResponse },
        { binanceBeaconAddress: faker.word.sample(), ...overrideResponse },
        {
          lidoStakeAccounts: Array.from(
            { length: faker.number.int({ min: 1, max: 10 }) },
            (_, i) => i + 1,
          ).map(() => faker.word.sample()),
          stakeAccounts: Array.from(
            { length: faker.number.int({ min: 1, max: 10 }) },
            (_, i) => i + 1,
          ).map(() => faker.word.sample()),
          ...overrideResponse,
        },
        { tezosPubKey: faker.word.sample(), ...overrideResponse },
        {
          cAddressBech: faker.word.sample(),
          pAddressBech: faker.word.sample(),
          ...overrideResponse,
        },
      ]),
      undefined,
    ]),
    address: faker.word.sample(),
    ...overrideResponse,
  },
  amount: faker.helpers.arrayElement([faker.word.sample(), null]),
  completedAt: faker.helpers.arrayElement([
    `${faker.date.past().toISOString().split('.')[0]}Z`,
    null,
  ]),
  createdAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
  currentStepIndex: faker.number.int({ min: undefined, max: undefined }),
  id: faker.word.sample(),
  inputToken: faker.helpers.arrayElement([
    {
      address: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      coinGeckoId: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      decimals: faker.number.int({ min: undefined, max: undefined }),
      feeConfigurationId: faker.helpers.arrayElement([
        faker.word.sample(),
        undefined,
      ]),
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
    undefined,
  ]),
  integrationId: faker.word.sample(),
  projectId: faker.helpers.arrayElement([faker.word.sample(), null]),
  status: faker.helpers.arrayElement(Object.values(ActionStatus)),
  tokenId: faker.helpers.arrayElement([faker.word.sample(), null]),
  transactions: Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => ({
    accountAddresses: faker.helpers.arrayElement([
      Array.from(
        { length: faker.number.int({ min: 1, max: 10 }) },
        (_, i) => i + 1,
      ).map(() => faker.word.sample()),
      undefined,
    ]),
    annotatedTransaction: {
      fields: Array.from(
        { length: faker.number.int({ min: 1, max: 10 }) },
        (_, i) => i + 1,
      ).map(() => ({
        description: faker.word.sample(),
        key: faker.word.sample(),
        label: faker.word.sample(),
        value: faker.word.sample(),
        ...overrideResponse,
      })),
      ...overrideResponse,
    },
    broadcastedAt: faker.helpers.arrayElement([
      `${faker.date.past().toISOString().split('.')[0]}Z`,
      null,
    ]),
    createdAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
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
        feeConfigurationId: faker.helpers.arrayElement([
          faker.word.sample(),
          undefined,
        ]),
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
    structuredTransaction: faker.helpers.arrayElement([
      {
        balance: faker.helpers.arrayElement([
          faker.number.int({ min: undefined, max: undefined }),
          undefined,
        ]),
        frozen_balance: faker.helpers.arrayElement([
          faker.number.int({ min: undefined, max: undefined }),
          undefined,
        ]),
        lock: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
        lock_period: faker.helpers.arrayElement([
          faker.number.int({ min: undefined, max: undefined }),
          undefined,
        ]),
        owner_address: faker.word.sample(),
        receiver_address: faker.helpers.arrayElement([
          faker.word.sample(),
          undefined,
        ]),
        resource: faker.helpers.arrayElement([faker.word.sample(), undefined]),
        type: faker.word.sample(),
        unfreeze_balance: faker.helpers.arrayElement([
          faker.number.int({ min: undefined, max: undefined }),
          undefined,
        ]),
        votes: faker.helpers.arrayElement([
          Array.from(
            { length: faker.number.int({ min: 1, max: 10 }) },
            (_, i) => i + 1,
          ).map(() => ({
            vote_address: faker.helpers.arrayElement([
              faker.word.sample(),
              undefined,
            ]),
            vote_count: faker.helpers.arrayElement([
              faker.number.int({ min: undefined, max: undefined }),
              undefined,
            ]),
            ...overrideResponse,
          })),
          undefined,
        ]),
        ...overrideResponse,
      },
    ]),
    type: faker.helpers.arrayElement(Object.values(TransactionType)),
    unsignedTransaction: faker.helpers.arrayElement([
      faker.word.sample(),
      null,
    ]),
    ...overrideResponse,
  })),
  type: faker.helpers.arrayElement(Object.values(ActionTypes)),
  USDAmount: faker.helpers.arrayElement([faker.word.sample(), null]),
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
  accountAddresses: faker.helpers.arrayElement([
    Array.from(
      { length: faker.number.int({ min: 1, max: 10 }) },
      (_, i) => i + 1,
    ).map(() => faker.word.sample()),
    undefined,
  ]),
  addresses: {
    additionalAddresses: faker.helpers.arrayElement([
      faker.helpers.arrayElement([
        { cosmosPubKey: faker.word.sample(), ...overrideResponse },
        { binanceBeaconAddress: faker.word.sample(), ...overrideResponse },
        {
          lidoStakeAccounts: Array.from(
            { length: faker.number.int({ min: 1, max: 10 }) },
            (_, i) => i + 1,
          ).map(() => faker.word.sample()),
          stakeAccounts: Array.from(
            { length: faker.number.int({ min: 1, max: 10 }) },
            (_, i) => i + 1,
          ).map(() => faker.word.sample()),
          ...overrideResponse,
        },
        { tezosPubKey: faker.word.sample(), ...overrideResponse },
        {
          cAddressBech: faker.word.sample(),
          pAddressBech: faker.word.sample(),
          ...overrideResponse,
        },
      ]),
      undefined,
    ]),
    address: faker.word.sample(),
    ...overrideResponse,
  },
  amount: faker.helpers.arrayElement([faker.word.sample(), null]),
  completedAt: faker.helpers.arrayElement([
    `${faker.date.past().toISOString().split('.')[0]}Z`,
    null,
  ]),
  createdAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
  currentStepIndex: faker.number.int({ min: undefined, max: undefined }),
  id: faker.word.sample(),
  inputToken: faker.helpers.arrayElement([
    {
      address: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      coinGeckoId: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      decimals: faker.number.int({ min: undefined, max: undefined }),
      feeConfigurationId: faker.helpers.arrayElement([
        faker.word.sample(),
        undefined,
      ]),
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
    undefined,
  ]),
  integrationId: faker.word.sample(),
  projectId: faker.helpers.arrayElement([faker.word.sample(), null]),
  status: faker.helpers.arrayElement(Object.values(ActionStatus)),
  tokenId: faker.helpers.arrayElement([faker.word.sample(), null]),
  transactions: Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => ({
    accountAddresses: faker.helpers.arrayElement([
      Array.from(
        { length: faker.number.int({ min: 1, max: 10 }) },
        (_, i) => i + 1,
      ).map(() => faker.word.sample()),
      undefined,
    ]),
    annotatedTransaction: {
      fields: Array.from(
        { length: faker.number.int({ min: 1, max: 10 }) },
        (_, i) => i + 1,
      ).map(() => ({
        description: faker.word.sample(),
        key: faker.word.sample(),
        label: faker.word.sample(),
        value: faker.word.sample(),
        ...overrideResponse,
      })),
      ...overrideResponse,
    },
    broadcastedAt: faker.helpers.arrayElement([
      `${faker.date.past().toISOString().split('.')[0]}Z`,
      null,
    ]),
    createdAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
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
        feeConfigurationId: faker.helpers.arrayElement([
          faker.word.sample(),
          undefined,
        ]),
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
    structuredTransaction: faker.helpers.arrayElement([
      {
        balance: faker.helpers.arrayElement([
          faker.number.int({ min: undefined, max: undefined }),
          undefined,
        ]),
        frozen_balance: faker.helpers.arrayElement([
          faker.number.int({ min: undefined, max: undefined }),
          undefined,
        ]),
        lock: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
        lock_period: faker.helpers.arrayElement([
          faker.number.int({ min: undefined, max: undefined }),
          undefined,
        ]),
        owner_address: faker.word.sample(),
        receiver_address: faker.helpers.arrayElement([
          faker.word.sample(),
          undefined,
        ]),
        resource: faker.helpers.arrayElement([faker.word.sample(), undefined]),
        type: faker.word.sample(),
        unfreeze_balance: faker.helpers.arrayElement([
          faker.number.int({ min: undefined, max: undefined }),
          undefined,
        ]),
        votes: faker.helpers.arrayElement([
          Array.from(
            { length: faker.number.int({ min: 1, max: 10 }) },
            (_, i) => i + 1,
          ).map(() => ({
            vote_address: faker.helpers.arrayElement([
              faker.word.sample(),
              undefined,
            ]),
            vote_count: faker.helpers.arrayElement([
              faker.number.int({ min: undefined, max: undefined }),
              undefined,
            ]),
            ...overrideResponse,
          })),
          undefined,
        ]),
        ...overrideResponse,
      },
    ]),
    type: faker.helpers.arrayElement(Object.values(TransactionType)),
    unsignedTransaction: faker.helpers.arrayElement([
      faker.word.sample(),
      null,
    ]),
    ...overrideResponse,
  })),
  type: faker.helpers.arrayElement(Object.values(ActionTypes)),
  USDAmount: faker.helpers.arrayElement([faker.word.sample(), null]),
  validatorAddress: faker.helpers.arrayElement([faker.word.sample(), null]),
  validatorAddresses: Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => faker.word.sample()),
  ...overrideResponse,
});

export const getActionControllerEnterGasEstimationResponseMock = (
  overrideResponse: any = {},
): ActionGasEstimateDto => ({
  amount: faker.helpers.arrayElement([faker.word.sample(), null]),
  gasLimit: faker.helpers.arrayElement([faker.word.sample(), undefined]),
  token: {
    address: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    coinGeckoId: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    decimals: faker.number.int({ min: undefined, max: undefined }),
    feeConfigurationId: faker.helpers.arrayElement([
      faker.word.sample(),
      undefined,
    ]),
    isPoints: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
    logoURI: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    name: faker.word.sample(),
    network: faker.helpers.arrayElement(Object.values(Networks)),
    symbol: faker.word.sample(),
    ...overrideResponse,
  },
  transactions: Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => ({
    amount: faker.helpers.arrayElement([faker.word.sample(), null]),
    gasLimit: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    stepIndex: faker.number.int({ min: undefined, max: undefined }),
    token: {
      address: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      coinGeckoId: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      decimals: faker.number.int({ min: undefined, max: undefined }),
      feeConfigurationId: faker.helpers.arrayElement([
        faker.word.sample(),
        undefined,
      ]),
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
    type: faker.helpers.arrayElement(Object.values(TransactionType)),
    ...overrideResponse,
  })),
  ...overrideResponse,
});

export const getActionControllerExitGasEstimateResponseMock = (
  overrideResponse: any = {},
): ActionGasEstimateDto => ({
  amount: faker.helpers.arrayElement([faker.word.sample(), null]),
  gasLimit: faker.helpers.arrayElement([faker.word.sample(), undefined]),
  token: {
    address: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    coinGeckoId: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    decimals: faker.number.int({ min: undefined, max: undefined }),
    feeConfigurationId: faker.helpers.arrayElement([
      faker.word.sample(),
      undefined,
    ]),
    isPoints: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
    logoURI: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    name: faker.word.sample(),
    network: faker.helpers.arrayElement(Object.values(Networks)),
    symbol: faker.word.sample(),
    ...overrideResponse,
  },
  transactions: Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => ({
    amount: faker.helpers.arrayElement([faker.word.sample(), null]),
    gasLimit: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    stepIndex: faker.number.int({ min: undefined, max: undefined }),
    token: {
      address: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      coinGeckoId: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      decimals: faker.number.int({ min: undefined, max: undefined }),
      feeConfigurationId: faker.helpers.arrayElement([
        faker.word.sample(),
        undefined,
      ]),
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
    type: faker.helpers.arrayElement(Object.values(TransactionType)),
    ...overrideResponse,
  })),
  ...overrideResponse,
});

export const getActionControllerListResponseMock = (
  overrideResponse: any = {},
): ActionList200 => ({
  data: Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => ({})),
  hasNextPage: faker.datatype.boolean(),
  limit: faker.number.int({ min: undefined, max: undefined }),
  page: faker.number.int({ min: undefined, max: undefined }),
  ...overrideResponse,
  ...overrideResponse,
});

export const getActionControllerPendingGasEstimateResponseMock = (
  overrideResponse: any = {},
): ActionGasEstimateDto => ({
  amount: faker.helpers.arrayElement([faker.word.sample(), null]),
  gasLimit: faker.helpers.arrayElement([faker.word.sample(), undefined]),
  token: {
    address: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    coinGeckoId: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    decimals: faker.number.int({ min: undefined, max: undefined }),
    feeConfigurationId: faker.helpers.arrayElement([
      faker.word.sample(),
      undefined,
    ]),
    isPoints: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
    logoURI: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    name: faker.word.sample(),
    network: faker.helpers.arrayElement(Object.values(Networks)),
    symbol: faker.word.sample(),
    ...overrideResponse,
  },
  transactions: Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => ({
    amount: faker.helpers.arrayElement([faker.word.sample(), null]),
    gasLimit: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    stepIndex: faker.number.int({ min: undefined, max: undefined }),
    token: {
      address: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      coinGeckoId: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      decimals: faker.number.int({ min: undefined, max: undefined }),
      feeConfigurationId: faker.helpers.arrayElement([
        faker.word.sample(),
        undefined,
      ]),
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
    type: faker.helpers.arrayElement(Object.values(TransactionType)),
    ...overrideResponse,
  })),
  ...overrideResponse,
});

export const getTransactionControllerGetTransactionResponseMock = (
  overrideResponse: any = {},
): TransactionDto => ({
  accountAddresses: faker.helpers.arrayElement([
    Array.from(
      { length: faker.number.int({ min: 1, max: 10 }) },
      (_, i) => i + 1,
    ).map(() => faker.word.sample()),
    undefined,
  ]),
  annotatedTransaction: {
    fields: Array.from(
      { length: faker.number.int({ min: 1, max: 10 }) },
      (_, i) => i + 1,
    ).map(() => ({
      description: faker.word.sample(),
      key: faker.word.sample(),
      label: faker.word.sample(),
      value: faker.word.sample(),
      ...overrideResponse,
    })),
    ...overrideResponse,
  },
  broadcastedAt: faker.helpers.arrayElement([
    `${faker.date.past().toISOString().split('.')[0]}Z`,
    null,
  ]),
  createdAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
  error: faker.helpers.arrayElement([faker.word.sample(), null]),
  explorerUrl: faker.helpers.arrayElement([faker.word.sample(), null]),
  gasEstimate: {
    amount: faker.helpers.arrayElement([faker.word.sample(), null]),
    gasLimit: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    token: {
      address: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      coinGeckoId: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      decimals: faker.number.int({ min: undefined, max: undefined }),
      feeConfigurationId: faker.helpers.arrayElement([
        faker.word.sample(),
        undefined,
      ]),
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
  structuredTransaction: faker.helpers.arrayElement([
    {
      balance: faker.helpers.arrayElement([
        faker.number.int({ min: undefined, max: undefined }),
        undefined,
      ]),
      frozen_balance: faker.helpers.arrayElement([
        faker.number.int({ min: undefined, max: undefined }),
        undefined,
      ]),
      lock: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
      lock_period: faker.helpers.arrayElement([
        faker.number.int({ min: undefined, max: undefined }),
        undefined,
      ]),
      owner_address: faker.word.sample(),
      receiver_address: faker.helpers.arrayElement([
        faker.word.sample(),
        undefined,
      ]),
      resource: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      type: faker.word.sample(),
      unfreeze_balance: faker.helpers.arrayElement([
        faker.number.int({ min: undefined, max: undefined }),
        undefined,
      ]),
      votes: faker.helpers.arrayElement([
        Array.from(
          { length: faker.number.int({ min: 1, max: 10 }) },
          (_, i) => i + 1,
        ).map(() => ({
          vote_address: faker.helpers.arrayElement([
            faker.word.sample(),
            undefined,
          ]),
          vote_count: faker.helpers.arrayElement([
            faker.number.int({ min: undefined, max: undefined }),
            undefined,
          ]),
          ...overrideResponse,
        })),
        undefined,
      ]),
      ...overrideResponse,
    },
  ]),
  type: faker.helpers.arrayElement(Object.values(TransactionType)),
  unsignedTransaction: faker.helpers.arrayElement([faker.word.sample(), null]),
  ...overrideResponse,
});

export const getTransactionControllerConstructResponseMock = (
  overrideResponse: any = {},
): TransactionDto => ({
  accountAddresses: faker.helpers.arrayElement([
    Array.from(
      { length: faker.number.int({ min: 1, max: 10 }) },
      (_, i) => i + 1,
    ).map(() => faker.word.sample()),
    undefined,
  ]),
  annotatedTransaction: {
    fields: Array.from(
      { length: faker.number.int({ min: 1, max: 10 }) },
      (_, i) => i + 1,
    ).map(() => ({
      description: faker.word.sample(),
      key: faker.word.sample(),
      label: faker.word.sample(),
      value: faker.word.sample(),
      ...overrideResponse,
    })),
    ...overrideResponse,
  },
  broadcastedAt: faker.helpers.arrayElement([
    `${faker.date.past().toISOString().split('.')[0]}Z`,
    null,
  ]),
  createdAt: `${faker.date.past().toISOString().split('.')[0]}Z`,
  error: faker.helpers.arrayElement([faker.word.sample(), null]),
  explorerUrl: faker.helpers.arrayElement([faker.word.sample(), null]),
  gasEstimate: {
    amount: faker.helpers.arrayElement([faker.word.sample(), null]),
    gasLimit: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    token: {
      address: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      coinGeckoId: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      decimals: faker.number.int({ min: undefined, max: undefined }),
      feeConfigurationId: faker.helpers.arrayElement([
        faker.word.sample(),
        undefined,
      ]),
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
  structuredTransaction: faker.helpers.arrayElement([
    {
      balance: faker.helpers.arrayElement([
        faker.number.int({ min: undefined, max: undefined }),
        undefined,
      ]),
      frozen_balance: faker.helpers.arrayElement([
        faker.number.int({ min: undefined, max: undefined }),
        undefined,
      ]),
      lock: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
      lock_period: faker.helpers.arrayElement([
        faker.number.int({ min: undefined, max: undefined }),
        undefined,
      ]),
      owner_address: faker.word.sample(),
      receiver_address: faker.helpers.arrayElement([
        faker.word.sample(),
        undefined,
      ]),
      resource: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      type: faker.word.sample(),
      unfreeze_balance: faker.helpers.arrayElement([
        faker.number.int({ min: undefined, max: undefined }),
        undefined,
      ]),
      votes: faker.helpers.arrayElement([
        Array.from(
          { length: faker.number.int({ min: 1, max: 10 }) },
          (_, i) => i + 1,
        ).map(() => ({
          vote_address: faker.helpers.arrayElement([
            faker.word.sample(),
            undefined,
          ]),
          vote_count: faker.helpers.arrayElement([
            faker.number.int({ min: undefined, max: undefined }),
            undefined,
          ]),
          ...overrideResponse,
        })),
        undefined,
      ]),
      ...overrideResponse,
    },
  ]),
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
      feeConfigurationId: faker.helpers.arrayElement([
        faker.word.sample(),
        undefined,
      ]),
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
    availableYields: Array.from(
      { length: faker.number.int({ min: 1, max: 10 }) },
      (_, i) => i + 1,
    ).map(() => faker.word.sample()),
    token: {
      address: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      coinGeckoId: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      decimals: faker.number.int({ min: undefined, max: undefined }),
      feeConfigurationId: faker.helpers.arrayElement([
        faker.word.sample(),
        undefined,
      ]),
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
      feeConfigurationId: faker.helpers.arrayElement([
        faker.word.sample(),
        undefined,
      ]),
      groupId: faker.string.uuid(),
      label: faker.helpers.arrayElement([
        { params: {}, type: faker.word.sample(), ...overrideResponse },
        undefined,
      ]),
      pendingActionConstraints: faker.helpers.arrayElement([
        Array.from(
          { length: faker.number.int({ min: 1, max: 10 }) },
          (_, i) => i + 1,
        ).map(() => ({
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
              ...overrideResponse,
            },
            undefined,
          ]),
          type: faker.helpers.arrayElement(Object.values(ActionTypes)),
          ...overrideResponse,
        })),
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
                    network: faker.helpers.arrayElement(
                      Object.values(Networks),
                    ),
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
                feeConfigurationId: faker.helpers.arrayElement([
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
                providerId: faker.helpers.arrayElement([
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
                receiverAddress: faker.helpers.arrayElement([
                  { required: faker.datatype.boolean(), ...overrideResponse },
                  undefined,
                ]),
                signatureVerification: faker.helpers.arrayElement([
                  { required: faker.datatype.boolean(), ...overrideResponse },
                  undefined,
                ]),
                subnetId: faker.helpers.arrayElement([
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
        feeConfigurationId: faker.helpers.arrayElement([
          faker.word.sample(),
          undefined,
        ]),
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
  data: Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => ({})),
  hasNextPage: faker.datatype.boolean(),
  limit: faker.number.int({ min: undefined, max: undefined }),
  page: faker.number.int({ min: undefined, max: undefined }),
  ...overrideResponse,
  ...overrideResponse,
});

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
    feeConfigurationId: faker.helpers.arrayElement([
      faker.word.sample(),
      undefined,
    ]),
    groupId: faker.string.uuid(),
    label: faker.helpers.arrayElement([
      { params: {}, type: faker.word.sample(), ...overrideResponse },
      undefined,
    ]),
    pendingActionConstraints: faker.helpers.arrayElement([
      Array.from(
        { length: faker.number.int({ min: 1, max: 10 }) },
        (_, i) => i + 1,
      ).map(() => ({
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
            ...overrideResponse,
          },
          undefined,
        ]),
        type: faker.helpers.arrayElement(Object.values(ActionTypes)),
        ...overrideResponse,
      })),
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
                  network: faker.helpers.arrayElement(Object.values(Networks)),
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
              feeConfigurationId: faker.helpers.arrayElement([
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
              providerId: faker.helpers.arrayElement([
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
              receiverAddress: faker.helpers.arrayElement([
                { required: faker.datatype.boolean(), ...overrideResponse },
                undefined,
              ]),
              signatureVerification: faker.helpers.arrayElement([
                { required: faker.datatype.boolean(), ...overrideResponse },
                undefined,
              ]),
              subnetId: faker.helpers.arrayElement([
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
      feeConfigurationId: faker.helpers.arrayElement([
        faker.word.sample(),
        undefined,
      ]),
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

export const getYieldControllerGetSingleYieldRewardsSummaryResponseMock = (
  overrideResponse: any = {},
): YieldRewardsSummaryResponseDto => ({
  rewards: {
    last24H: faker.word.sample(),
    last30D: faker.word.sample(),
    last7D: faker.word.sample(),
    lastYear: faker.word.sample(),
    total: faker.word.sample(),
    ...overrideResponse,
  },
  token: {
    address: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    coinGeckoId: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    decimals: faker.number.int({ min: undefined, max: undefined }),
    feeConfigurationId: faker.helpers.arrayElement([
      faker.word.sample(),
      undefined,
    ]),
    isPoints: faker.helpers.arrayElement([faker.datatype.boolean(), undefined]),
    logoURI: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    name: faker.word.sample(),
    network: faker.helpers.arrayElement(Object.values(Networks)),
    symbol: faker.word.sample(),
    ...overrideResponse,
  },
  ...overrideResponse,
});

export const getYieldControllerGetFeeConfigurationResponseMock = (
  overrideResponse: any = {},
): FeeConfigurationDto => ({
  allocatorVaultContractAddress: faker.helpers.arrayElement([
    faker.word.sample(),
    null,
  ]),
  depositFeeBps: faker.helpers.arrayElement([
    faker.number.int({ min: 1, max: 10000 }),
    null,
  ]),
  feeWrapperContractAddress: faker.helpers.arrayElement([
    faker.word.sample(),
    null,
  ]),
  id: faker.word.sample(),
  integrationId: faker.word.sample(),
  managementFeeBps: faker.helpers.arrayElement([
    faker.number.int({ min: 1, max: 10000 }),
    null,
  ]),
  performanceFeeBps: faker.helpers.arrayElement([
    faker.number.int({ min: 1, max: 10000 }),
    null,
  ]),
  projectId: faker.word.sample(),
  status: faker.helpers.arrayElement(Object.values(FeeConfigurationStatus)),
  ...overrideResponse,
});

export const getYieldControllerCreateFeeConfigurationResponseMock = (
  overrideResponse: any = {},
): FeeConfigurationDto => ({
  allocatorVaultContractAddress: faker.helpers.arrayElement([
    faker.word.sample(),
    null,
  ]),
  depositFeeBps: faker.helpers.arrayElement([
    faker.number.int({ min: 1, max: 10000 }),
    null,
  ]),
  feeWrapperContractAddress: faker.helpers.arrayElement([
    faker.word.sample(),
    null,
  ]),
  id: faker.word.sample(),
  integrationId: faker.word.sample(),
  managementFeeBps: faker.helpers.arrayElement([
    faker.number.int({ min: 1, max: 10000 }),
    null,
  ]),
  performanceFeeBps: faker.helpers.arrayElement([
    faker.number.int({ min: 1, max: 10000 }),
    null,
  ]),
  projectId: faker.word.sample(),
  status: faker.helpers.arrayElement(Object.values(FeeConfigurationStatus)),
  ...overrideResponse,
});

export const getYieldV2ControllerYieldsResponseMock = (
  overrideResponse: any = {},
): YieldV2Yields200 => ({
  data: Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => ({})),
  hasNextPage: faker.datatype.boolean(),
  limit: faker.number.int({ min: undefined, max: undefined }),
  page: faker.number.int({ min: undefined, max: undefined }),
  ...overrideResponse,
  ...overrideResponse,
});

export const getYieldV2ControllerGetYieldByIdResponseMock = (
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
              network: faker.helpers.arrayElement(Object.values(Networks)),
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
          feeConfigurationId: faker.helpers.arrayElement([
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
          providerId: faker.helpers.arrayElement([
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
          receiverAddress: faker.helpers.arrayElement([
            { required: faker.datatype.boolean(), ...overrideResponse },
            undefined,
          ]),
          signatureVerification: faker.helpers.arrayElement([
            { required: faker.datatype.boolean(), ...overrideResponse },
            undefined,
          ]),
          subnetId: faker.helpers.arrayElement([
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
                network: faker.helpers.arrayElement(Object.values(Networks)),
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
            feeConfigurationId: faker.helpers.arrayElement([
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
            providerId: faker.helpers.arrayElement([
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
            receiverAddress: faker.helpers.arrayElement([
              { required: faker.datatype.boolean(), ...overrideResponse },
              undefined,
            ]),
            signatureVerification: faker.helpers.arrayElement([
              { required: faker.datatype.boolean(), ...overrideResponse },
              undefined,
            ]),
            subnetId: faker.helpers.arrayElement([
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
  feeConfigurations: Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => ({
    allocatorVaultContractAddress: faker.helpers.arrayElement([
      faker.word.sample(),
      null,
    ]),
    computedRewardRate: faker.number.int({ min: undefined, max: undefined }),
    depositFeeBps: faker.helpers.arrayElement([
      faker.number.int({ min: 1, max: 10000 }),
      null,
    ]),
    feeWrapperContractAddress: faker.helpers.arrayElement([
      faker.word.sample(),
      null,
    ]),
    id: faker.word.sample(),
    integrationId: faker.word.sample(),
    managementFeeBps: faker.helpers.arrayElement([
      faker.number.int({ min: 1, max: 10000 }),
      null,
    ]),
    performanceFeeBps: faker.helpers.arrayElement([
      faker.number.int({ min: 1, max: 10000 }),
      null,
    ]),
    projectId: faker.word.sample(),
    status: faker.helpers.arrayElement(Object.values(FeeConfigurationStatus)),
    ...overrideResponse,
  })),
  id: faker.word.sample(),
  isAvailable: faker.datatype.boolean(),
  metadata: {
    commission: faker.helpers.arrayElement([
      Array.from(
        { length: faker.number.int({ min: 1, max: 10 }) },
        (_, i) => i + 1,
      ).map(() => ({
        appliesTo: faker.helpers.arrayElement(
          Object.values(CommissionAppliesTo),
        ),
        value: faker.number.int({ min: undefined, max: undefined }),
        ...overrideResponse,
      })),
      undefined,
    ]),
    cooldownPeriod: faker.helpers.arrayElement([
      {
        days: faker.number.int({ min: undefined, max: undefined }),
        ...overrideResponse,
      },
      undefined,
    ]),
    description: faker.word.sample(),
    documentation: faker.word.sample(),
    extraTransactionFormatsSupported: faker.helpers.arrayElement([
      faker.helpers.arrayElements(Object.values(TransactionFormat)),
      undefined,
    ]),
    fee: {
      depositFee: faker.datatype.boolean(),
      enabled: faker.datatype.boolean(),
      managementFee: faker.datatype.boolean(),
      performanceFee: faker.datatype.boolean(),
      ...overrideResponse,
    },
    gasFeeToken: {
      address: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      coinGeckoId: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      decimals: faker.number.int({ min: undefined, max: undefined }),
      feeConfigurationId: faker.helpers.arrayElement([
        faker.word.sample(),
        undefined,
      ]),
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
    lockupPeriod: faker.helpers.arrayElement([
      {
        days: faker.number.int({ min: undefined, max: undefined }),
        ...overrideResponse,
      },
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
        feeConfigurationId: faker.helpers.arrayElement([
          faker.word.sample(),
          undefined,
        ]),
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
    supportedStandards: faker.helpers.arrayElement([
      faker.helpers.arrayElements(Object.values(ERCStandards)),
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
      feeConfigurationId: faker.helpers.arrayElement([
        faker.word.sample(),
        undefined,
      ]),
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
        feeConfigurationId: faker.helpers.arrayElement([
          faker.word.sample(),
          undefined,
        ]),
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
    tvl: faker.helpers.arrayElement([
      Array.from(
        { length: faker.number.int({ min: 1, max: 10 }) },
        (_, i) => i + 1,
      ).map(() => ({
        level: faker.helpers.arrayElement(Object.values(TvlLevel)),
        value: faker.word.sample(),
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
    feeConfigurationId: faker.helpers.arrayElement([
      faker.word.sample(),
      undefined,
    ]),
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
    feeConfigurationId: faker.helpers.arrayElement([
      faker.word.sample(),
      undefined,
    ]),
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
    endDate: faker.helpers.arrayElement([
      `${faker.date.past().toISOString().split('.')[0]}Z`,
      undefined,
    ]),
    image: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    marketCap: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    minimumStake: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    name: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    nominatorCount: faker.helpers.arrayElement([
      faker.number.int({ min: undefined, max: undefined }),
      undefined,
    ]),
    preferred: faker.helpers.arrayElement([
      faker.datatype.boolean(),
      undefined,
    ]),
    pricePerShare: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    providerId: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    remainingPossibleStake: faker.helpers.arrayElement([
      faker.word.sample(),
      undefined,
    ]),
    remainingSlots: faker.helpers.arrayElement([
      faker.number.int({ min: undefined, max: undefined }),
      undefined,
    ]),
    stakedBalance: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    status: faker.helpers.arrayElement(Object.values(ValidatorStatusTypes)),
    subnetId: faker.helpers.arrayElement([
      faker.number.int({ min: undefined, max: undefined }),
      undefined,
    ]),
    subnetName: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    tokenSymbol: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    votingPower: faker.helpers.arrayElement([
      faker.number.int({ min: undefined, max: undefined }),
      undefined,
    ]),
    website: faker.helpers.arrayElement([faker.word.sample(), undefined]),
    ...overrideResponse,
  })),
  ...overrideResponse,
});

export const getYieldV2ControllerFindYieldValidatorsResponseMock = (
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
      endDate: faker.helpers.arrayElement([
        `${faker.date.past().toISOString().split('.')[0]}Z`,
        undefined,
      ]),
      image: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      marketCap: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      minimumStake: faker.helpers.arrayElement([
        faker.word.sample(),
        undefined,
      ]),
      name: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      nominatorCount: faker.helpers.arrayElement([
        faker.number.int({ min: undefined, max: undefined }),
        undefined,
      ]),
      preferred: faker.helpers.arrayElement([
        faker.datatype.boolean(),
        undefined,
      ]),
      pricePerShare: faker.helpers.arrayElement([
        faker.word.sample(),
        undefined,
      ]),
      providerId: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      remainingPossibleStake: faker.helpers.arrayElement([
        faker.word.sample(),
        undefined,
      ]),
      remainingSlots: faker.helpers.arrayElement([
        faker.number.int({ min: undefined, max: undefined }),
        undefined,
      ]),
      stakedBalance: faker.helpers.arrayElement([
        faker.word.sample(),
        undefined,
      ]),
      status: faker.helpers.arrayElement(Object.values(ValidatorStatusTypes)),
      subnetId: faker.helpers.arrayElement([
        faker.number.int({ min: undefined, max: undefined }),
        undefined,
      ]),
      subnetName: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      tokenSymbol: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      votingPower: faker.helpers.arrayElement([
        faker.number.int({ min: undefined, max: undefined }),
        undefined,
      ]),
      website: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      ...overrideResponse,
    })),
    ...overrideResponse,
  }));

export const getYieldV2ControllerFindValidatorsResponseMock = (
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
      endDate: faker.helpers.arrayElement([
        `${faker.date.past().toISOString().split('.')[0]}Z`,
        undefined,
      ]),
      image: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      marketCap: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      minimumStake: faker.helpers.arrayElement([
        faker.word.sample(),
        undefined,
      ]),
      name: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      nominatorCount: faker.helpers.arrayElement([
        faker.number.int({ min: undefined, max: undefined }),
        undefined,
      ]),
      preferred: faker.helpers.arrayElement([
        faker.datatype.boolean(),
        undefined,
      ]),
      pricePerShare: faker.helpers.arrayElement([
        faker.word.sample(),
        undefined,
      ]),
      providerId: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      remainingPossibleStake: faker.helpers.arrayElement([
        faker.word.sample(),
        undefined,
      ]),
      remainingSlots: faker.helpers.arrayElement([
        faker.number.int({ min: undefined, max: undefined }),
        undefined,
      ]),
      stakedBalance: faker.helpers.arrayElement([
        faker.word.sample(),
        undefined,
      ]),
      status: faker.helpers.arrayElement(Object.values(ValidatorStatusTypes)),
      subnetId: faker.helpers.arrayElement([
        faker.number.int({ min: undefined, max: undefined }),
        undefined,
      ]),
      subnetName: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      tokenSymbol: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      votingPower: faker.helpers.arrayElement([
        faker.number.int({ min: undefined, max: undefined }),
        undefined,
      ]),
      website: faker.helpers.arrayElement([faker.word.sample(), undefined]),
      ...overrideResponse,
    })),
    ...overrideResponse,
  }));

export const getYieldV2ControllerGetFeeConfigurationsResponseMock = (
  overrideResponse: any = {},
): YieldV2GetFeeConfigurations200 => ({
  data: Array.from(
    { length: faker.number.int({ min: 1, max: 10 }) },
    (_, i) => i + 1,
  ).map(() => ({})),
  hasNextPage: faker.datatype.boolean(),
  limit: faker.number.int({ min: undefined, max: undefined }),
  page: faker.number.int({ min: undefined, max: undefined }),
  ...overrideResponse,
  ...overrideResponse,
});

export const getHealthControllerHealthV2MockHandler = (
  overrideResponse?: HealthStatusDto,
) => {
  return http.get('*/v2/health', async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse
          ? overrideResponse
          : getHealthControllerHealthV2ResponseMock(),
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

export const getReportProjectControllerListMockHandler = (
  overrideResponse?: ReportProjectList200,
) => {
  return http.get('*/v1/reporting/actions', async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse
          ? overrideResponse
          : getReportProjectControllerListResponseMock(),
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

export const getReportProjectControllerGetRewardsMockHandler = (
  overrideResponse?: ReportProjectGetRewards200,
) => {
  return http.get('*/v1/reporting/rewards/:integrationId', async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse
          ? overrideResponse
          : getReportProjectControllerGetRewardsResponseMock(),
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

export const getReportProjectControllerGetDailyRevenuesMockHandler = (
  overrideResponse?: ReportProjectGetDailyRevenues200,
) => {
  return http.get('*/v1/reporting/revenue', async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse
          ? overrideResponse
          : getReportProjectControllerGetDailyRevenuesResponseMock(),
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

export const getReportProjectControllerGetDailyPerformanceMockHandler = (
  overrideResponse?: ReportProjectGetDailyPerformance200,
) => {
  return http.get('*/v1/reporting/performance', async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse
          ? overrideResponse
          : getReportProjectControllerGetDailyPerformanceResponseMock(),
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
  overrideResponse?: ActionGasEstimateDto,
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
  overrideResponse?: ActionGasEstimateDto,
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
  overrideResponse?: ActionGasEstimateDto,
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

export const getActionControllerListMockHandler = (
  overrideResponse?: ActionList200,
) => {
  return http.get('*/v1/actions', async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse
          ? overrideResponse
          : getActionControllerListResponseMock(),
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
  overrideResponse?: ActionGasEstimateDto,
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

export const getYieldControllerGetSingleYieldRewardsSummaryMockHandler = (
  overrideResponse?: YieldRewardsSummaryResponseDto,
) => {
  return http.post('*/v1/yields/:integrationId/rewards-summary', async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse
          ? overrideResponse
          : getYieldControllerGetSingleYieldRewardsSummaryResponseMock(),
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

export const getYieldControllerGetFeeConfigurationMockHandler = (
  overrideResponse?: FeeConfigurationDto,
) => {
  return http.get('*/v1/yields/:integrationId/fee-configuration', async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse
          ? overrideResponse
          : getYieldControllerGetFeeConfigurationResponseMock(),
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

export const getYieldControllerCreateFeeConfigurationMockHandler = (
  overrideResponse?: FeeConfigurationDto,
) => {
  return http.post('*/v1/yields/:integrationId/fee-configuration', async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse
          ? overrideResponse
          : getYieldControllerCreateFeeConfigurationResponseMock(),
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

export const getYieldV2ControllerYieldsMockHandler = (
  overrideResponse?: YieldV2Yields200,
) => {
  return http.get('*/v2/yields', async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse
          ? overrideResponse
          : getYieldV2ControllerYieldsResponseMock(),
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

export const getYieldV2ControllerGetYieldByIdMockHandler = (
  overrideResponse?: YieldDto,
) => {
  return http.get('*/v2/yields/:yieldId', async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse
          ? overrideResponse
          : getYieldV2ControllerGetYieldByIdResponseMock(),
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

export const getYieldV2ControllerFindYieldValidatorsMockHandler = (
  overrideResponse?: ValidatorSearchResultDto[],
) => {
  return http.get('*/v2/yields/:yieldId/validators', async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse
          ? overrideResponse
          : getYieldV2ControllerFindYieldValidatorsResponseMock(),
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

export const getYieldV2ControllerFindValidatorsMockHandler = (
  overrideResponse?: ValidatorSearchResultDto[],
) => {
  return http.get('*/v2/yields/validators', async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse
          ? overrideResponse
          : getYieldV2ControllerFindValidatorsResponseMock(),
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

export const getYieldV2ControllerGetFeeConfigurationsMockHandler = (
  overrideResponse?: YieldV2GetFeeConfigurations200,
) => {
  return http.get('*/v2/yields/:integrationId/fee-configurations', async () => {
    await delay(1000);
    return new HttpResponse(
      JSON.stringify(
        overrideResponse
          ? overrideResponse
          : getYieldV2ControllerGetFeeConfigurationsResponseMock(),
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
  getHealthControllerHealthV2MockHandler(),
  getReportProjectControllerListMockHandler(),
  getReportProjectControllerGetRewardsMockHandler(),
  getReportProjectControllerGetDailyRevenuesMockHandler(),
  getReportProjectControllerGetDailyPerformanceMockHandler(),
  getActionControllerGetActionMockHandler(),
  getActionControllerGetGasEstimateMockHandler(),
  getActionControllerEnterMockHandler(),
  getActionControllerExitMockHandler(),
  getActionControllerPendingMockHandler(),
  getActionControllerEnterGasEstimationMockHandler(),
  getActionControllerExitGasEstimateMockHandler(),
  getActionControllerListMockHandler(),
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
  getYieldControllerGetMultipleYieldBalancesMockHandler(),
  getYieldControllerGetMyYieldsMockHandler(),
  getYieldControllerGetMyNetworksMockHandler(),
  getYieldControllerGetSingleYieldBalancesMockHandler(),
  getYieldControllerGetSingleYieldRewardsSummaryMockHandler(),
  getYieldControllerGetFeeConfigurationMockHandler(),
  getYieldControllerCreateFeeConfigurationMockHandler(),
  getYieldV2ControllerYieldsMockHandler(),
  getYieldV2ControllerGetYieldByIdMockHandler(),
  getYieldV2ControllerFindYieldValidatorsMockHandler(),
  getYieldV2ControllerFindValidatorsMockHandler(),
  getYieldV2ControllerGetFeeConfigurationsMockHandler(),
];

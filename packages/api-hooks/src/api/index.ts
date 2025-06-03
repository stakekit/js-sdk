import { useMutation, useQuery } from '@tanstack/react-query';
import type {
  MutationFunction,
  QueryFunction,
  QueryKey,
  UseMutationOptions,
  UseQueryOptions,
  UseQueryResult,
} from '@tanstack/react-query';
import type {
  ActionDto,
  ActionGasEstimateDto,
  ActionGasEstimateRequestDto,
  ActionList200,
  ActionListParams,
  ActionRequestDto,
  BalanceResponseDto,
  BalancesRequestDto,
  ConstructTransactionRequestDto,
  CreateFeeConfigurationDtoV2,
  FeeConfigurationDto,
  GasForNetworkResponseDto,
  GeolocationError,
  HealthStatusDto,
  PendingActionGasEstimateRequestDto,
  PendingActionRequestDto,
  PriceRequestDto,
  PriceResponseDto,
  ReportProjectGetRewards200,
  ReportProjectGetRewardsParams,
  ReportProjectList200,
  ReportProjectListParams,
  StakeKitErrorDto,
  SubmitHashRequestDto,
  SubmitRequestDto,
  SubmitResponseDto,
  TokenGetTokensParams,
  TokenWithAvailableYieldsDto,
  TransactionDto,
  TransactionStatusResponseDto,
  TransactionVerificationMessageDto,
  TransactionVerificationMessageRequestDto,
  ValidatorSearchResultDto,
  YieldBalanceDto,
  YieldBalanceRequestDto,
  YieldBalanceWithIntegrationIdRequestDto,
  YieldBalancesWithIntegrationIdDto,
  YieldDto,
  YieldGetMyYields200,
  YieldGetMyYieldsParams,
  YieldGetSingleYieldBalancesParams,
  YieldRewardsSummaryRequestDto,
  YieldRewardsSummaryResponseDto,
  YieldV2FindValidatorsParams,
  YieldV2FindYieldValidatorsParams,
  YieldV2GetFeeConfigurations200,
  YieldV2GetFeeConfigurationsParams,
  YieldV2Yields200,
  YieldV2YieldsParams,
} from './schemas';
import { customFetch } from '../api-client';

/**
 * Get the health status of the API
 * @summary Health check
 */
export const healthHealthV2 = (signal?: AbortSignal) => {
  return customFetch<HealthStatusDto>({
    url: `/v2/health`,
    method: 'GET',
    signal,
  });
};

export const getHealthHealthV2QueryKey = () => {
  return [`/v2/health`] as const;
};

export const getHealthHealthV2QueryOptions = <
  TData = Awaited<ReturnType<typeof healthHealthV2>>,
  TError = StakeKitErrorDto,
>(options?: {
  query?: Partial<
    UseQueryOptions<Awaited<ReturnType<typeof healthHealthV2>>, TError, TData>
  >;
}) => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getHealthHealthV2QueryKey();

  const queryFn: QueryFunction<Awaited<ReturnType<typeof healthHealthV2>>> = ({
    signal,
  }) => healthHealthV2(signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof healthHealthV2>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type HealthHealthV2QueryResult = NonNullable<
  Awaited<ReturnType<typeof healthHealthV2>>
>;
export type HealthHealthV2QueryError = StakeKitErrorDto;

/**
 * @summary Health check
 */
export const useHealthHealthV2 = <
  TData = Awaited<ReturnType<typeof healthHealthV2>>,
  TError = StakeKitErrorDto,
>(options?: {
  query?: Partial<
    UseQueryOptions<Awaited<ReturnType<typeof healthHealthV2>>, TError, TData>
  >;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getHealthHealthV2QueryOptions(options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

export const reportProjectList = (
  params?: ReportProjectListParams,
  signal?: AbortSignal,
) => {
  return customFetch<ReportProjectList200>({
    url: `/v1/reporting/actions`,
    method: 'GET',
    params,
    signal,
  });
};

export const getReportProjectListQueryKey = (
  params?: ReportProjectListParams,
) => {
  return [`/v1/reporting/actions`, ...(params ? [params] : [])] as const;
};

export const getReportProjectListQueryOptions = <
  TData = Awaited<ReturnType<typeof reportProjectList>>,
  TError = unknown,
>(
  params?: ReportProjectListParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof reportProjectList>>,
        TError,
        TData
      >
    >;
  },
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getReportProjectListQueryKey(params);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof reportProjectList>>
  > = ({ signal }) => reportProjectList(params, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof reportProjectList>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type ReportProjectListQueryResult = NonNullable<
  Awaited<ReturnType<typeof reportProjectList>>
>;
export type ReportProjectListQueryError = unknown;

export const useReportProjectList = <
  TData = Awaited<ReturnType<typeof reportProjectList>>,
  TError = unknown,
>(
  params?: ReportProjectListParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof reportProjectList>>,
        TError,
        TData
      >
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getReportProjectListQueryOptions(params, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

export const reportProjectGetRewards = (
  integrationId: string,
  params?: ReportProjectGetRewardsParams,
  signal?: AbortSignal,
) => {
  return customFetch<ReportProjectGetRewards200>({
    url: `/v1/reporting/rewards/${integrationId}`,
    method: 'GET',
    params,
    signal,
  });
};

export const getReportProjectGetRewardsQueryKey = (
  integrationId: string,
  params?: ReportProjectGetRewardsParams,
) => {
  return [
    `/v1/reporting/rewards/${integrationId}`,
    ...(params ? [params] : []),
  ] as const;
};

export const getReportProjectGetRewardsQueryOptions = <
  TData = Awaited<ReturnType<typeof reportProjectGetRewards>>,
  TError = unknown,
>(
  integrationId: string,
  params?: ReportProjectGetRewardsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof reportProjectGetRewards>>,
        TError,
        TData
      >
    >;
  },
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ??
    getReportProjectGetRewardsQueryKey(integrationId, params);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof reportProjectGetRewards>>
  > = ({ signal }) => reportProjectGetRewards(integrationId, params, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!integrationId,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof reportProjectGetRewards>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type ReportProjectGetRewardsQueryResult = NonNullable<
  Awaited<ReturnType<typeof reportProjectGetRewards>>
>;
export type ReportProjectGetRewardsQueryError = unknown;

export const useReportProjectGetRewards = <
  TData = Awaited<ReturnType<typeof reportProjectGetRewards>>,
  TError = unknown,
>(
  integrationId: string,
  params?: ReportProjectGetRewardsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof reportProjectGetRewards>>,
        TError,
        TData
      >
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getReportProjectGetRewardsQueryOptions(
    integrationId,
    params,
    options,
  );

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

/**
 * Returns a action with associated transactions
 * @summary Get action
 */
export const actionGetAction = (actionId: string, signal?: AbortSignal) => {
  return customFetch<ActionDto>({
    url: `/v1/actions/${actionId}`,
    method: 'GET',
    signal,
  });
};

export const getActionGetActionQueryKey = (actionId: string) => {
  return [`/v1/actions/${actionId}`] as const;
};

export const getActionGetActionQueryOptions = <
  TData = Awaited<ReturnType<typeof actionGetAction>>,
  TError = StakeKitErrorDto,
>(
  actionId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof actionGetAction>>,
        TError,
        TData
      >
    >;
  },
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getActionGetActionQueryKey(actionId);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof actionGetAction>>> = ({
    signal,
  }) => actionGetAction(actionId, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!actionId,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof actionGetAction>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type ActionGetActionQueryResult = NonNullable<
  Awaited<ReturnType<typeof actionGetAction>>
>;
export type ActionGetActionQueryError = StakeKitErrorDto;

/**
 * @summary Get action
 */
export const useActionGetAction = <
  TData = Awaited<ReturnType<typeof actionGetAction>>,
  TError = StakeKitErrorDto,
>(
  actionId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof actionGetAction>>,
        TError,
        TData
      >
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getActionGetActionQueryOptions(actionId, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

/**
 * Returns a gas estimate
 * @summary Get estimated gas for action
 */
export const actionGetGasEstimate = (
  actionId: string,
  signal?: AbortSignal,
) => {
  return customFetch<ActionGasEstimateDto>({
    url: `/v1/actions/${actionId}/gas-estimate`,
    method: 'GET',
    signal,
  });
};

export const getActionGetGasEstimateQueryKey = (actionId: string) => {
  return [`/v1/actions/${actionId}/gas-estimate`] as const;
};

export const getActionGetGasEstimateQueryOptions = <
  TData = Awaited<ReturnType<typeof actionGetGasEstimate>>,
  TError = StakeKitErrorDto,
>(
  actionId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof actionGetGasEstimate>>,
        TError,
        TData
      >
    >;
  },
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getActionGetGasEstimateQueryKey(actionId);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof actionGetGasEstimate>>
  > = ({ signal }) => actionGetGasEstimate(actionId, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!actionId,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof actionGetGasEstimate>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type ActionGetGasEstimateQueryResult = NonNullable<
  Awaited<ReturnType<typeof actionGetGasEstimate>>
>;
export type ActionGetGasEstimateQueryError = StakeKitErrorDto;

/**
 * @summary Get estimated gas for action
 */
export const useActionGetGasEstimate = <
  TData = Awaited<ReturnType<typeof actionGetGasEstimate>>,
  TError = StakeKitErrorDto,
>(
  actionId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof actionGetGasEstimate>>,
        TError,
        TData
      >
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getActionGetGasEstimateQueryOptions(actionId, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

/**
 * Get the transactions necessary to enter a yield bearing position
 * @summary Create "enter" action
 */
export const actionEnter = (actionRequestDto: ActionRequestDto) => {
  return customFetch<ActionDto>({
    url: `/v1/actions/enter`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: actionRequestDto,
  });
};

export const getActionEnterMutationOptions = <
  TError = StakeKitErrorDto | GeolocationError,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof actionEnter>>,
    TError,
    { data: ActionRequestDto },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof actionEnter>>,
  TError,
  { data: ActionRequestDto },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof actionEnter>>,
    { data: ActionRequestDto }
  > = (props) => {
    const { data } = props ?? {};

    return actionEnter(data);
  };

  return { mutationFn, ...mutationOptions };
};

export type ActionEnterMutationResult = NonNullable<
  Awaited<ReturnType<typeof actionEnter>>
>;
export type ActionEnterMutationBody = ActionRequestDto;
export type ActionEnterMutationError = StakeKitErrorDto | GeolocationError;

/**
 * @summary Create "enter" action
 */
export const useActionEnter = <
  TError = StakeKitErrorDto | GeolocationError,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof actionEnter>>,
    TError,
    { data: ActionRequestDto },
    TContext
  >;
}) => {
  const mutationOptions = getActionEnterMutationOptions(options);

  return useMutation(mutationOptions);
};

/**
 * Get the transactions necessary to exit a yield bearing position
 * @summary Create "exit" action
 */
export const actionExit = (actionRequestDto: ActionRequestDto) => {
  return customFetch<ActionDto>({
    url: `/v1/actions/exit`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: actionRequestDto,
  });
};

export const getActionExitMutationOptions = <
  TError = StakeKitErrorDto | GeolocationError,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof actionExit>>,
    TError,
    { data: ActionRequestDto },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof actionExit>>,
  TError,
  { data: ActionRequestDto },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof actionExit>>,
    { data: ActionRequestDto }
  > = (props) => {
    const { data } = props ?? {};

    return actionExit(data);
  };

  return { mutationFn, ...mutationOptions };
};

export type ActionExitMutationResult = NonNullable<
  Awaited<ReturnType<typeof actionExit>>
>;
export type ActionExitMutationBody = ActionRequestDto;
export type ActionExitMutationError = StakeKitErrorDto | GeolocationError;

/**
 * @summary Create "exit" action
 */
export const useActionExit = <
  TError = StakeKitErrorDto | GeolocationError,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof actionExit>>,
    TError,
    { data: ActionRequestDto },
    TContext
  >;
}) => {
  const mutationOptions = getActionExitMutationOptions(options);

  return useMutation(mutationOptions);
};

/**
 * Get the transactions to apply a pending action
 * @summary Create "pending" action
 */
export const actionPending = (
  pendingActionRequestDto: PendingActionRequestDto,
) => {
  return customFetch<ActionDto>({
    url: `/v1/actions/pending`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: pendingActionRequestDto,
  });
};

export const getActionPendingMutationOptions = <
  TError = StakeKitErrorDto | GeolocationError,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof actionPending>>,
    TError,
    { data: PendingActionRequestDto },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof actionPending>>,
  TError,
  { data: PendingActionRequestDto },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof actionPending>>,
    { data: PendingActionRequestDto }
  > = (props) => {
    const { data } = props ?? {};

    return actionPending(data);
  };

  return { mutationFn, ...mutationOptions };
};

export type ActionPendingMutationResult = NonNullable<
  Awaited<ReturnType<typeof actionPending>>
>;
export type ActionPendingMutationBody = PendingActionRequestDto;
export type ActionPendingMutationError = StakeKitErrorDto | GeolocationError;

/**
 * @summary Create "pending" action
 */
export const useActionPending = <
  TError = StakeKitErrorDto | GeolocationError,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof actionPending>>,
    TError,
    { data: PendingActionRequestDto },
    TContext
  >;
}) => {
  const mutationOptions = getActionPendingMutationOptions(options);

  return useMutation(mutationOptions);
};

/**
 * Get the estimated gas necessary to enter a yield bearing position
 * @summary Estimate gas for the "enter" action
 */
export const actionEnterGasEstimation = (
  actionGasEstimateRequestDto: ActionGasEstimateRequestDto,
) => {
  return customFetch<ActionGasEstimateDto>({
    url: `/v1/actions/enter/estimate-gas`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: actionGasEstimateRequestDto,
  });
};

export const getActionEnterGasEstimationQueryKey = (
  actionGasEstimateRequestDto: ActionGasEstimateRequestDto,
) => {
  return [
    `/v1/actions/enter/estimate-gas`,
    actionGasEstimateRequestDto,
  ] as const;
};

export const getActionEnterGasEstimationQueryOptions = <
  TData = Awaited<ReturnType<typeof actionEnterGasEstimation>>,
  TError = StakeKitErrorDto,
>(
  actionGasEstimateRequestDto: ActionGasEstimateRequestDto,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof actionEnterGasEstimation>>,
        TError,
        TData
      >
    >;
  },
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ??
    getActionEnterGasEstimationQueryKey(actionGasEstimateRequestDto);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof actionEnterGasEstimation>>
  > = () => actionEnterGasEstimation(actionGasEstimateRequestDto);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof actionEnterGasEstimation>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type ActionEnterGasEstimationQueryResult = NonNullable<
  Awaited<ReturnType<typeof actionEnterGasEstimation>>
>;
export type ActionEnterGasEstimationQueryError = StakeKitErrorDto;

/**
 * @summary Estimate gas for the "enter" action
 */
export const useActionEnterGasEstimation = <
  TData = Awaited<ReturnType<typeof actionEnterGasEstimation>>,
  TError = StakeKitErrorDto,
>(
  actionGasEstimateRequestDto: ActionGasEstimateRequestDto,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof actionEnterGasEstimation>>,
        TError,
        TData
      >
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getActionEnterGasEstimationQueryOptions(
    actionGasEstimateRequestDto,
    options,
  );

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

/**
 * Get the estimated gas necessary to exit a yield bearing position
 * @summary Estimate gas for the "exit" action
 */
export const actionExitGasEstimate = (
  actionGasEstimateRequestDto: ActionGasEstimateRequestDto,
) => {
  return customFetch<ActionGasEstimateDto>({
    url: `/v1/actions/exit/estimate-gas`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: actionGasEstimateRequestDto,
  });
};

export const getActionExitGasEstimateQueryKey = (
  actionGasEstimateRequestDto: ActionGasEstimateRequestDto,
) => {
  return [
    `/v1/actions/exit/estimate-gas`,
    actionGasEstimateRequestDto,
  ] as const;
};

export const getActionExitGasEstimateQueryOptions = <
  TData = Awaited<ReturnType<typeof actionExitGasEstimate>>,
  TError = StakeKitErrorDto,
>(
  actionGasEstimateRequestDto: ActionGasEstimateRequestDto,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof actionExitGasEstimate>>,
        TError,
        TData
      >
    >;
  },
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ??
    getActionExitGasEstimateQueryKey(actionGasEstimateRequestDto);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof actionExitGasEstimate>>
  > = () => actionExitGasEstimate(actionGasEstimateRequestDto);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof actionExitGasEstimate>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type ActionExitGasEstimateQueryResult = NonNullable<
  Awaited<ReturnType<typeof actionExitGasEstimate>>
>;
export type ActionExitGasEstimateQueryError = StakeKitErrorDto;

/**
 * @summary Estimate gas for the "exit" action
 */
export const useActionExitGasEstimate = <
  TData = Awaited<ReturnType<typeof actionExitGasEstimate>>,
  TError = StakeKitErrorDto,
>(
  actionGasEstimateRequestDto: ActionGasEstimateRequestDto,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof actionExitGasEstimate>>,
        TError,
        TData
      >
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getActionExitGasEstimateQueryOptions(
    actionGasEstimateRequestDto,
    options,
  );

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

/**
 * Returns a paginated list of actions with associated transactions
 * @summary Get actions
 */
export const actionList = (params: ActionListParams, signal?: AbortSignal) => {
  return customFetch<ActionList200>({
    url: `/v1/actions`,
    method: 'GET',
    params,
    signal,
  });
};

export const getActionListQueryKey = (params: ActionListParams) => {
  return [`/v1/actions`, ...(params ? [params] : [])] as const;
};

export const getActionListQueryOptions = <
  TData = Awaited<ReturnType<typeof actionList>>,
  TError = StakeKitErrorDto,
>(
  params: ActionListParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof actionList>>, TError, TData>
    >;
  },
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getActionListQueryKey(params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof actionList>>> = ({
    signal,
  }) => actionList(params, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof actionList>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type ActionListQueryResult = NonNullable<
  Awaited<ReturnType<typeof actionList>>
>;
export type ActionListQueryError = StakeKitErrorDto;

/**
 * @summary Get actions
 */
export const useActionList = <
  TData = Awaited<ReturnType<typeof actionList>>,
  TError = StakeKitErrorDto,
>(
  params: ActionListParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof actionList>>, TError, TData>
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getActionListQueryOptions(params, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

/**
 * Get the estimated gas necessary to apply a pending action
 * @summary Estimate gas for the "pending" action
 */
export const actionPendingGasEstimate = (
  pendingActionGasEstimateRequestDto: PendingActionGasEstimateRequestDto,
) => {
  return customFetch<ActionGasEstimateDto>({
    url: `/v1/actions/pending/estimate-gas`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: pendingActionGasEstimateRequestDto,
  });
};

export const getActionPendingGasEstimateQueryKey = (
  pendingActionGasEstimateRequestDto: PendingActionGasEstimateRequestDto,
) => {
  return [
    `/v1/actions/pending/estimate-gas`,
    pendingActionGasEstimateRequestDto,
  ] as const;
};

export const getActionPendingGasEstimateQueryOptions = <
  TData = Awaited<ReturnType<typeof actionPendingGasEstimate>>,
  TError = StakeKitErrorDto,
>(
  pendingActionGasEstimateRequestDto: PendingActionGasEstimateRequestDto,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof actionPendingGasEstimate>>,
        TError,
        TData
      >
    >;
  },
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ??
    getActionPendingGasEstimateQueryKey(pendingActionGasEstimateRequestDto);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof actionPendingGasEstimate>>
  > = () => actionPendingGasEstimate(pendingActionGasEstimateRequestDto);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof actionPendingGasEstimate>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type ActionPendingGasEstimateQueryResult = NonNullable<
  Awaited<ReturnType<typeof actionPendingGasEstimate>>
>;
export type ActionPendingGasEstimateQueryError = StakeKitErrorDto;

/**
 * @summary Estimate gas for the "pending" action
 */
export const useActionPendingGasEstimate = <
  TData = Awaited<ReturnType<typeof actionPendingGasEstimate>>,
  TError = StakeKitErrorDto,
>(
  pendingActionGasEstimateRequestDto: PendingActionGasEstimateRequestDto,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof actionPendingGasEstimate>>,
        TError,
        TData
      >
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getActionPendingGasEstimateQueryOptions(
    pendingActionGasEstimateRequestDto,
    options,
  );

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

/**
 * Returns a transaction
 * @summary Get transaction
 */
export const transactionGetTransaction = (
  transactionId: string,
  signal?: AbortSignal,
) => {
  return customFetch<TransactionDto>({
    url: `/v1/transactions/${transactionId}`,
    method: 'GET',
    signal,
  });
};

export const getTransactionGetTransactionQueryKey = (transactionId: string) => {
  return [`/v1/transactions/${transactionId}`] as const;
};

export const getTransactionGetTransactionQueryOptions = <
  TData = Awaited<ReturnType<typeof transactionGetTransaction>>,
  TError = StakeKitErrorDto,
>(
  transactionId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof transactionGetTransaction>>,
        TError,
        TData
      >
    >;
  },
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ??
    getTransactionGetTransactionQueryKey(transactionId);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof transactionGetTransaction>>
  > = ({ signal }) => transactionGetTransaction(transactionId, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!transactionId,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof transactionGetTransaction>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type TransactionGetTransactionQueryResult = NonNullable<
  Awaited<ReturnType<typeof transactionGetTransaction>>
>;
export type TransactionGetTransactionQueryError = StakeKitErrorDto;

/**
 * @summary Get transaction
 */
export const useTransactionGetTransaction = <
  TData = Awaited<ReturnType<typeof transactionGetTransaction>>,
  TError = StakeKitErrorDto,
>(
  transactionId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof transactionGetTransaction>>,
        TError,
        TData
      >
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getTransactionGetTransactionQueryOptions(
    transactionId,
    options,
  );

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

/**
 * Constructs an unsigned transaction given a transaction id and optional gas parameters
 * @summary Construct transaction
 */
export const transactionConstruct = (
  transactionId: string,
  constructTransactionRequestDto: ConstructTransactionRequestDto,
) => {
  return customFetch<TransactionDto>({
    url: `/v1/transactions/${transactionId}`,
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    data: constructTransactionRequestDto,
  });
};

export const getTransactionConstructMutationOptions = <
  TError = StakeKitErrorDto | GeolocationError,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof transactionConstruct>>,
    TError,
    { transactionId: string; data: ConstructTransactionRequestDto },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof transactionConstruct>>,
  TError,
  { transactionId: string; data: ConstructTransactionRequestDto },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof transactionConstruct>>,
    { transactionId: string; data: ConstructTransactionRequestDto }
  > = (props) => {
    const { transactionId, data } = props ?? {};

    return transactionConstruct(transactionId, data);
  };

  return { mutationFn, ...mutationOptions };
};

export type TransactionConstructMutationResult = NonNullable<
  Awaited<ReturnType<typeof transactionConstruct>>
>;
export type TransactionConstructMutationBody = ConstructTransactionRequestDto;
export type TransactionConstructMutationError =
  | StakeKitErrorDto
  | GeolocationError;

/**
 * @summary Construct transaction
 */
export const useTransactionConstruct = <
  TError = StakeKitErrorDto | GeolocationError,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof transactionConstruct>>,
    TError,
    { transactionId: string; data: ConstructTransactionRequestDto },
    TContext
  >;
}) => {
  const mutationOptions = getTransactionConstructMutationOptions(options);

  return useMutation(mutationOptions);
};

/**
 * Submits the signed transactions for broadcasting
 * @summary Submit transaction
 */
export const transactionSubmit = (
  transactionId: string,
  submitRequestDto: SubmitRequestDto,
) => {
  return customFetch<SubmitResponseDto>({
    url: `/v1/transactions/${transactionId}/submit`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: submitRequestDto,
  });
};

export const getTransactionSubmitMutationOptions = <
  TError = StakeKitErrorDto | GeolocationError,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof transactionSubmit>>,
    TError,
    { transactionId: string; data: SubmitRequestDto },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof transactionSubmit>>,
  TError,
  { transactionId: string; data: SubmitRequestDto },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof transactionSubmit>>,
    { transactionId: string; data: SubmitRequestDto }
  > = (props) => {
    const { transactionId, data } = props ?? {};

    return transactionSubmit(transactionId, data);
  };

  return { mutationFn, ...mutationOptions };
};

export type TransactionSubmitMutationResult = NonNullable<
  Awaited<ReturnType<typeof transactionSubmit>>
>;
export type TransactionSubmitMutationBody = SubmitRequestDto;
export type TransactionSubmitMutationError =
  | StakeKitErrorDto
  | GeolocationError;

/**
 * @summary Submit transaction
 */
export const useTransactionSubmit = <
  TError = StakeKitErrorDto | GeolocationError,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof transactionSubmit>>,
    TError,
    { transactionId: string; data: SubmitRequestDto },
    TContext
  >;
}) => {
  const mutationOptions = getTransactionSubmitMutationOptions(options);

  return useMutation(mutationOptions);
};

/**
 * Submit a hash of an already broadcasted transaction
 * @summary Submit transaction hash
 */
export const transactionSubmitHash = (
  transactionId: string,
  submitHashRequestDto: SubmitHashRequestDto,
) => {
  return customFetch<void>({
    url: `/v1/transactions/${transactionId}/submit_hash`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: submitHashRequestDto,
  });
};

export const getTransactionSubmitHashMutationOptions = <
  TError = StakeKitErrorDto | GeolocationError,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof transactionSubmitHash>>,
    TError,
    { transactionId: string; data: SubmitHashRequestDto },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof transactionSubmitHash>>,
  TError,
  { transactionId: string; data: SubmitHashRequestDto },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof transactionSubmitHash>>,
    { transactionId: string; data: SubmitHashRequestDto }
  > = (props) => {
    const { transactionId, data } = props ?? {};

    return transactionSubmitHash(transactionId, data);
  };

  return { mutationFn, ...mutationOptions };
};

export type TransactionSubmitHashMutationResult = NonNullable<
  Awaited<ReturnType<typeof transactionSubmitHash>>
>;
export type TransactionSubmitHashMutationBody = SubmitHashRequestDto;
export type TransactionSubmitHashMutationError =
  | StakeKitErrorDto
  | GeolocationError;

/**
 * @summary Submit transaction hash
 */
export const useTransactionSubmitHash = <
  TError = StakeKitErrorDto | GeolocationError,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof transactionSubmitHash>>,
    TError,
    { transactionId: string; data: SubmitHashRequestDto },
    TContext
  >;
}) => {
  const mutationOptions = getTransactionSubmitHashMutationOptions(options);

  return useMutation(mutationOptions);
};

/**
 * Returns the transaction status given a transaction id
 * @summary Get transaction status
 */
export const transactionGetTransactionStatusFromId = (
  transactionId: string,
  signal?: AbortSignal,
) => {
  return customFetch<TransactionStatusResponseDto>({
    url: `/v1/transactions/${transactionId}/status`,
    method: 'GET',
    signal,
  });
};

export const getTransactionGetTransactionStatusFromIdQueryKey = (
  transactionId: string,
) => {
  return [`/v1/transactions/${transactionId}/status`] as const;
};

export const getTransactionGetTransactionStatusFromIdQueryOptions = <
  TData = Awaited<ReturnType<typeof transactionGetTransactionStatusFromId>>,
  TError = StakeKitErrorDto,
>(
  transactionId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof transactionGetTransactionStatusFromId>>,
        TError,
        TData
      >
    >;
  },
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ??
    getTransactionGetTransactionStatusFromIdQueryKey(transactionId);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof transactionGetTransactionStatusFromId>>
  > = ({ signal }) =>
    transactionGetTransactionStatusFromId(transactionId, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!transactionId,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof transactionGetTransactionStatusFromId>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type TransactionGetTransactionStatusFromIdQueryResult = NonNullable<
  Awaited<ReturnType<typeof transactionGetTransactionStatusFromId>>
>;
export type TransactionGetTransactionStatusFromIdQueryError = StakeKitErrorDto;

/**
 * @summary Get transaction status
 */
export const useTransactionGetTransactionStatusFromId = <
  TData = Awaited<ReturnType<typeof transactionGetTransactionStatusFromId>>,
  TError = StakeKitErrorDto,
>(
  transactionId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof transactionGetTransactionStatusFromId>>,
        TError,
        TData
      >
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getTransactionGetTransactionStatusFromIdQueryOptions(
    transactionId,
    options,
  );

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

/**
 * Returns the current gas parameters for a network
 * @summary Get current gas parameters
 */
export const transactionGetGasForNetwork = (
  network: string,
  signal?: AbortSignal,
) => {
  return customFetch<GasForNetworkResponseDto>({
    url: `/v1/transactions/gas/${network}`,
    method: 'GET',
    signal,
  });
};

export const getTransactionGetGasForNetworkQueryKey = (network: string) => {
  return [`/v1/transactions/gas/${network}`] as const;
};

export const getTransactionGetGasForNetworkQueryOptions = <
  TData = Awaited<ReturnType<typeof transactionGetGasForNetwork>>,
  TError = StakeKitErrorDto,
>(
  network: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof transactionGetGasForNetwork>>,
        TError,
        TData
      >
    >;
  },
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getTransactionGetGasForNetworkQueryKey(network);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof transactionGetGasForNetwork>>
  > = ({ signal }) => transactionGetGasForNetwork(network, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!network,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof transactionGetGasForNetwork>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type TransactionGetGasForNetworkQueryResult = NonNullable<
  Awaited<ReturnType<typeof transactionGetGasForNetwork>>
>;
export type TransactionGetGasForNetworkQueryError = StakeKitErrorDto;

/**
 * @summary Get current gas parameters
 */
export const useTransactionGetGasForNetwork = <
  TData = Awaited<ReturnType<typeof transactionGetGasForNetwork>>,
  TError = StakeKitErrorDto,
>(
  network: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof transactionGetGasForNetwork>>,
        TError,
        TData
      >
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getTransactionGetGasForNetworkQueryOptions(
    network,
    options,
  );

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

/**
 * Returns the transaction status given a transaction hash and a network
 * @summary Get transaction status
 */
export const transactionGetTransactionStatusByNetworkAndHash = (
  network: string,
  hash: string,
  signal?: AbortSignal,
) => {
  return customFetch<TransactionStatusResponseDto>({
    url: `/v1/transactions/status/${network}/${hash}`,
    method: 'GET',
    signal,
  });
};

export const getTransactionGetTransactionStatusByNetworkAndHashQueryKey = (
  network: string,
  hash: string,
) => {
  return [`/v1/transactions/status/${network}/${hash}`] as const;
};

export const getTransactionGetTransactionStatusByNetworkAndHashQueryOptions = <
  TData = Awaited<
    ReturnType<typeof transactionGetTransactionStatusByNetworkAndHash>
  >,
  TError = StakeKitErrorDto,
>(
  network: string,
  hash: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<
          ReturnType<typeof transactionGetTransactionStatusByNetworkAndHash>
        >,
        TError,
        TData
      >
    >;
  },
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ??
    getTransactionGetTransactionStatusByNetworkAndHashQueryKey(network, hash);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof transactionGetTransactionStatusByNetworkAndHash>>
  > = ({ signal }) =>
    transactionGetTransactionStatusByNetworkAndHash(network, hash, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!(network && hash),
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof transactionGetTransactionStatusByNetworkAndHash>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type TransactionGetTransactionStatusByNetworkAndHashQueryResult =
  NonNullable<
    Awaited<ReturnType<typeof transactionGetTransactionStatusByNetworkAndHash>>
  >;
export type TransactionGetTransactionStatusByNetworkAndHashQueryError =
  StakeKitErrorDto;

/**
 * @summary Get transaction status
 */
export const useTransactionGetTransactionStatusByNetworkAndHash = <
  TData = Awaited<
    ReturnType<typeof transactionGetTransactionStatusByNetworkAndHash>
  >,
  TError = StakeKitErrorDto,
>(
  network: string,
  hash: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<
          ReturnType<typeof transactionGetTransactionStatusByNetworkAndHash>
        >,
        TError,
        TData
      >
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions =
    getTransactionGetTransactionStatusByNetworkAndHashQueryOptions(
      network,
      hash,
      options,
    );

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

/**
 * Returns the transaction or message to sign to provide verification
 * @summary Get transaction verification transaction/message
 */
export const transactionGetTransactionVerificationMessageForNetwork = (
  network: string,
  transactionVerificationMessageRequestDto: TransactionVerificationMessageRequestDto,
) => {
  return customFetch<TransactionVerificationMessageDto>({
    url: `/v1/transactions/verification/${network}`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: transactionVerificationMessageRequestDto,
  });
};

export const getTransactionGetTransactionVerificationMessageForNetworkMutationOptions =
  <TError = StakeKitErrorDto | GeolocationError, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<
      Awaited<
        ReturnType<
          typeof transactionGetTransactionVerificationMessageForNetwork
        >
      >,
      TError,
      { network: string; data: TransactionVerificationMessageRequestDto },
      TContext
    >;
  }): UseMutationOptions<
    Awaited<
      ReturnType<typeof transactionGetTransactionVerificationMessageForNetwork>
    >,
    TError,
    { network: string; data: TransactionVerificationMessageRequestDto },
    TContext
  > => {
    const { mutation: mutationOptions } = options ?? {};

    const mutationFn: MutationFunction<
      Awaited<
        ReturnType<
          typeof transactionGetTransactionVerificationMessageForNetwork
        >
      >,
      { network: string; data: TransactionVerificationMessageRequestDto }
    > = (props) => {
      const { network, data } = props ?? {};

      return transactionGetTransactionVerificationMessageForNetwork(
        network,
        data,
      );
    };

    return { mutationFn, ...mutationOptions };
  };

export type TransactionGetTransactionVerificationMessageForNetworkMutationResult =
  NonNullable<
    Awaited<
      ReturnType<typeof transactionGetTransactionVerificationMessageForNetwork>
    >
  >;
export type TransactionGetTransactionVerificationMessageForNetworkMutationBody =
  TransactionVerificationMessageRequestDto;
export type TransactionGetTransactionVerificationMessageForNetworkMutationError =
  StakeKitErrorDto | GeolocationError;

/**
 * @summary Get transaction verification transaction/message
 */
export const useTransactionGetTransactionVerificationMessageForNetwork = <
  TError = StakeKitErrorDto | GeolocationError,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<typeof transactionGetTransactionVerificationMessageForNetwork>
    >,
    TError,
    { network: string; data: TransactionVerificationMessageRequestDto },
    TContext
  >;
}) => {
  const mutationOptions =
    getTransactionGetTransactionVerificationMessageForNetworkMutationOptions(
      options,
    );

  return useMutation(mutationOptions);
};

/**
 * Returns the input tokens of the enabled yields
 * @summary Get enabled tokens
 */
export const tokenGetTokens = (
  params?: TokenGetTokensParams,
  signal?: AbortSignal,
) => {
  return customFetch<TokenWithAvailableYieldsDto[]>({
    url: `/v1/tokens`,
    method: 'GET',
    params,
    signal,
  });
};

export const getTokenGetTokensQueryKey = (params?: TokenGetTokensParams) => {
  return [`/v1/tokens`, ...(params ? [params] : [])] as const;
};

export const getTokenGetTokensQueryOptions = <
  TData = Awaited<ReturnType<typeof tokenGetTokens>>,
  TError = StakeKitErrorDto,
>(
  params?: TokenGetTokensParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof tokenGetTokens>>, TError, TData>
    >;
  },
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getTokenGetTokensQueryKey(params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof tokenGetTokens>>> = ({
    signal,
  }) => tokenGetTokens(params, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof tokenGetTokens>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type TokenGetTokensQueryResult = NonNullable<
  Awaited<ReturnType<typeof tokenGetTokens>>
>;
export type TokenGetTokensQueryError = StakeKitErrorDto;

/**
 * @summary Get enabled tokens
 */
export const useTokenGetTokens = <
  TData = Awaited<ReturnType<typeof tokenGetTokens>>,
  TError = StakeKitErrorDto,
>(
  params?: TokenGetTokensParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof tokenGetTokens>>, TError, TData>
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getTokenGetTokensQueryOptions(params, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

/**
 * Returns the token prices for a specific list of tokens
 * @summary Get token prices
 */
export const tokenGetTokenPrices = (priceRequestDto: PriceRequestDto) => {
  return customFetch<PriceResponseDto>({
    url: `/v1/tokens/prices`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: priceRequestDto,
  });
};

export const getTokenGetTokenPricesQueryKey = (
  priceRequestDto: PriceRequestDto,
) => {
  return [`/v1/tokens/prices`, priceRequestDto] as const;
};

export const getTokenGetTokenPricesQueryOptions = <
  TData = Awaited<ReturnType<typeof tokenGetTokenPrices>>,
  TError = StakeKitErrorDto,
>(
  priceRequestDto: PriceRequestDto,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof tokenGetTokenPrices>>,
        TError,
        TData
      >
    >;
  },
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getTokenGetTokenPricesQueryKey(priceRequestDto);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof tokenGetTokenPrices>>
  > = () => tokenGetTokenPrices(priceRequestDto);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof tokenGetTokenPrices>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type TokenGetTokenPricesQueryResult = NonNullable<
  Awaited<ReturnType<typeof tokenGetTokenPrices>>
>;
export type TokenGetTokenPricesQueryError = StakeKitErrorDto;

/**
 * @summary Get token prices
 */
export const useTokenGetTokenPrices = <
  TData = Awaited<ReturnType<typeof tokenGetTokenPrices>>,
  TError = StakeKitErrorDto,
>(
  priceRequestDto: PriceRequestDto,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof tokenGetTokenPrices>>,
        TError,
        TData
      >
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getTokenGetTokenPricesQueryOptions(
    priceRequestDto,
    options,
  );

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

/**
 * Returns the balances for specific addresses and token addresses
 * @summary Get token balances
 */
export const tokenGetTokenBalances = (
  balancesRequestDto: BalancesRequestDto,
) => {
  return customFetch<BalanceResponseDto[]>({
    url: `/v1/tokens/balances`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: balancesRequestDto,
  });
};

export const getTokenGetTokenBalancesQueryKey = (
  balancesRequestDto: BalancesRequestDto,
) => {
  return [`/v1/tokens/balances`, balancesRequestDto] as const;
};

export const getTokenGetTokenBalancesQueryOptions = <
  TData = Awaited<ReturnType<typeof tokenGetTokenBalances>>,
  TError = StakeKitErrorDto,
>(
  balancesRequestDto: BalancesRequestDto,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof tokenGetTokenBalances>>,
        TError,
        TData
      >
    >;
  },
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ??
    getTokenGetTokenBalancesQueryKey(balancesRequestDto);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof tokenGetTokenBalances>>
  > = () => tokenGetTokenBalances(balancesRequestDto);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof tokenGetTokenBalances>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type TokenGetTokenBalancesQueryResult = NonNullable<
  Awaited<ReturnType<typeof tokenGetTokenBalances>>
>;
export type TokenGetTokenBalancesQueryError = StakeKitErrorDto;

/**
 * @summary Get token balances
 */
export const useTokenGetTokenBalances = <
  TData = Awaited<ReturnType<typeof tokenGetTokenBalances>>,
  TError = StakeKitErrorDto,
>(
  balancesRequestDto: BalancesRequestDto,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof tokenGetTokenBalances>>,
        TError,
        TData
      >
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getTokenGetTokenBalancesQueryOptions(
    balancesRequestDto,
    options,
  );

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

/**
 * Given addresses and integration ids, returns respective balances and configuration.
 * @summary Get yield balances
 */
export const yieldGetMultipleYieldBalances = (
  yieldBalanceWithIntegrationIdRequestDto: YieldBalanceWithIntegrationIdRequestDto[],
) => {
  return customFetch<YieldBalancesWithIntegrationIdDto[]>({
    url: `/v1/yields/balances`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: yieldBalanceWithIntegrationIdRequestDto,
  });
};

export const getYieldGetMultipleYieldBalancesQueryKey = (
  yieldBalanceWithIntegrationIdRequestDto: YieldBalanceWithIntegrationIdRequestDto[],
) => {
  return [
    `/v1/yields/balances`,
    yieldBalanceWithIntegrationIdRequestDto,
  ] as const;
};

export const getYieldGetMultipleYieldBalancesQueryOptions = <
  TData = Awaited<ReturnType<typeof yieldGetMultipleYieldBalances>>,
  TError = StakeKitErrorDto,
>(
  yieldBalanceWithIntegrationIdRequestDto: YieldBalanceWithIntegrationIdRequestDto[],
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof yieldGetMultipleYieldBalances>>,
        TError,
        TData
      >
    >;
  },
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ??
    getYieldGetMultipleYieldBalancesQueryKey(
      yieldBalanceWithIntegrationIdRequestDto,
    );

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof yieldGetMultipleYieldBalances>>
  > = () =>
    yieldGetMultipleYieldBalances(yieldBalanceWithIntegrationIdRequestDto);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof yieldGetMultipleYieldBalances>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type YieldGetMultipleYieldBalancesQueryResult = NonNullable<
  Awaited<ReturnType<typeof yieldGetMultipleYieldBalances>>
>;
export type YieldGetMultipleYieldBalancesQueryError = StakeKitErrorDto;

/**
 * @summary Get yield balances
 */
export const useYieldGetMultipleYieldBalances = <
  TData = Awaited<ReturnType<typeof yieldGetMultipleYieldBalances>>,
  TError = StakeKitErrorDto,
>(
  yieldBalanceWithIntegrationIdRequestDto: YieldBalanceWithIntegrationIdRequestDto[],
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof yieldGetMultipleYieldBalances>>,
        TError,
        TData
      >
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getYieldGetMultipleYieldBalancesQueryOptions(
    yieldBalanceWithIntegrationIdRequestDto,
    options,
  );

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

/**
 * Returns the enabled yields (staking, lending, vaults, etc) with configuration and metadata
 * @summary Get enabled yields
 */
export const yieldGetMyYields = (
  params?: YieldGetMyYieldsParams,
  signal?: AbortSignal,
) => {
  return customFetch<YieldGetMyYields200>({
    url: `/v1/yields/enabled`,
    method: 'GET',
    params,
    signal,
  });
};

export const getYieldGetMyYieldsQueryKey = (
  params?: YieldGetMyYieldsParams,
) => {
  return [`/v1/yields/enabled`, ...(params ? [params] : [])] as const;
};

export const getYieldGetMyYieldsQueryOptions = <
  TData = Awaited<ReturnType<typeof yieldGetMyYields>>,
  TError = StakeKitErrorDto,
>(
  params?: YieldGetMyYieldsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof yieldGetMyYields>>,
        TError,
        TData
      >
    >;
  },
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getYieldGetMyYieldsQueryKey(params);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof yieldGetMyYields>>
  > = ({ signal }) => yieldGetMyYields(params, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof yieldGetMyYields>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type YieldGetMyYieldsQueryResult = NonNullable<
  Awaited<ReturnType<typeof yieldGetMyYields>>
>;
export type YieldGetMyYieldsQueryError = StakeKitErrorDto;

/**
 * @summary Get enabled yields
 */
export const useYieldGetMyYields = <
  TData = Awaited<ReturnType<typeof yieldGetMyYields>>,
  TError = StakeKitErrorDto,
>(
  params?: YieldGetMyYieldsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof yieldGetMyYields>>,
        TError,
        TData
      >
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getYieldGetMyYieldsQueryOptions(params, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

/**
 * Returns the networks of the enabled yields
 * @summary Get enabled networks
 */
export const yieldGetMyNetworks = (signal?: AbortSignal) => {
  return customFetch<string[]>({
    url: `/v1/yields/enabled/networks`,
    method: 'GET',
    signal,
  });
};

export const getYieldGetMyNetworksQueryKey = () => {
  return [`/v1/yields/enabled/networks`] as const;
};

export const getYieldGetMyNetworksQueryOptions = <
  TData = Awaited<ReturnType<typeof yieldGetMyNetworks>>,
  TError = StakeKitErrorDto | string[],
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof yieldGetMyNetworks>>,
      TError,
      TData
    >
  >;
}) => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getYieldGetMyNetworksQueryKey();

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof yieldGetMyNetworks>>
  > = ({ signal }) => yieldGetMyNetworks(signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof yieldGetMyNetworks>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type YieldGetMyNetworksQueryResult = NonNullable<
  Awaited<ReturnType<typeof yieldGetMyNetworks>>
>;
export type YieldGetMyNetworksQueryError = StakeKitErrorDto | string[];

/**
 * @summary Get enabled networks
 */
export const useYieldGetMyNetworks = <
  TData = Awaited<ReturnType<typeof yieldGetMyNetworks>>,
  TError = StakeKitErrorDto | string[],
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<typeof yieldGetMyNetworks>>,
      TError,
      TData
    >
  >;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getYieldGetMyNetworksQueryOptions(options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

/**
 * Given addresses, returns the available, deposited balance, pending actions and associated configuration for any yield
 * @summary Get single yield balances
 */
export const yieldGetSingleYieldBalances = (
  integrationId: string,
  yieldBalanceRequestDto: YieldBalanceRequestDto,
  params?: YieldGetSingleYieldBalancesParams,
) => {
  return customFetch<YieldBalanceDto[]>({
    url: `/v1/yields/${integrationId}/balances`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: yieldBalanceRequestDto,
    params,
  });
};

export const getYieldGetSingleYieldBalancesQueryKey = (
  integrationId: string,
  yieldBalanceRequestDto: YieldBalanceRequestDto,
  params?: YieldGetSingleYieldBalancesParams,
) => {
  return [
    `/v1/yields/${integrationId}/balances`,
    ...(params ? [params] : []),
    yieldBalanceRequestDto,
  ] as const;
};

export const getYieldGetSingleYieldBalancesQueryOptions = <
  TData = Awaited<ReturnType<typeof yieldGetSingleYieldBalances>>,
  TError = StakeKitErrorDto,
>(
  integrationId: string,
  yieldBalanceRequestDto: YieldBalanceRequestDto,
  params?: YieldGetSingleYieldBalancesParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof yieldGetSingleYieldBalances>>,
        TError,
        TData
      >
    >;
  },
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ??
    getYieldGetSingleYieldBalancesQueryKey(
      integrationId,
      yieldBalanceRequestDto,
      params,
    );

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof yieldGetSingleYieldBalances>>
  > = () =>
    yieldGetSingleYieldBalances(integrationId, yieldBalanceRequestDto, params);

  return {
    queryKey,
    queryFn,
    enabled: !!integrationId,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof yieldGetSingleYieldBalances>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type YieldGetSingleYieldBalancesQueryResult = NonNullable<
  Awaited<ReturnType<typeof yieldGetSingleYieldBalances>>
>;
export type YieldGetSingleYieldBalancesQueryError = StakeKitErrorDto;

/**
 * @summary Get single yield balances
 */
export const useYieldGetSingleYieldBalances = <
  TData = Awaited<ReturnType<typeof yieldGetSingleYieldBalances>>,
  TError = StakeKitErrorDto,
>(
  integrationId: string,
  yieldBalanceRequestDto: YieldBalanceRequestDto,
  params?: YieldGetSingleYieldBalancesParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof yieldGetSingleYieldBalances>>,
        TError,
        TData
      >
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getYieldGetSingleYieldBalancesQueryOptions(
    integrationId,
    yieldBalanceRequestDto,
    params,
    options,
  );

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

/**
 * Given addresses, returns a historic rewards summary for any yield
 * @summary Get yield historic rewards summary
 */
export const yieldGetSingleYieldRewardsSummary = (
  integrationId: string,
  yieldRewardsSummaryRequestDto: YieldRewardsSummaryRequestDto,
) => {
  return customFetch<YieldRewardsSummaryResponseDto>({
    url: `/v1/yields/${integrationId}/rewards-summary`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: yieldRewardsSummaryRequestDto,
  });
};

export const getYieldGetSingleYieldRewardsSummaryMutationOptions = <
  TError = StakeKitErrorDto,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof yieldGetSingleYieldRewardsSummary>>,
    TError,
    { integrationId: string; data: YieldRewardsSummaryRequestDto },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof yieldGetSingleYieldRewardsSummary>>,
  TError,
  { integrationId: string; data: YieldRewardsSummaryRequestDto },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof yieldGetSingleYieldRewardsSummary>>,
    { integrationId: string; data: YieldRewardsSummaryRequestDto }
  > = (props) => {
    const { integrationId, data } = props ?? {};

    return yieldGetSingleYieldRewardsSummary(integrationId, data);
  };

  return { mutationFn, ...mutationOptions };
};

export type YieldGetSingleYieldRewardsSummaryMutationResult = NonNullable<
  Awaited<ReturnType<typeof yieldGetSingleYieldRewardsSummary>>
>;
export type YieldGetSingleYieldRewardsSummaryMutationBody =
  YieldRewardsSummaryRequestDto;
export type YieldGetSingleYieldRewardsSummaryMutationError = StakeKitErrorDto;

/**
 * @summary Get yield historic rewards summary
 */
export const useYieldGetSingleYieldRewardsSummary = <
  TError = StakeKitErrorDto,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof yieldGetSingleYieldRewardsSummary>>,
    TError,
    { integrationId: string; data: YieldRewardsSummaryRequestDto },
    TContext
  >;
}) => {
  const mutationOptions =
    getYieldGetSingleYieldRewardsSummaryMutationOptions(options);

  return useMutation(mutationOptions);
};

/**
 * Returns a fee configuraion that contains details about fees taken when interacting with the yield.
 * @summary Get yield fee configuration
 */
export const yieldGetFeeConfiguration = (
  integrationId: string,
  signal?: AbortSignal,
) => {
  return customFetch<FeeConfigurationDto>({
    url: `/v1/yields/${integrationId}/fee-configuration`,
    method: 'GET',
    signal,
  });
};

export const getYieldGetFeeConfigurationQueryKey = (integrationId: string) => {
  return [`/v1/yields/${integrationId}/fee-configuration`] as const;
};

export const getYieldGetFeeConfigurationQueryOptions = <
  TData = Awaited<ReturnType<typeof yieldGetFeeConfiguration>>,
  TError = StakeKitErrorDto | void,
>(
  integrationId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof yieldGetFeeConfiguration>>,
        TError,
        TData
      >
    >;
  },
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ??
    getYieldGetFeeConfigurationQueryKey(integrationId);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof yieldGetFeeConfiguration>>
  > = ({ signal }) => yieldGetFeeConfiguration(integrationId, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!integrationId,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof yieldGetFeeConfiguration>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type YieldGetFeeConfigurationQueryResult = NonNullable<
  Awaited<ReturnType<typeof yieldGetFeeConfiguration>>
>;
export type YieldGetFeeConfigurationQueryError = StakeKitErrorDto | void;

/**
 * @summary Get yield fee configuration
 */
export const useYieldGetFeeConfiguration = <
  TData = Awaited<ReturnType<typeof yieldGetFeeConfiguration>>,
  TError = StakeKitErrorDto | void,
>(
  integrationId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof yieldGetFeeConfiguration>>,
        TError,
        TData
      >
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getYieldGetFeeConfigurationQueryOptions(
    integrationId,
    options,
  );

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

/**
 * Creates a fee configuration for a yield using a reporting key
 * @summary Create a fee configuration
 */
export const yieldCreateFeeConfiguration = (
  integrationId: string,
  createFeeConfigurationDtoV2: CreateFeeConfigurationDtoV2,
) => {
  return customFetch<FeeConfigurationDto>({
    url: `/v1/yields/${integrationId}/fee-configuration`,
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data: createFeeConfigurationDtoV2,
  });
};

export const getYieldCreateFeeConfigurationMutationOptions = <
  TError = StakeKitErrorDto,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof yieldCreateFeeConfiguration>>,
    TError,
    { integrationId: string; data: CreateFeeConfigurationDtoV2 },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<typeof yieldCreateFeeConfiguration>>,
  TError,
  { integrationId: string; data: CreateFeeConfigurationDtoV2 },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof yieldCreateFeeConfiguration>>,
    { integrationId: string; data: CreateFeeConfigurationDtoV2 }
  > = (props) => {
    const { integrationId, data } = props ?? {};

    return yieldCreateFeeConfiguration(integrationId, data);
  };

  return { mutationFn, ...mutationOptions };
};

export type YieldCreateFeeConfigurationMutationResult = NonNullable<
  Awaited<ReturnType<typeof yieldCreateFeeConfiguration>>
>;
export type YieldCreateFeeConfigurationMutationBody =
  CreateFeeConfigurationDtoV2;
export type YieldCreateFeeConfigurationMutationError = StakeKitErrorDto;

/**
 * @summary Create a fee configuration
 */
export const useYieldCreateFeeConfiguration = <
  TError = StakeKitErrorDto,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof yieldCreateFeeConfiguration>>,
    TError,
    { integrationId: string; data: CreateFeeConfigurationDtoV2 },
    TContext
  >;
}) => {
  const mutationOptions =
    getYieldCreateFeeConfigurationMutationOptions(options);

  return useMutation(mutationOptions);
};

/**
 * Returns the available yields (staking, lending, vaults, etc) with associated configuration and metadata
 * @summary Get all yields
 */
export const yieldV2Yields = (
  params?: YieldV2YieldsParams,
  signal?: AbortSignal,
) => {
  return customFetch<YieldV2Yields200>({
    url: `/v2/yields`,
    method: 'GET',
    params,
    signal,
  });
};

export const getYieldV2YieldsQueryKey = (params?: YieldV2YieldsParams) => {
  return [`/v2/yields`, ...(params ? [params] : [])] as const;
};

export const getYieldV2YieldsQueryOptions = <
  TData = Awaited<ReturnType<typeof yieldV2Yields>>,
  TError = StakeKitErrorDto,
>(
  params?: YieldV2YieldsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof yieldV2Yields>>, TError, TData>
    >;
  },
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getYieldV2YieldsQueryKey(params);

  const queryFn: QueryFunction<Awaited<ReturnType<typeof yieldV2Yields>>> = ({
    signal,
  }) => yieldV2Yields(params, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof yieldV2Yields>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type YieldV2YieldsQueryResult = NonNullable<
  Awaited<ReturnType<typeof yieldV2Yields>>
>;
export type YieldV2YieldsQueryError = StakeKitErrorDto;

/**
 * @summary Get all yields
 */
export const useYieldV2Yields = <
  TData = Awaited<ReturnType<typeof yieldV2Yields>>,
  TError = StakeKitErrorDto,
>(
  params?: YieldV2YieldsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<Awaited<ReturnType<typeof yieldV2Yields>>, TError, TData>
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getYieldV2YieldsQueryOptions(params, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

/**
 * Returns yield given an id
 * @summary Get yield
 */
export const yieldV2GetYieldById = (yieldId: string, signal?: AbortSignal) => {
  return customFetch<YieldDto>({
    url: `/v2/yields/${yieldId}`,
    method: 'GET',
    signal,
  });
};

export const getYieldV2GetYieldByIdQueryKey = (yieldId: string) => {
  return [`/v2/yields/${yieldId}`] as const;
};

export const getYieldV2GetYieldByIdQueryOptions = <
  TData = Awaited<ReturnType<typeof yieldV2GetYieldById>>,
  TError = StakeKitErrorDto,
>(
  yieldId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof yieldV2GetYieldById>>,
        TError,
        TData
      >
    >;
  },
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getYieldV2GetYieldByIdQueryKey(yieldId);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof yieldV2GetYieldById>>
  > = ({ signal }) => yieldV2GetYieldById(yieldId, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!yieldId,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof yieldV2GetYieldById>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type YieldV2GetYieldByIdQueryResult = NonNullable<
  Awaited<ReturnType<typeof yieldV2GetYieldById>>
>;
export type YieldV2GetYieldByIdQueryError = StakeKitErrorDto;

/**
 * @summary Get yield
 */
export const useYieldV2GetYieldById = <
  TData = Awaited<ReturnType<typeof yieldV2GetYieldById>>,
  TError = StakeKitErrorDto,
>(
  yieldId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof yieldV2GetYieldById>>,
        TError,
        TData
      >
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getYieldV2GetYieldByIdQueryOptions(yieldId, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

/**
 * Given a yield, returns a list of available validators to specify when providing a `validatorAddress` property.
 * @summary Get yield validators
 */
export const yieldV2FindYieldValidators = (
  yieldId: string,
  params?: YieldV2FindYieldValidatorsParams,
  signal?: AbortSignal,
) => {
  return customFetch<ValidatorSearchResultDto[]>({
    url: `/v2/yields/${yieldId}/validators`,
    method: 'GET',
    params,
    signal,
  });
};

export const getYieldV2FindYieldValidatorsQueryKey = (
  yieldId: string,
  params?: YieldV2FindYieldValidatorsParams,
) => {
  return [
    `/v2/yields/${yieldId}/validators`,
    ...(params ? [params] : []),
  ] as const;
};

export const getYieldV2FindYieldValidatorsQueryOptions = <
  TData = Awaited<ReturnType<typeof yieldV2FindYieldValidators>>,
  TError = StakeKitErrorDto,
>(
  yieldId: string,
  params?: YieldV2FindYieldValidatorsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof yieldV2FindYieldValidators>>,
        TError,
        TData
      >
    >;
  },
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ??
    getYieldV2FindYieldValidatorsQueryKey(yieldId, params);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof yieldV2FindYieldValidators>>
  > = ({ signal }) => yieldV2FindYieldValidators(yieldId, params, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!yieldId,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof yieldV2FindYieldValidators>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type YieldV2FindYieldValidatorsQueryResult = NonNullable<
  Awaited<ReturnType<typeof yieldV2FindYieldValidators>>
>;
export type YieldV2FindYieldValidatorsQueryError = StakeKitErrorDto;

/**
 * @summary Get yield validators
 */
export const useYieldV2FindYieldValidators = <
  TData = Awaited<ReturnType<typeof yieldV2FindYieldValidators>>,
  TError = StakeKitErrorDto,
>(
  yieldId: string,
  params?: YieldV2FindYieldValidatorsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof yieldV2FindYieldValidators>>,
        TError,
        TData
      >
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getYieldV2FindYieldValidatorsQueryOptions(
    yieldId,
    params,
    options,
  );

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

/**
 * Returns a list of available validators to specify when providing a `validatorAddress` property.
 * @summary Get validators
 */
export const yieldV2FindValidators = (
  params?: YieldV2FindValidatorsParams,
  signal?: AbortSignal,
) => {
  return customFetch<ValidatorSearchResultDto[]>({
    url: `/v2/yields/validators`,
    method: 'GET',
    params,
    signal,
  });
};

export const getYieldV2FindValidatorsQueryKey = (
  params?: YieldV2FindValidatorsParams,
) => {
  return [`/v2/yields/validators`, ...(params ? [params] : [])] as const;
};

export const getYieldV2FindValidatorsQueryOptions = <
  TData = Awaited<ReturnType<typeof yieldV2FindValidators>>,
  TError = StakeKitErrorDto,
>(
  params?: YieldV2FindValidatorsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof yieldV2FindValidators>>,
        TError,
        TData
      >
    >;
  },
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getYieldV2FindValidatorsQueryKey(params);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof yieldV2FindValidators>>
  > = ({ signal }) => yieldV2FindValidators(params, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<typeof yieldV2FindValidators>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type YieldV2FindValidatorsQueryResult = NonNullable<
  Awaited<ReturnType<typeof yieldV2FindValidators>>
>;
export type YieldV2FindValidatorsQueryError = StakeKitErrorDto;

/**
 * @summary Get validators
 */
export const useYieldV2FindValidators = <
  TData = Awaited<ReturnType<typeof yieldV2FindValidators>>,
  TError = StakeKitErrorDto,
>(
  params?: YieldV2FindValidatorsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof yieldV2FindValidators>>,
        TError,
        TData
      >
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getYieldV2FindValidatorsQueryOptions(params, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

/**
 * Returns a list of fee configurations that contains details about fees taken when interacting with the yield.
 * @summary Get yield fee configurations
 */
export const yieldV2GetFeeConfigurations = (
  integrationId: string,
  params?: YieldV2GetFeeConfigurationsParams,
  signal?: AbortSignal,
) => {
  return customFetch<YieldV2GetFeeConfigurations200>({
    url: `/v2/yields/${integrationId}/fee-configurations`,
    method: 'GET',
    params,
    signal,
  });
};

export const getYieldV2GetFeeConfigurationsQueryKey = (
  integrationId: string,
  params?: YieldV2GetFeeConfigurationsParams,
) => {
  return [
    `/v2/yields/${integrationId}/fee-configurations`,
    ...(params ? [params] : []),
  ] as const;
};

export const getYieldV2GetFeeConfigurationsQueryOptions = <
  TData = Awaited<ReturnType<typeof yieldV2GetFeeConfigurations>>,
  TError = StakeKitErrorDto | void,
>(
  integrationId: string,
  params?: YieldV2GetFeeConfigurationsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof yieldV2GetFeeConfigurations>>,
        TError,
        TData
      >
    >;
  },
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ??
    getYieldV2GetFeeConfigurationsQueryKey(integrationId, params);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof yieldV2GetFeeConfigurations>>
  > = ({ signal }) =>
    yieldV2GetFeeConfigurations(integrationId, params, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!integrationId,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<typeof yieldV2GetFeeConfigurations>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type YieldV2GetFeeConfigurationsQueryResult = NonNullable<
  Awaited<ReturnType<typeof yieldV2GetFeeConfigurations>>
>;
export type YieldV2GetFeeConfigurationsQueryError = StakeKitErrorDto | void;

/**
 * @summary Get yield fee configurations
 */
export const useYieldV2GetFeeConfigurations = <
  TData = Awaited<ReturnType<typeof yieldV2GetFeeConfigurations>>,
  TError = StakeKitErrorDto | void,
>(
  integrationId: string,
  params?: YieldV2GetFeeConfigurationsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<typeof yieldV2GetFeeConfigurations>>,
        TError,
        TData
      >
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getYieldV2GetFeeConfigurationsQueryOptions(
    integrationId,
    params,
    options,
  );

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

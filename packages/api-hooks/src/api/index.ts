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
  ActionGasEstimateRequestDto,
  ActionList200,
  ActionListParams,
  ActionRequestDto,
  BalanceResponseDto,
  BalancesRequestDto,
  ConstructTransactionRequestDto,
  FeeConfigurationDto,
  GasEstimateDto,
  GasForNetworkResponseDto,
  GeolocationError,
  HealthStatusDto,
  PendingActionGasEstimateRequestDto,
  PendingActionRequestDto,
  PriceRequestDto,
  PriceResponseDto,
  SubmitHashRequestDto,
  SubmitRequestDto,
  SubmitResponseDto,
  TokenBalanceScanDto,
  TokenBalanceScanResponseDto,
  TokenGetTokensParams,
  TokenWithAvailableYieldsDto,
  TransactionDto,
  TransactionStatusResponseDto,
  TransactionVerificationMessageDto,
  TransactionVerificationMessageRequestDto,
  ValidatorDto,
  ValidatorSearchResultDto,
  YieldBalanceDto,
  YieldBalanceRequestDto,
  YieldBalanceScanRequestDto,
  YieldBalanceWithIntegrationIdRequestDto,
  YieldBalancesWithIntegrationIdDto,
  YieldDto,
  YieldFindValidatorsParams,
  YieldGetMyYields200,
  YieldGetMyYieldsParams,
  YieldGetSingleYieldBalancesParams,
  YieldGetValidatorsParams,
  YieldYieldOpportunityParams,
  YieldYields200,
  YieldYieldsParams,
} from './schemas';
import { useApi } from '../use-api-client';

export const useHealthHealthV2Hook = () => {
  const healthHealthV2 = useApi<HealthStatusDto>();

  return (signal?: AbortSignal) => {
    return healthHealthV2({ url: `/v2/health`, method: 'GET', signal });
  };
};

export const getHealthHealthV2QueryKey = () => {
  return [`/v2/health`] as const;
};

export const useHealthHealthV2QueryOptions = <
  TData = Awaited<ReturnType<ReturnType<typeof useHealthHealthV2Hook>>>,
  TError = unknown,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<ReturnType<typeof useHealthHealthV2Hook>>>,
      TError,
      TData
    >
  >;
}) => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getHealthHealthV2QueryKey();

  const healthHealthV2 = useHealthHealthV2Hook();

  const queryFn: QueryFunction<
    Awaited<ReturnType<ReturnType<typeof useHealthHealthV2Hook>>>
  > = ({ signal }) => healthHealthV2(signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<ReturnType<typeof useHealthHealthV2Hook>>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type HealthHealthV2QueryResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof useHealthHealthV2Hook>>>
>;
export type HealthHealthV2QueryError = unknown;

export const useHealthHealthV2 = <
  TData = Awaited<ReturnType<ReturnType<typeof useHealthHealthV2Hook>>>,
  TError = unknown,
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<ReturnType<typeof useHealthHealthV2Hook>>>,
      TError,
      TData
    >
  >;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = useHealthHealthV2QueryOptions(options);

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
export const useActionGetActionHook = () => {
  const actionGetAction = useApi<ActionDto>();

  return (actionId: string, signal?: AbortSignal) => {
    return actionGetAction({
      url: `/v1/actions/${actionId}`,
      method: 'GET',
      signal,
    });
  };
};

export const getActionGetActionQueryKey = (actionId: string) => {
  return [`/v1/actions/${actionId}`] as const;
};

export const useActionGetActionQueryOptions = <
  TData = Awaited<ReturnType<ReturnType<typeof useActionGetActionHook>>>,
  TError = GeolocationError,
>(
  actionId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<ReturnType<typeof useActionGetActionHook>>>,
        TError,
        TData
      >
    >;
  },
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getActionGetActionQueryKey(actionId);

  const actionGetAction = useActionGetActionHook();

  const queryFn: QueryFunction<
    Awaited<ReturnType<ReturnType<typeof useActionGetActionHook>>>
  > = ({ signal }) => actionGetAction(actionId, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!actionId,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<ReturnType<typeof useActionGetActionHook>>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type ActionGetActionQueryResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof useActionGetActionHook>>>
>;
export type ActionGetActionQueryError = GeolocationError;

/**
 * @summary Get action
 */
export const useActionGetAction = <
  TData = Awaited<ReturnType<ReturnType<typeof useActionGetActionHook>>>,
  TError = GeolocationError,
>(
  actionId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<ReturnType<typeof useActionGetActionHook>>>,
        TError,
        TData
      >
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = useActionGetActionQueryOptions(actionId, options);

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
export const useActionGetGasEstimateHook = () => {
  const actionGetGasEstimate = useApi<GasEstimateDto>();

  return (actionId: string, signal?: AbortSignal) => {
    return actionGetGasEstimate({
      url: `/v1/actions/${actionId}/gas-estimate`,
      method: 'GET',
      signal,
    });
  };
};

export const getActionGetGasEstimateQueryKey = (actionId: string) => {
  return [`/v1/actions/${actionId}/gas-estimate`] as const;
};

export const useActionGetGasEstimateQueryOptions = <
  TData = Awaited<ReturnType<ReturnType<typeof useActionGetGasEstimateHook>>>,
  TError = GeolocationError,
>(
  actionId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<ReturnType<typeof useActionGetGasEstimateHook>>>,
        TError,
        TData
      >
    >;
  },
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getActionGetGasEstimateQueryKey(actionId);

  const actionGetGasEstimate = useActionGetGasEstimateHook();

  const queryFn: QueryFunction<
    Awaited<ReturnType<ReturnType<typeof useActionGetGasEstimateHook>>>
  > = ({ signal }) => actionGetGasEstimate(actionId, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!actionId,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<ReturnType<typeof useActionGetGasEstimateHook>>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type ActionGetGasEstimateQueryResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof useActionGetGasEstimateHook>>>
>;
export type ActionGetGasEstimateQueryError = GeolocationError;

/**
 * @summary Get estimated gas for action
 */
export const useActionGetGasEstimate = <
  TData = Awaited<ReturnType<ReturnType<typeof useActionGetGasEstimateHook>>>,
  TError = GeolocationError,
>(
  actionId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<ReturnType<typeof useActionGetGasEstimateHook>>>,
        TError,
        TData
      >
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = useActionGetGasEstimateQueryOptions(actionId, options);

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
export const useActionEnterHook = () => {
  const actionEnter = useApi<ActionDto>();

  return (actionRequestDto: ActionRequestDto) => {
    return actionEnter({
      url: `/v1/actions/enter`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: actionRequestDto,
    });
  };
};

export const useActionEnterMutationOptions = <
  TError = GeolocationError,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<ReturnType<typeof useActionEnterHook>>>,
    TError,
    { data: ActionRequestDto },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<ReturnType<typeof useActionEnterHook>>>,
  TError,
  { data: ActionRequestDto },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const actionEnter = useActionEnterHook();

  const mutationFn: MutationFunction<
    Awaited<ReturnType<ReturnType<typeof useActionEnterHook>>>,
    { data: ActionRequestDto }
  > = (props) => {
    const { data } = props ?? {};

    return actionEnter(data);
  };

  return { mutationFn, ...mutationOptions };
};

export type ActionEnterMutationResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof useActionEnterHook>>>
>;
export type ActionEnterMutationBody = ActionRequestDto;
export type ActionEnterMutationError = GeolocationError;

/**
 * @summary Create "enter" action
 */
export const useActionEnter = <
  TError = GeolocationError,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<ReturnType<typeof useActionEnterHook>>>,
    TError,
    { data: ActionRequestDto },
    TContext
  >;
}) => {
  const mutationOptions = useActionEnterMutationOptions(options);

  return useMutation(mutationOptions);
};

/**
 * Get the transactions necessary to exit a yield bearing position
 * @summary Create "exit" action
 */
export const useActionExitHook = () => {
  const actionExit = useApi<ActionDto>();

  return (actionRequestDto: ActionRequestDto) => {
    return actionExit({
      url: `/v1/actions/exit`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: actionRequestDto,
    });
  };
};

export const useActionExitMutationOptions = <
  TError = GeolocationError,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<ReturnType<typeof useActionExitHook>>>,
    TError,
    { data: ActionRequestDto },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<ReturnType<typeof useActionExitHook>>>,
  TError,
  { data: ActionRequestDto },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const actionExit = useActionExitHook();

  const mutationFn: MutationFunction<
    Awaited<ReturnType<ReturnType<typeof useActionExitHook>>>,
    { data: ActionRequestDto }
  > = (props) => {
    const { data } = props ?? {};

    return actionExit(data);
  };

  return { mutationFn, ...mutationOptions };
};

export type ActionExitMutationResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof useActionExitHook>>>
>;
export type ActionExitMutationBody = ActionRequestDto;
export type ActionExitMutationError = GeolocationError;

/**
 * @summary Create "exit" action
 */
export const useActionExit = <
  TError = GeolocationError,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<ReturnType<typeof useActionExitHook>>>,
    TError,
    { data: ActionRequestDto },
    TContext
  >;
}) => {
  const mutationOptions = useActionExitMutationOptions(options);

  return useMutation(mutationOptions);
};

/**
 * Get the transactions to apply a pending action
 * @summary Create "pending" action
 */
export const useActionPendingHook = () => {
  const actionPending = useApi<ActionDto>();

  return (pendingActionRequestDto: PendingActionRequestDto) => {
    return actionPending({
      url: `/v1/actions/pending`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: pendingActionRequestDto,
    });
  };
};

export const useActionPendingMutationOptions = <
  TError = GeolocationError,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<ReturnType<typeof useActionPendingHook>>>,
    TError,
    { data: PendingActionRequestDto },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<ReturnType<typeof useActionPendingHook>>>,
  TError,
  { data: PendingActionRequestDto },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const actionPending = useActionPendingHook();

  const mutationFn: MutationFunction<
    Awaited<ReturnType<ReturnType<typeof useActionPendingHook>>>,
    { data: PendingActionRequestDto }
  > = (props) => {
    const { data } = props ?? {};

    return actionPending(data);
  };

  return { mutationFn, ...mutationOptions };
};

export type ActionPendingMutationResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof useActionPendingHook>>>
>;
export type ActionPendingMutationBody = PendingActionRequestDto;
export type ActionPendingMutationError = GeolocationError;

/**
 * @summary Create "pending" action
 */
export const useActionPending = <
  TError = GeolocationError,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<ReturnType<typeof useActionPendingHook>>>,
    TError,
    { data: PendingActionRequestDto },
    TContext
  >;
}) => {
  const mutationOptions = useActionPendingMutationOptions(options);

  return useMutation(mutationOptions);
};

/**
 * Get the estimated gas necessary to enter a yield bearing position
 * @summary Estimate gas for the "enter" action
 */
export const useActionEnterGasEstimationHook = () => {
  const actionEnterGasEstimation = useApi<GasEstimateDto>();

  return (actionGasEstimateRequestDto: ActionGasEstimateRequestDto) => {
    return actionEnterGasEstimation({
      url: `/v1/actions/enter/estimate-gas`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: actionGasEstimateRequestDto,
    });
  };
};

export const getActionEnterGasEstimationQueryKey = (
  actionGasEstimateRequestDto: ActionGasEstimateRequestDto,
) => {
  return [
    `/v1/actions/enter/estimate-gas`,
    actionGasEstimateRequestDto,
  ] as const;
};

export const useActionEnterGasEstimationQueryOptions = <
  TData = Awaited<
    ReturnType<ReturnType<typeof useActionEnterGasEstimationHook>>
  >,
  TError = GeolocationError,
>(
  actionGasEstimateRequestDto: ActionGasEstimateRequestDto,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<ReturnType<typeof useActionEnterGasEstimationHook>>>,
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

  const actionEnterGasEstimation = useActionEnterGasEstimationHook();

  const queryFn: QueryFunction<
    Awaited<ReturnType<ReturnType<typeof useActionEnterGasEstimationHook>>>
  > = () => actionEnterGasEstimation(actionGasEstimateRequestDto);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<ReturnType<typeof useActionEnterGasEstimationHook>>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type ActionEnterGasEstimationQueryResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof useActionEnterGasEstimationHook>>>
>;
export type ActionEnterGasEstimationQueryError = GeolocationError;

/**
 * @summary Estimate gas for the "enter" action
 */
export const useActionEnterGasEstimation = <
  TData = Awaited<
    ReturnType<ReturnType<typeof useActionEnterGasEstimationHook>>
  >,
  TError = GeolocationError,
>(
  actionGasEstimateRequestDto: ActionGasEstimateRequestDto,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<ReturnType<typeof useActionEnterGasEstimationHook>>>,
        TError,
        TData
      >
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = useActionEnterGasEstimationQueryOptions(
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
export const useActionExitGasEstimateHook = () => {
  const actionExitGasEstimate = useApi<GasEstimateDto>();

  return (actionGasEstimateRequestDto: ActionGasEstimateRequestDto) => {
    return actionExitGasEstimate({
      url: `/v1/actions/exit/estimate-gas`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: actionGasEstimateRequestDto,
    });
  };
};

export const getActionExitGasEstimateQueryKey = (
  actionGasEstimateRequestDto: ActionGasEstimateRequestDto,
) => {
  return [
    `/v1/actions/exit/estimate-gas`,
    actionGasEstimateRequestDto,
  ] as const;
};

export const useActionExitGasEstimateQueryOptions = <
  TData = Awaited<ReturnType<ReturnType<typeof useActionExitGasEstimateHook>>>,
  TError = GeolocationError,
>(
  actionGasEstimateRequestDto: ActionGasEstimateRequestDto,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<ReturnType<typeof useActionExitGasEstimateHook>>>,
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

  const actionExitGasEstimate = useActionExitGasEstimateHook();

  const queryFn: QueryFunction<
    Awaited<ReturnType<ReturnType<typeof useActionExitGasEstimateHook>>>
  > = () => actionExitGasEstimate(actionGasEstimateRequestDto);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<ReturnType<typeof useActionExitGasEstimateHook>>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type ActionExitGasEstimateQueryResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof useActionExitGasEstimateHook>>>
>;
export type ActionExitGasEstimateQueryError = GeolocationError;

/**
 * @summary Estimate gas for the "exit" action
 */
export const useActionExitGasEstimate = <
  TData = Awaited<ReturnType<ReturnType<typeof useActionExitGasEstimateHook>>>,
  TError = GeolocationError,
>(
  actionGasEstimateRequestDto: ActionGasEstimateRequestDto,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<ReturnType<typeof useActionExitGasEstimateHook>>>,
        TError,
        TData
      >
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = useActionExitGasEstimateQueryOptions(
    actionGasEstimateRequestDto,
    options,
  );

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

export const useActionListHook = () => {
  const actionList = useApi<ActionList200>();

  return (params?: ActionListParams, signal?: AbortSignal) => {
    return actionList({ url: `/v1/actions`, method: 'GET', params, signal });
  };
};

export const getActionListQueryKey = (params?: ActionListParams) => {
  return [`/v1/actions`, ...(params ? [params] : [])] as const;
};

export const useActionListQueryOptions = <
  TData = Awaited<ReturnType<ReturnType<typeof useActionListHook>>>,
  TError = unknown,
>(
  params?: ActionListParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<ReturnType<typeof useActionListHook>>>,
        TError,
        TData
      >
    >;
  },
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getActionListQueryKey(params);

  const actionList = useActionListHook();

  const queryFn: QueryFunction<
    Awaited<ReturnType<ReturnType<typeof useActionListHook>>>
  > = ({ signal }) => actionList(params, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<ReturnType<typeof useActionListHook>>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type ActionListQueryResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof useActionListHook>>>
>;
export type ActionListQueryError = unknown;

export const useActionList = <
  TData = Awaited<ReturnType<ReturnType<typeof useActionListHook>>>,
  TError = unknown,
>(
  params?: ActionListParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<ReturnType<typeof useActionListHook>>>,
        TError,
        TData
      >
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = useActionListQueryOptions(params, options);

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
export const useActionPendingGasEstimateHook = () => {
  const actionPendingGasEstimate = useApi<GasEstimateDto>();

  return (
    pendingActionGasEstimateRequestDto: PendingActionGasEstimateRequestDto,
  ) => {
    return actionPendingGasEstimate({
      url: `/v1/actions/pending/estimate-gas`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: pendingActionGasEstimateRequestDto,
    });
  };
};

export const getActionPendingGasEstimateQueryKey = (
  pendingActionGasEstimateRequestDto: PendingActionGasEstimateRequestDto,
) => {
  return [
    `/v1/actions/pending/estimate-gas`,
    pendingActionGasEstimateRequestDto,
  ] as const;
};

export const useActionPendingGasEstimateQueryOptions = <
  TData = Awaited<
    ReturnType<ReturnType<typeof useActionPendingGasEstimateHook>>
  >,
  TError = GeolocationError,
>(
  pendingActionGasEstimateRequestDto: PendingActionGasEstimateRequestDto,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<ReturnType<typeof useActionPendingGasEstimateHook>>>,
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

  const actionPendingGasEstimate = useActionPendingGasEstimateHook();

  const queryFn: QueryFunction<
    Awaited<ReturnType<ReturnType<typeof useActionPendingGasEstimateHook>>>
  > = () => actionPendingGasEstimate(pendingActionGasEstimateRequestDto);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<ReturnType<typeof useActionPendingGasEstimateHook>>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type ActionPendingGasEstimateQueryResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof useActionPendingGasEstimateHook>>>
>;
export type ActionPendingGasEstimateQueryError = GeolocationError;

/**
 * @summary Estimate gas for the "pending" action
 */
export const useActionPendingGasEstimate = <
  TData = Awaited<
    ReturnType<ReturnType<typeof useActionPendingGasEstimateHook>>
  >,
  TError = GeolocationError,
>(
  pendingActionGasEstimateRequestDto: PendingActionGasEstimateRequestDto,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<ReturnType<typeof useActionPendingGasEstimateHook>>>,
        TError,
        TData
      >
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = useActionPendingGasEstimateQueryOptions(
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
export const useTransactionGetTransactionHook = () => {
  const transactionGetTransaction = useApi<TransactionDto>();

  return (transactionId: string, signal?: AbortSignal) => {
    return transactionGetTransaction({
      url: `/v1/transactions/${transactionId}`,
      method: 'GET',
      signal,
    });
  };
};

export const getTransactionGetTransactionQueryKey = (transactionId: string) => {
  return [`/v1/transactions/${transactionId}`] as const;
};

export const useTransactionGetTransactionQueryOptions = <
  TData = Awaited<
    ReturnType<ReturnType<typeof useTransactionGetTransactionHook>>
  >,
  TError = GeolocationError,
>(
  transactionId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<
          ReturnType<ReturnType<typeof useTransactionGetTransactionHook>>
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
    getTransactionGetTransactionQueryKey(transactionId);

  const transactionGetTransaction = useTransactionGetTransactionHook();

  const queryFn: QueryFunction<
    Awaited<ReturnType<ReturnType<typeof useTransactionGetTransactionHook>>>
  > = ({ signal }) => transactionGetTransaction(transactionId, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!transactionId,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<ReturnType<typeof useTransactionGetTransactionHook>>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type TransactionGetTransactionQueryResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof useTransactionGetTransactionHook>>>
>;
export type TransactionGetTransactionQueryError = GeolocationError;

/**
 * @summary Get transaction
 */
export const useTransactionGetTransaction = <
  TData = Awaited<
    ReturnType<ReturnType<typeof useTransactionGetTransactionHook>>
  >,
  TError = GeolocationError,
>(
  transactionId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<
          ReturnType<ReturnType<typeof useTransactionGetTransactionHook>>
        >,
        TError,
        TData
      >
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = useTransactionGetTransactionQueryOptions(
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
export const useTransactionConstructHook = () => {
  const transactionConstruct = useApi<TransactionDto>();

  return (
    transactionId: string,
    constructTransactionRequestDto: ConstructTransactionRequestDto,
  ) => {
    return transactionConstruct({
      url: `/v1/transactions/${transactionId}`,
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      data: constructTransactionRequestDto,
    });
  };
};

export const useTransactionConstructMutationOptions = <
  TError = GeolocationError,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<ReturnType<typeof useTransactionConstructHook>>>,
    TError,
    { transactionId: string; data: ConstructTransactionRequestDto },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<ReturnType<typeof useTransactionConstructHook>>>,
  TError,
  { transactionId: string; data: ConstructTransactionRequestDto },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const transactionConstruct = useTransactionConstructHook();

  const mutationFn: MutationFunction<
    Awaited<ReturnType<ReturnType<typeof useTransactionConstructHook>>>,
    { transactionId: string; data: ConstructTransactionRequestDto }
  > = (props) => {
    const { transactionId, data } = props ?? {};

    return transactionConstruct(transactionId, data);
  };

  return { mutationFn, ...mutationOptions };
};

export type TransactionConstructMutationResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof useTransactionConstructHook>>>
>;
export type TransactionConstructMutationBody = ConstructTransactionRequestDto;
export type TransactionConstructMutationError = GeolocationError;

/**
 * @summary Construct transaction
 */
export const useTransactionConstruct = <
  TError = GeolocationError,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<ReturnType<typeof useTransactionConstructHook>>>,
    TError,
    { transactionId: string; data: ConstructTransactionRequestDto },
    TContext
  >;
}) => {
  const mutationOptions = useTransactionConstructMutationOptions(options);

  return useMutation(mutationOptions);
};

/**
 * Submits the signed transactions for broadcasting
 * @summary Submit transaction
 */
export const useTransactionSubmitHook = () => {
  const transactionSubmit = useApi<SubmitResponseDto>();

  return (transactionId: string, submitRequestDto: SubmitRequestDto) => {
    return transactionSubmit({
      url: `/v1/transactions/${transactionId}/submit`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: submitRequestDto,
    });
  };
};

export const useTransactionSubmitMutationOptions = <
  TError = GeolocationError,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<ReturnType<typeof useTransactionSubmitHook>>>,
    TError,
    { transactionId: string; data: SubmitRequestDto },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<ReturnType<typeof useTransactionSubmitHook>>>,
  TError,
  { transactionId: string; data: SubmitRequestDto },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const transactionSubmit = useTransactionSubmitHook();

  const mutationFn: MutationFunction<
    Awaited<ReturnType<ReturnType<typeof useTransactionSubmitHook>>>,
    { transactionId: string; data: SubmitRequestDto }
  > = (props) => {
    const { transactionId, data } = props ?? {};

    return transactionSubmit(transactionId, data);
  };

  return { mutationFn, ...mutationOptions };
};

export type TransactionSubmitMutationResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof useTransactionSubmitHook>>>
>;
export type TransactionSubmitMutationBody = SubmitRequestDto;
export type TransactionSubmitMutationError = GeolocationError;

/**
 * @summary Submit transaction
 */
export const useTransactionSubmit = <
  TError = GeolocationError,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<ReturnType<typeof useTransactionSubmitHook>>>,
    TError,
    { transactionId: string; data: SubmitRequestDto },
    TContext
  >;
}) => {
  const mutationOptions = useTransactionSubmitMutationOptions(options);

  return useMutation(mutationOptions);
};

/**
 * Submit a hash of an already broadcasted transaction
 * @summary Submit transaction hash
 */
export const useTransactionSubmitHashHook = () => {
  const transactionSubmitHash = useApi<void>();

  return (
    transactionId: string,
    submitHashRequestDto: SubmitHashRequestDto,
  ) => {
    return transactionSubmitHash({
      url: `/v1/transactions/${transactionId}/submit_hash`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: submitHashRequestDto,
    });
  };
};

export const useTransactionSubmitHashMutationOptions = <
  TError = GeolocationError,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<ReturnType<typeof useTransactionSubmitHashHook>>>,
    TError,
    { transactionId: string; data: SubmitHashRequestDto },
    TContext
  >;
}): UseMutationOptions<
  Awaited<ReturnType<ReturnType<typeof useTransactionSubmitHashHook>>>,
  TError,
  { transactionId: string; data: SubmitHashRequestDto },
  TContext
> => {
  const { mutation: mutationOptions } = options ?? {};

  const transactionSubmitHash = useTransactionSubmitHashHook();

  const mutationFn: MutationFunction<
    Awaited<ReturnType<ReturnType<typeof useTransactionSubmitHashHook>>>,
    { transactionId: string; data: SubmitHashRequestDto }
  > = (props) => {
    const { transactionId, data } = props ?? {};

    return transactionSubmitHash(transactionId, data);
  };

  return { mutationFn, ...mutationOptions };
};

export type TransactionSubmitHashMutationResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof useTransactionSubmitHashHook>>>
>;
export type TransactionSubmitHashMutationBody = SubmitHashRequestDto;
export type TransactionSubmitHashMutationError = GeolocationError;

/**
 * @summary Submit transaction hash
 */
export const useTransactionSubmitHash = <
  TError = GeolocationError,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<ReturnType<typeof useTransactionSubmitHashHook>>>,
    TError,
    { transactionId: string; data: SubmitHashRequestDto },
    TContext
  >;
}) => {
  const mutationOptions = useTransactionSubmitHashMutationOptions(options);

  return useMutation(mutationOptions);
};

/**
 * Returns the transaction status given a transaction id
 * @summary Get transaction status
 */
export const useTransactionGetTransactionStatusFromIdHook = () => {
  const transactionGetTransactionStatusFromId =
    useApi<TransactionStatusResponseDto>();

  return (transactionId: string, signal?: AbortSignal) => {
    return transactionGetTransactionStatusFromId({
      url: `/v1/transactions/${transactionId}/status`,
      method: 'GET',
      signal,
    });
  };
};

export const getTransactionGetTransactionStatusFromIdQueryKey = (
  transactionId: string,
) => {
  return [`/v1/transactions/${transactionId}/status`] as const;
};

export const useTransactionGetTransactionStatusFromIdQueryOptions = <
  TData = Awaited<
    ReturnType<ReturnType<typeof useTransactionGetTransactionStatusFromIdHook>>
  >,
  TError = GeolocationError,
>(
  transactionId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<
          ReturnType<
            ReturnType<typeof useTransactionGetTransactionStatusFromIdHook>
          >
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
    getTransactionGetTransactionStatusFromIdQueryKey(transactionId);

  const transactionGetTransactionStatusFromId =
    useTransactionGetTransactionStatusFromIdHook();

  const queryFn: QueryFunction<
    Awaited<
      ReturnType<
        ReturnType<typeof useTransactionGetTransactionStatusFromIdHook>
      >
    >
  > = ({ signal }) =>
    transactionGetTransactionStatusFromId(transactionId, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!transactionId,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<
      ReturnType<
        ReturnType<typeof useTransactionGetTransactionStatusFromIdHook>
      >
    >,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type TransactionGetTransactionStatusFromIdQueryResult = NonNullable<
  Awaited<
    ReturnType<ReturnType<typeof useTransactionGetTransactionStatusFromIdHook>>
  >
>;
export type TransactionGetTransactionStatusFromIdQueryError = GeolocationError;

/**
 * @summary Get transaction status
 */
export const useTransactionGetTransactionStatusFromId = <
  TData = Awaited<
    ReturnType<ReturnType<typeof useTransactionGetTransactionStatusFromIdHook>>
  >,
  TError = GeolocationError,
>(
  transactionId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<
          ReturnType<
            ReturnType<typeof useTransactionGetTransactionStatusFromIdHook>
          >
        >,
        TError,
        TData
      >
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = useTransactionGetTransactionStatusFromIdQueryOptions(
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
export const useTransactionGetGasForNetworkHook = () => {
  const transactionGetGasForNetwork = useApi<GasForNetworkResponseDto>();

  return (network: string, signal?: AbortSignal) => {
    return transactionGetGasForNetwork({
      url: `/v1/transactions/gas/${network}`,
      method: 'GET',
      signal,
    });
  };
};

export const getTransactionGetGasForNetworkQueryKey = (network: string) => {
  return [`/v1/transactions/gas/${network}`] as const;
};

export const useTransactionGetGasForNetworkQueryOptions = <
  TData = Awaited<
    ReturnType<ReturnType<typeof useTransactionGetGasForNetworkHook>>
  >,
  TError = GeolocationError,
>(
  network: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<
          ReturnType<ReturnType<typeof useTransactionGetGasForNetworkHook>>
        >,
        TError,
        TData
      >
    >;
  },
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getTransactionGetGasForNetworkQueryKey(network);

  const transactionGetGasForNetwork = useTransactionGetGasForNetworkHook();

  const queryFn: QueryFunction<
    Awaited<ReturnType<ReturnType<typeof useTransactionGetGasForNetworkHook>>>
  > = ({ signal }) => transactionGetGasForNetwork(network, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!network,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<ReturnType<typeof useTransactionGetGasForNetworkHook>>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type TransactionGetGasForNetworkQueryResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof useTransactionGetGasForNetworkHook>>>
>;
export type TransactionGetGasForNetworkQueryError = GeolocationError;

/**
 * @summary Get current gas parameters
 */
export const useTransactionGetGasForNetwork = <
  TData = Awaited<
    ReturnType<ReturnType<typeof useTransactionGetGasForNetworkHook>>
  >,
  TError = GeolocationError,
>(
  network: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<
          ReturnType<ReturnType<typeof useTransactionGetGasForNetworkHook>>
        >,
        TError,
        TData
      >
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = useTransactionGetGasForNetworkQueryOptions(
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
export const useTransactionGetTransactionStatusByNetworkAndHashHook = () => {
  const transactionGetTransactionStatusByNetworkAndHash =
    useApi<TransactionStatusResponseDto>();

  return (network: string, hash: string, signal?: AbortSignal) => {
    return transactionGetTransactionStatusByNetworkAndHash({
      url: `/v1/transactions/status/${network}/${hash}`,
      method: 'GET',
      signal,
    });
  };
};

export const getTransactionGetTransactionStatusByNetworkAndHashQueryKey = (
  network: string,
  hash: string,
) => {
  return [`/v1/transactions/status/${network}/${hash}`] as const;
};

export const useTransactionGetTransactionStatusByNetworkAndHashQueryOptions = <
  TData = Awaited<
    ReturnType<
      ReturnType<typeof useTransactionGetTransactionStatusByNetworkAndHashHook>
    >
  >,
  TError = GeolocationError,
>(
  network: string,
  hash: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<
          ReturnType<
            ReturnType<
              typeof useTransactionGetTransactionStatusByNetworkAndHashHook
            >
          >
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

  const transactionGetTransactionStatusByNetworkAndHash =
    useTransactionGetTransactionStatusByNetworkAndHashHook();

  const queryFn: QueryFunction<
    Awaited<
      ReturnType<
        ReturnType<
          typeof useTransactionGetTransactionStatusByNetworkAndHashHook
        >
      >
    >
  > = ({ signal }) =>
    transactionGetTransactionStatusByNetworkAndHash(network, hash, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!(network && hash),
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<
      ReturnType<
        ReturnType<
          typeof useTransactionGetTransactionStatusByNetworkAndHashHook
        >
      >
    >,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type TransactionGetTransactionStatusByNetworkAndHashQueryResult =
  NonNullable<
    Awaited<
      ReturnType<
        ReturnType<
          typeof useTransactionGetTransactionStatusByNetworkAndHashHook
        >
      >
    >
  >;
export type TransactionGetTransactionStatusByNetworkAndHashQueryError =
  GeolocationError;

/**
 * @summary Get transaction status
 */
export const useTransactionGetTransactionStatusByNetworkAndHash = <
  TData = Awaited<
    ReturnType<
      ReturnType<typeof useTransactionGetTransactionStatusByNetworkAndHashHook>
    >
  >,
  TError = GeolocationError,
>(
  network: string,
  hash: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<
          ReturnType<
            ReturnType<
              typeof useTransactionGetTransactionStatusByNetworkAndHashHook
            >
          >
        >,
        TError,
        TData
      >
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions =
    useTransactionGetTransactionStatusByNetworkAndHashQueryOptions(
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
export const useTransactionGetTransactionVerificationMessageForNetworkHook =
  () => {
    const transactionGetTransactionVerificationMessageForNetwork =
      useApi<TransactionVerificationMessageDto>();

    return (
      network: string,
      transactionVerificationMessageRequestDto: TransactionVerificationMessageRequestDto,
    ) => {
      return transactionGetTransactionVerificationMessageForNetwork({
        url: `/v1/transactions/verification/${network}`,
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        data: transactionVerificationMessageRequestDto,
      });
    };
  };

export const useTransactionGetTransactionVerificationMessageForNetworkMutationOptions =
  <TError = GeolocationError, TContext = unknown>(options?: {
    mutation?: UseMutationOptions<
      Awaited<
        ReturnType<
          ReturnType<
            typeof useTransactionGetTransactionVerificationMessageForNetworkHook
          >
        >
      >,
      TError,
      { network: string; data: TransactionVerificationMessageRequestDto },
      TContext
    >;
  }): UseMutationOptions<
    Awaited<
      ReturnType<
        ReturnType<
          typeof useTransactionGetTransactionVerificationMessageForNetworkHook
        >
      >
    >,
    TError,
    { network: string; data: TransactionVerificationMessageRequestDto },
    TContext
  > => {
    const { mutation: mutationOptions } = options ?? {};

    const transactionGetTransactionVerificationMessageForNetwork =
      useTransactionGetTransactionVerificationMessageForNetworkHook();

    const mutationFn: MutationFunction<
      Awaited<
        ReturnType<
          ReturnType<
            typeof useTransactionGetTransactionVerificationMessageForNetworkHook
          >
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
      ReturnType<
        ReturnType<
          typeof useTransactionGetTransactionVerificationMessageForNetworkHook
        >
      >
    >
  >;
export type TransactionGetTransactionVerificationMessageForNetworkMutationBody =
  TransactionVerificationMessageRequestDto;
export type TransactionGetTransactionVerificationMessageForNetworkMutationError =
  GeolocationError;

/**
 * @summary Get transaction verification transaction/message
 */
export const useTransactionGetTransactionVerificationMessageForNetwork = <
  TError = GeolocationError,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<
      ReturnType<
        ReturnType<
          typeof useTransactionGetTransactionVerificationMessageForNetworkHook
        >
      >
    >,
    TError,
    { network: string; data: TransactionVerificationMessageRequestDto },
    TContext
  >;
}) => {
  const mutationOptions =
    useTransactionGetTransactionVerificationMessageForNetworkMutationOptions(
      options,
    );

  return useMutation(mutationOptions);
};

/**
 * Returns the tokens with available yields
 * @summary Get all tokens
 */
export const useTokenGetTokensHook = () => {
  const tokenGetTokens = useApi<TokenWithAvailableYieldsDto[]>();

  return (params?: TokenGetTokensParams, signal?: AbortSignal) => {
    return tokenGetTokens({ url: `/v1/tokens`, method: 'GET', params, signal });
  };
};

export const getTokenGetTokensQueryKey = (params?: TokenGetTokensParams) => {
  return [`/v1/tokens`, ...(params ? [params] : [])] as const;
};

export const useTokenGetTokensQueryOptions = <
  TData = Awaited<ReturnType<ReturnType<typeof useTokenGetTokensHook>>>,
  TError = unknown,
>(
  params?: TokenGetTokensParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<ReturnType<typeof useTokenGetTokensHook>>>,
        TError,
        TData
      >
    >;
  },
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getTokenGetTokensQueryKey(params);

  const tokenGetTokens = useTokenGetTokensHook();

  const queryFn: QueryFunction<
    Awaited<ReturnType<ReturnType<typeof useTokenGetTokensHook>>>
  > = ({ signal }) => tokenGetTokens(params, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<ReturnType<typeof useTokenGetTokensHook>>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type TokenGetTokensQueryResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof useTokenGetTokensHook>>>
>;
export type TokenGetTokensQueryError = unknown;

/**
 * @summary Get all tokens
 */
export const useTokenGetTokens = <
  TData = Awaited<ReturnType<ReturnType<typeof useTokenGetTokensHook>>>,
  TError = unknown,
>(
  params?: TokenGetTokensParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<ReturnType<typeof useTokenGetTokensHook>>>,
        TError,
        TData
      >
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = useTokenGetTokensQueryOptions(params, options);

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
export const useTokenGetTokenPricesHook = () => {
  const tokenGetTokenPrices = useApi<PriceResponseDto>();

  return (priceRequestDto: PriceRequestDto) => {
    return tokenGetTokenPrices({
      url: `/v1/tokens/prices`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: priceRequestDto,
    });
  };
};

export const getTokenGetTokenPricesQueryKey = (
  priceRequestDto: PriceRequestDto,
) => {
  return [`/v1/tokens/prices`, priceRequestDto] as const;
};

export const useTokenGetTokenPricesQueryOptions = <
  TData = Awaited<ReturnType<ReturnType<typeof useTokenGetTokenPricesHook>>>,
  TError = unknown,
>(
  priceRequestDto: PriceRequestDto,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<ReturnType<typeof useTokenGetTokenPricesHook>>>,
        TError,
        TData
      >
    >;
  },
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getTokenGetTokenPricesQueryKey(priceRequestDto);

  const tokenGetTokenPrices = useTokenGetTokenPricesHook();

  const queryFn: QueryFunction<
    Awaited<ReturnType<ReturnType<typeof useTokenGetTokenPricesHook>>>
  > = () => tokenGetTokenPrices(priceRequestDto);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<ReturnType<typeof useTokenGetTokenPricesHook>>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type TokenGetTokenPricesQueryResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof useTokenGetTokenPricesHook>>>
>;
export type TokenGetTokenPricesQueryError = unknown;

/**
 * @summary Get token prices
 */
export const useTokenGetTokenPrices = <
  TData = Awaited<ReturnType<ReturnType<typeof useTokenGetTokenPricesHook>>>,
  TError = unknown,
>(
  priceRequestDto: PriceRequestDto,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<ReturnType<typeof useTokenGetTokenPricesHook>>>,
        TError,
        TData
      >
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = useTokenGetTokenPricesQueryOptions(
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
export const useTokenGetTokenBalancesHook = () => {
  const tokenGetTokenBalances = useApi<BalanceResponseDto[]>();

  return (balancesRequestDto: BalancesRequestDto) => {
    return tokenGetTokenBalances({
      url: `/v1/tokens/balances`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: balancesRequestDto,
    });
  };
};

export const getTokenGetTokenBalancesQueryKey = (
  balancesRequestDto: BalancesRequestDto,
) => {
  return [`/v1/tokens/balances`, balancesRequestDto] as const;
};

export const useTokenGetTokenBalancesQueryOptions = <
  TData = Awaited<ReturnType<ReturnType<typeof useTokenGetTokenBalancesHook>>>,
  TError = unknown,
>(
  balancesRequestDto: BalancesRequestDto,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<ReturnType<typeof useTokenGetTokenBalancesHook>>>,
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

  const tokenGetTokenBalances = useTokenGetTokenBalancesHook();

  const queryFn: QueryFunction<
    Awaited<ReturnType<ReturnType<typeof useTokenGetTokenBalancesHook>>>
  > = () => tokenGetTokenBalances(balancesRequestDto);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<ReturnType<typeof useTokenGetTokenBalancesHook>>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type TokenGetTokenBalancesQueryResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof useTokenGetTokenBalancesHook>>>
>;
export type TokenGetTokenBalancesQueryError = unknown;

/**
 * @summary Get token balances
 */
export const useTokenGetTokenBalances = <
  TData = Awaited<ReturnType<ReturnType<typeof useTokenGetTokenBalancesHook>>>,
  TError = unknown,
>(
  balancesRequestDto: BalancesRequestDto,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<ReturnType<typeof useTokenGetTokenBalancesHook>>>,
        TError,
        TData
      >
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = useTokenGetTokenBalancesQueryOptions(
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
 * Scans for tokens with balance with available yields
 * @summary Scan for token balances
 */
export const useTokenTokenBalancesScanHook = () => {
  const tokenTokenBalancesScan = useApi<TokenBalanceScanResponseDto[]>();

  return (tokenBalanceScanDto: TokenBalanceScanDto) => {
    return tokenTokenBalancesScan({
      url: `/v1/tokens/balances/scan`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: tokenBalanceScanDto,
    });
  };
};

export const getTokenTokenBalancesScanQueryKey = (
  tokenBalanceScanDto: TokenBalanceScanDto,
) => {
  return [`/v1/tokens/balances/scan`, tokenBalanceScanDto] as const;
};

export const useTokenTokenBalancesScanQueryOptions = <
  TData = Awaited<ReturnType<ReturnType<typeof useTokenTokenBalancesScanHook>>>,
  TError = unknown,
>(
  tokenBalanceScanDto: TokenBalanceScanDto,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<ReturnType<typeof useTokenTokenBalancesScanHook>>>,
        TError,
        TData
      >
    >;
  },
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ??
    getTokenTokenBalancesScanQueryKey(tokenBalanceScanDto);

  const tokenTokenBalancesScan = useTokenTokenBalancesScanHook();

  const queryFn: QueryFunction<
    Awaited<ReturnType<ReturnType<typeof useTokenTokenBalancesScanHook>>>
  > = () => tokenTokenBalancesScan(tokenBalanceScanDto);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<ReturnType<typeof useTokenTokenBalancesScanHook>>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type TokenTokenBalancesScanQueryResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof useTokenTokenBalancesScanHook>>>
>;
export type TokenTokenBalancesScanQueryError = unknown;

/**
 * @summary Scan for token balances
 */
export const useTokenTokenBalancesScan = <
  TData = Awaited<ReturnType<ReturnType<typeof useTokenTokenBalancesScanHook>>>,
  TError = unknown,
>(
  tokenBalanceScanDto: TokenBalanceScanDto,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<ReturnType<typeof useTokenTokenBalancesScanHook>>>,
        TError,
        TData
      >
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = useTokenTokenBalancesScanQueryOptions(
    tokenBalanceScanDto,
    options,
  );

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

/**
 * Returns the available yields (staking, lending, vaults, etc) with associated configuration and metadata
 * @summary Get all yields
 */
export const useYieldYieldsHook = () => {
  const yieldYields = useApi<YieldYields200>();

  return (params?: YieldYieldsParams, signal?: AbortSignal) => {
    return yieldYields({ url: `/v1/yields`, method: 'GET', params, signal });
  };
};

export const getYieldYieldsQueryKey = (params?: YieldYieldsParams) => {
  return [`/v1/yields`, ...(params ? [params] : [])] as const;
};

export const useYieldYieldsQueryOptions = <
  TData = Awaited<ReturnType<ReturnType<typeof useYieldYieldsHook>>>,
  TError = unknown,
>(
  params?: YieldYieldsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<ReturnType<typeof useYieldYieldsHook>>>,
        TError,
        TData
      >
    >;
  },
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getYieldYieldsQueryKey(params);

  const yieldYields = useYieldYieldsHook();

  const queryFn: QueryFunction<
    Awaited<ReturnType<ReturnType<typeof useYieldYieldsHook>>>
  > = ({ signal }) => yieldYields(params, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<ReturnType<typeof useYieldYieldsHook>>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type YieldYieldsQueryResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof useYieldYieldsHook>>>
>;
export type YieldYieldsQueryError = unknown;

/**
 * @summary Get all yields
 */
export const useYieldYields = <
  TData = Awaited<ReturnType<ReturnType<typeof useYieldYieldsHook>>>,
  TError = unknown,
>(
  params?: YieldYieldsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<ReturnType<typeof useYieldYieldsHook>>>,
        TError,
        TData
      >
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = useYieldYieldsQueryOptions(params, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

/**
 * Given addresses and integration ids, returns respective balances and configuration.
 * @summary Get multiple yield balances
 */
export const useYieldGetMultipleYieldBalancesHook = () => {
  const yieldGetMultipleYieldBalances =
    useApi<YieldBalancesWithIntegrationIdDto[]>();

  return (
    yieldBalanceWithIntegrationIdRequestDto: YieldBalanceWithIntegrationIdRequestDto[],
  ) => {
    return yieldGetMultipleYieldBalances({
      url: `/v1/yields/balances`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: yieldBalanceWithIntegrationIdRequestDto,
    });
  };
};

export const getYieldGetMultipleYieldBalancesQueryKey = (
  yieldBalanceWithIntegrationIdRequestDto: YieldBalanceWithIntegrationIdRequestDto[],
) => {
  return [
    `/v1/yields/balances`,
    yieldBalanceWithIntegrationIdRequestDto,
  ] as const;
};

export const useYieldGetMultipleYieldBalancesQueryOptions = <
  TData = Awaited<
    ReturnType<ReturnType<typeof useYieldGetMultipleYieldBalancesHook>>
  >,
  TError = unknown,
>(
  yieldBalanceWithIntegrationIdRequestDto: YieldBalanceWithIntegrationIdRequestDto[],
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<
          ReturnType<ReturnType<typeof useYieldGetMultipleYieldBalancesHook>>
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
    getYieldGetMultipleYieldBalancesQueryKey(
      yieldBalanceWithIntegrationIdRequestDto,
    );

  const yieldGetMultipleYieldBalances = useYieldGetMultipleYieldBalancesHook();

  const queryFn: QueryFunction<
    Awaited<ReturnType<ReturnType<typeof useYieldGetMultipleYieldBalancesHook>>>
  > = () =>
    yieldGetMultipleYieldBalances(yieldBalanceWithIntegrationIdRequestDto);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<
      ReturnType<ReturnType<typeof useYieldGetMultipleYieldBalancesHook>>
    >,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type YieldGetMultipleYieldBalancesQueryResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof useYieldGetMultipleYieldBalancesHook>>>
>;
export type YieldGetMultipleYieldBalancesQueryError = unknown;

/**
 * @summary Get multiple yield balances
 */
export const useYieldGetMultipleYieldBalances = <
  TData = Awaited<
    ReturnType<ReturnType<typeof useYieldGetMultipleYieldBalancesHook>>
  >,
  TError = unknown,
>(
  yieldBalanceWithIntegrationIdRequestDto: YieldBalanceWithIntegrationIdRequestDto[],
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<
          ReturnType<ReturnType<typeof useYieldGetMultipleYieldBalancesHook>>
        >,
        TError,
        TData
      >
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = useYieldGetMultipleYieldBalancesQueryOptions(
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
 * Scans for yield balances among enabled yields.
 * @summary Scan for yield balances
 */
export const useYieldYieldBalancesScanHook = () => {
  const yieldYieldBalancesScan = useApi<YieldBalancesWithIntegrationIdDto[]>();

  return (yieldBalanceScanRequestDto: YieldBalanceScanRequestDto) => {
    return yieldYieldBalancesScan({
      url: `/v1/yields/balances/scan`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: yieldBalanceScanRequestDto,
    });
  };
};

export const getYieldYieldBalancesScanQueryKey = (
  yieldBalanceScanRequestDto: YieldBalanceScanRequestDto,
) => {
  return [`/v1/yields/balances/scan`, yieldBalanceScanRequestDto] as const;
};

export const useYieldYieldBalancesScanQueryOptions = <
  TData = Awaited<ReturnType<ReturnType<typeof useYieldYieldBalancesScanHook>>>,
  TError = unknown,
>(
  yieldBalanceScanRequestDto: YieldBalanceScanRequestDto,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<ReturnType<typeof useYieldYieldBalancesScanHook>>>,
        TError,
        TData
      >
    >;
  },
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ??
    getYieldYieldBalancesScanQueryKey(yieldBalanceScanRequestDto);

  const yieldYieldBalancesScan = useYieldYieldBalancesScanHook();

  const queryFn: QueryFunction<
    Awaited<ReturnType<ReturnType<typeof useYieldYieldBalancesScanHook>>>
  > = () => yieldYieldBalancesScan(yieldBalanceScanRequestDto);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<ReturnType<typeof useYieldYieldBalancesScanHook>>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type YieldYieldBalancesScanQueryResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof useYieldYieldBalancesScanHook>>>
>;
export type YieldYieldBalancesScanQueryError = unknown;

/**
 * @summary Scan for yield balances
 */
export const useYieldYieldBalancesScan = <
  TData = Awaited<ReturnType<ReturnType<typeof useYieldYieldBalancesScanHook>>>,
  TError = unknown,
>(
  yieldBalanceScanRequestDto: YieldBalanceScanRequestDto,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<ReturnType<typeof useYieldYieldBalancesScanHook>>>,
        TError,
        TData
      >
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = useYieldYieldBalancesScanQueryOptions(
    yieldBalanceScanRequestDto,
    options,
  );

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

/**
 * Returns the enabled yields (staking, lending, vaults, etc) associated with current API key with configuration and metadata
 * @summary Get enabled yields
 */
export const useYieldGetMyYieldsHook = () => {
  const yieldGetMyYields = useApi<YieldGetMyYields200>();

  return (params?: YieldGetMyYieldsParams, signal?: AbortSignal) => {
    return yieldGetMyYields({
      url: `/v1/yields/enabled`,
      method: 'GET',
      params,
      signal,
    });
  };
};

export const getYieldGetMyYieldsQueryKey = (
  params?: YieldGetMyYieldsParams,
) => {
  return [`/v1/yields/enabled`, ...(params ? [params] : [])] as const;
};

export const useYieldGetMyYieldsQueryOptions = <
  TData = Awaited<ReturnType<ReturnType<typeof useYieldGetMyYieldsHook>>>,
  TError = unknown,
>(
  params?: YieldGetMyYieldsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<ReturnType<typeof useYieldGetMyYieldsHook>>>,
        TError,
        TData
      >
    >;
  },
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getYieldGetMyYieldsQueryKey(params);

  const yieldGetMyYields = useYieldGetMyYieldsHook();

  const queryFn: QueryFunction<
    Awaited<ReturnType<ReturnType<typeof useYieldGetMyYieldsHook>>>
  > = ({ signal }) => yieldGetMyYields(params, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<ReturnType<typeof useYieldGetMyYieldsHook>>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type YieldGetMyYieldsQueryResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof useYieldGetMyYieldsHook>>>
>;
export type YieldGetMyYieldsQueryError = unknown;

/**
 * @summary Get enabled yields
 */
export const useYieldGetMyYields = <
  TData = Awaited<ReturnType<ReturnType<typeof useYieldGetMyYieldsHook>>>,
  TError = unknown,
>(
  params?: YieldGetMyYieldsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<ReturnType<typeof useYieldGetMyYieldsHook>>>,
        TError,
        TData
      >
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = useYieldGetMyYieldsQueryOptions(params, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

/**
 * Returns the networks that has enabled yields
 * @summary Get enabled networks
 */
export const useYieldGetMyNetworksHook = () => {
  const yieldGetMyNetworks = useApi<string[]>();

  return (signal?: AbortSignal) => {
    return yieldGetMyNetworks({
      url: `/v1/yields/enabled/networks`,
      method: 'GET',
      signal,
    });
  };
};

export const getYieldGetMyNetworksQueryKey = () => {
  return [`/v1/yields/enabled/networks`] as const;
};

export const useYieldGetMyNetworksQueryOptions = <
  TData = Awaited<ReturnType<ReturnType<typeof useYieldGetMyNetworksHook>>>,
  TError = string[],
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<ReturnType<typeof useYieldGetMyNetworksHook>>>,
      TError,
      TData
    >
  >;
}) => {
  const { query: queryOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getYieldGetMyNetworksQueryKey();

  const yieldGetMyNetworks = useYieldGetMyNetworksHook();

  const queryFn: QueryFunction<
    Awaited<ReturnType<ReturnType<typeof useYieldGetMyNetworksHook>>>
  > = ({ signal }) => yieldGetMyNetworks(signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<ReturnType<typeof useYieldGetMyNetworksHook>>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type YieldGetMyNetworksQueryResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof useYieldGetMyNetworksHook>>>
>;
export type YieldGetMyNetworksQueryError = string[];

/**
 * @summary Get enabled networks
 */
export const useYieldGetMyNetworks = <
  TData = Awaited<ReturnType<ReturnType<typeof useYieldGetMyNetworksHook>>>,
  TError = string[],
>(options?: {
  query?: Partial<
    UseQueryOptions<
      Awaited<ReturnType<ReturnType<typeof useYieldGetMyNetworksHook>>>,
      TError,
      TData
    >
  >;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = useYieldGetMyNetworksQueryOptions(options);

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
export const useYieldFindValidatorsHook = () => {
  const yieldFindValidators = useApi<ValidatorSearchResultDto[]>();

  return (params?: YieldFindValidatorsParams, signal?: AbortSignal) => {
    return yieldFindValidators({
      url: `/v1/yields/validators`,
      method: 'GET',
      params,
      signal,
    });
  };
};

export const getYieldFindValidatorsQueryKey = (
  params?: YieldFindValidatorsParams,
) => {
  return [`/v1/yields/validators`, ...(params ? [params] : [])] as const;
};

export const useYieldFindValidatorsQueryOptions = <
  TData = Awaited<ReturnType<ReturnType<typeof useYieldFindValidatorsHook>>>,
  TError = unknown,
>(
  params?: YieldFindValidatorsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<ReturnType<typeof useYieldFindValidatorsHook>>>,
        TError,
        TData
      >
    >;
  },
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getYieldFindValidatorsQueryKey(params);

  const yieldFindValidators = useYieldFindValidatorsHook();

  const queryFn: QueryFunction<
    Awaited<ReturnType<ReturnType<typeof useYieldFindValidatorsHook>>>
  > = ({ signal }) => yieldFindValidators(params, signal);

  return { queryKey, queryFn, ...queryOptions } as UseQueryOptions<
    Awaited<ReturnType<ReturnType<typeof useYieldFindValidatorsHook>>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type YieldFindValidatorsQueryResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof useYieldFindValidatorsHook>>>
>;
export type YieldFindValidatorsQueryError = unknown;

/**
 * @summary Get validators
 */
export const useYieldFindValidators = <
  TData = Awaited<ReturnType<ReturnType<typeof useYieldFindValidatorsHook>>>,
  TError = unknown,
>(
  params?: YieldFindValidatorsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<ReturnType<typeof useYieldFindValidatorsHook>>>,
        TError,
        TData
      >
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = useYieldFindValidatorsQueryOptions(params, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

/**
 * Returns a yield that is associated with given integration ID
 * @summary Get a yield given an integration ID
 */
export const useYieldYieldOpportunityHook = () => {
  const yieldYieldOpportunity = useApi<YieldDto>();

  return (
    integrationId: string,
    params?: YieldYieldOpportunityParams,
    signal?: AbortSignal,
  ) => {
    return yieldYieldOpportunity({
      url: `/v1/yields/${integrationId}`,
      method: 'GET',
      params,
      signal,
    });
  };
};

export const getYieldYieldOpportunityQueryKey = (
  integrationId: string,
  params?: YieldYieldOpportunityParams,
) => {
  return [`/v1/yields/${integrationId}`, ...(params ? [params] : [])] as const;
};

export const useYieldYieldOpportunityQueryOptions = <
  TData = Awaited<ReturnType<ReturnType<typeof useYieldYieldOpportunityHook>>>,
  TError = unknown,
>(
  integrationId: string,
  params?: YieldYieldOpportunityParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<ReturnType<typeof useYieldYieldOpportunityHook>>>,
        TError,
        TData
      >
    >;
  },
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ??
    getYieldYieldOpportunityQueryKey(integrationId, params);

  const yieldYieldOpportunity = useYieldYieldOpportunityHook();

  const queryFn: QueryFunction<
    Awaited<ReturnType<ReturnType<typeof useYieldYieldOpportunityHook>>>
  > = ({ signal }) => yieldYieldOpportunity(integrationId, params, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!integrationId,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<ReturnType<typeof useYieldYieldOpportunityHook>>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type YieldYieldOpportunityQueryResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof useYieldYieldOpportunityHook>>>
>;
export type YieldYieldOpportunityQueryError = unknown;

/**
 * @summary Get a yield given an integration ID
 */
export const useYieldYieldOpportunity = <
  TData = Awaited<ReturnType<ReturnType<typeof useYieldYieldOpportunityHook>>>,
  TError = unknown,
>(
  integrationId: string,
  params?: YieldYieldOpportunityParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<ReturnType<typeof useYieldYieldOpportunityHook>>>,
        TError,
        TData
      >
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = useYieldYieldOpportunityQueryOptions(
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
 * Returns a list of available validators to specify when providing a `validatorAddress` property.
 * @summary Get validators given an integration ID
 */
export const useYieldGetValidatorsHook = () => {
  const yieldGetValidators = useApi<ValidatorDto[]>();

  return (
    integrationId: string,
    params?: YieldGetValidatorsParams,
    signal?: AbortSignal,
  ) => {
    return yieldGetValidators({
      url: `/v1/yields/${integrationId}/validators`,
      method: 'GET',
      params,
      signal,
    });
  };
};

export const getYieldGetValidatorsQueryKey = (
  integrationId: string,
  params?: YieldGetValidatorsParams,
) => {
  return [
    `/v1/yields/${integrationId}/validators`,
    ...(params ? [params] : []),
  ] as const;
};

export const useYieldGetValidatorsQueryOptions = <
  TData = Awaited<ReturnType<ReturnType<typeof useYieldGetValidatorsHook>>>,
  TError = unknown,
>(
  integrationId: string,
  params?: YieldGetValidatorsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<ReturnType<typeof useYieldGetValidatorsHook>>>,
        TError,
        TData
      >
    >;
  },
) => {
  const { query: queryOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ??
    getYieldGetValidatorsQueryKey(integrationId, params);

  const yieldGetValidators = useYieldGetValidatorsHook();

  const queryFn: QueryFunction<
    Awaited<ReturnType<ReturnType<typeof useYieldGetValidatorsHook>>>
  > = ({ signal }) => yieldGetValidators(integrationId, params, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!integrationId,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<ReturnType<typeof useYieldGetValidatorsHook>>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type YieldGetValidatorsQueryResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof useYieldGetValidatorsHook>>>
>;
export type YieldGetValidatorsQueryError = unknown;

/**
 * @summary Get validators given an integration ID
 */
export const useYieldGetValidators = <
  TData = Awaited<ReturnType<ReturnType<typeof useYieldGetValidatorsHook>>>,
  TError = unknown,
>(
  integrationId: string,
  params?: YieldGetValidatorsParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<ReturnType<typeof useYieldGetValidatorsHook>>>,
        TError,
        TData
      >
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = useYieldGetValidatorsQueryOptions(
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
 * Given addresses, returns the available, deposited balance, pending actions and associated configuration for any yield
 * @summary Get yield balances given an integration ID
 */
export const useYieldGetSingleYieldBalancesHook = () => {
  const yieldGetSingleYieldBalances = useApi<YieldBalanceDto[]>();

  return (
    integrationId: string,
    yieldBalanceRequestDto: YieldBalanceRequestDto,
    params?: YieldGetSingleYieldBalancesParams,
  ) => {
    return yieldGetSingleYieldBalances({
      url: `/v1/yields/${integrationId}/balances`,
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      data: yieldBalanceRequestDto,
      params,
    });
  };
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

export const useYieldGetSingleYieldBalancesQueryOptions = <
  TData = Awaited<
    ReturnType<ReturnType<typeof useYieldGetSingleYieldBalancesHook>>
  >,
  TError = unknown,
>(
  integrationId: string,
  yieldBalanceRequestDto: YieldBalanceRequestDto,
  params?: YieldGetSingleYieldBalancesParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<
          ReturnType<ReturnType<typeof useYieldGetSingleYieldBalancesHook>>
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
    getYieldGetSingleYieldBalancesQueryKey(
      integrationId,
      yieldBalanceRequestDto,
      params,
    );

  const yieldGetSingleYieldBalances = useYieldGetSingleYieldBalancesHook();

  const queryFn: QueryFunction<
    Awaited<ReturnType<ReturnType<typeof useYieldGetSingleYieldBalancesHook>>>
  > = () =>
    yieldGetSingleYieldBalances(integrationId, yieldBalanceRequestDto, params);

  return {
    queryKey,
    queryFn,
    enabled: !!integrationId,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<ReturnType<typeof useYieldGetSingleYieldBalancesHook>>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type YieldGetSingleYieldBalancesQueryResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof useYieldGetSingleYieldBalancesHook>>>
>;
export type YieldGetSingleYieldBalancesQueryError = unknown;

/**
 * @summary Get yield balances given an integration ID
 */
export const useYieldGetSingleYieldBalances = <
  TData = Awaited<
    ReturnType<ReturnType<typeof useYieldGetSingleYieldBalancesHook>>
  >,
  TError = unknown,
>(
  integrationId: string,
  yieldBalanceRequestDto: YieldBalanceRequestDto,
  params?: YieldGetSingleYieldBalancesParams,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<
          ReturnType<ReturnType<typeof useYieldGetSingleYieldBalancesHook>>
        >,
        TError,
        TData
      >
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = useYieldGetSingleYieldBalancesQueryOptions(
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
 * Returns a fee configuraion that contains details about fees taken when interacting with the yield.
 * @summary Get fee configuration given an integration ID
 */
export const useYieldGetFeeConfigurationHook = () => {
  const yieldGetFeeConfiguration = useApi<FeeConfigurationDto>();

  return (integrationId: string, signal?: AbortSignal) => {
    return yieldGetFeeConfiguration({
      url: `/v1/yields/${integrationId}/fee-configuration`,
      method: 'GET',
      signal,
    });
  };
};

export const getYieldGetFeeConfigurationQueryKey = (integrationId: string) => {
  return [`/v1/yields/${integrationId}/fee-configuration`] as const;
};

export const useYieldGetFeeConfigurationQueryOptions = <
  TData = Awaited<
    ReturnType<ReturnType<typeof useYieldGetFeeConfigurationHook>>
  >,
  TError = void,
>(
  integrationId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<ReturnType<typeof useYieldGetFeeConfigurationHook>>>,
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

  const yieldGetFeeConfiguration = useYieldGetFeeConfigurationHook();

  const queryFn: QueryFunction<
    Awaited<ReturnType<ReturnType<typeof useYieldGetFeeConfigurationHook>>>
  > = ({ signal }) => yieldGetFeeConfiguration(integrationId, signal);

  return {
    queryKey,
    queryFn,
    enabled: !!integrationId,
    ...queryOptions,
  } as UseQueryOptions<
    Awaited<ReturnType<ReturnType<typeof useYieldGetFeeConfigurationHook>>>,
    TError,
    TData
  > & { queryKey: QueryKey };
};

export type YieldGetFeeConfigurationQueryResult = NonNullable<
  Awaited<ReturnType<ReturnType<typeof useYieldGetFeeConfigurationHook>>>
>;
export type YieldGetFeeConfigurationQueryError = void;

/**
 * @summary Get fee configuration given an integration ID
 */
export const useYieldGetFeeConfiguration = <
  TData = Awaited<
    ReturnType<ReturnType<typeof useYieldGetFeeConfigurationHook>>
  >,
  TError = void,
>(
  integrationId: string,
  options?: {
    query?: Partial<
      UseQueryOptions<
        Awaited<ReturnType<ReturnType<typeof useYieldGetFeeConfigurationHook>>>,
        TError,
        TData
      >
    >;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = useYieldGetFeeConfigurationQueryOptions(
    integrationId,
    options,
  );

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

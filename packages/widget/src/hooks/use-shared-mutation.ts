import {
  MutationFunction,
  MutationKey,
  UseMutationOptions,
  UseMutationResult,
  useIsMutating,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { queryClient } from "../services/query-client";

export const useSharedMutation = <
  TData = unknown,
  TError = unknown,
  TVariables = unknown,
  TContext = unknown
>(
  mutationKey: MutationKey,
  mutationFn: MutationFunction<TData, TVariables>,
  options?: Omit<
    UseMutationOptions<TData, TError, TVariables, TContext>,
    "mutationKey" | "mutationFn"
  >
): UseMutationResult<TData, TError, TVariables, TContext> => {
  const query = useQuery<TData, TError>(
    ["CustomMutation", mutationKey],
    async () => await Promise.resolve(false as unknown as TData),
    { retry: false, cacheTime: Infinity, staleTime: Infinity, enabled: false }
  );
  const queryError = useQuery<TError, TData>(
    ["CustomMutationError", mutationKey],
    async () => await Promise.resolve(false as unknown as TError),
    { retry: false, cacheTime: Infinity, staleTime: Infinity, enabled: false }
  );
  const mutation = useMutation<TData, TError, TVariables, TContext>(
    mutationKey,
    async (...params) => {
      queryClient.setQueryData(["CustomMutationError", mutationKey], false);
      return await mutationFn(...params);
    },
    {
      ...options,
      onSuccess: (data, variables, context) => {
        queryClient.setQueryData(["CustomMutation", mutationKey], data);
        if (options?.onSuccess) options.onSuccess(data, variables, context);
      },
      onError: (err, variables, context) => {
        queryClient.setQueryData(["CustomMutationError", mutationKey], err);
        if (options?.onError) options.onError(err, variables, context);
      },
    }
  );
  const isLoading = useIsMutating(mutationKey);

  // We need typecasting here due the ADT about the mutation result, and as we're using a data not related to the mutation result
  // The typescript can't infer the type correctly.
  // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
  return {
    ...mutation,
    data: query.data,
    isLoading: !!isLoading,
    error: queryError.data,
    isError: !!queryError.data,
  } as UseMutationResult<TData, TError, TVariables, TContext>;
};

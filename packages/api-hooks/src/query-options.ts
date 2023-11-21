import { QueryClient } from '@tanstack/react-query';
import { APIManager } from './api-client';

export const customQueryOptions = <T>(
  options: T,
): T & {
  queryClient: QueryClient | undefined;
} => {
  const queryClient = APIManager.getQueryClient() ?? undefined;

  return { ...options, queryClient };
};

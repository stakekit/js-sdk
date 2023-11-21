import React, { PropsWithChildren } from 'react';
import {
  QueryClientProvider,
  useQueryClient as useReactQueryClient,
} from '@tanstack/react-query';
import { APIManager } from './api-client';

export const useStakeKitQueryClient = () =>
  useReactQueryClient(APIManager.getQueryClient() ?? undefined);

export const StakeKitQueryProvider = ({ children }: PropsWithChildren) => {
  const queryClient = APIManager.getQueryClient();

  if (!queryClient) throw new Error('APIManager is not configured');

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

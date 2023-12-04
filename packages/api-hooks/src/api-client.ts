import { QueryClient, QueryClientConfig } from '@tanstack/react-query';
import Axios, { AxiosRequestConfig, AxiosInstance, AxiosError } from 'axios';
import { config } from './config';
import merge from 'lodash.merge';

export class APIManager {
  private static axiosInstance: AxiosInstance | null = null;
  static queryClient: QueryClient | null = null;

  private constructor() {}

  public static configure({
    apiKey,
    baseURL,
    queryClientConfig,
  }: {
    apiKey: string;
    baseURL: string;
    queryClientConfig?: QueryClientConfig;
  }) {
    this.axiosInstance = Axios.create({
      baseURL,
      headers: {
        'X-API-KEY': apiKey,
      },
    });

    const options = merge(this.defaultQueryClientConfig, queryClientConfig);

    this.queryClient = new QueryClient(options);
  }

  public static setApiKey(apiKey: string) {
    if (!this.axiosInstance) {
      throw new Error('APIManager is not configured');
    }

    this.axiosInstance.defaults.headers['X-API-KEY'] = apiKey;
  }

  public static getInstance() {
    return this.axiosInstance;
  }

  public static getQueryClient() {
    return this.queryClient;
  }

  private static defaultQueryClientConfig: QueryClientConfig = {
    defaultOptions: {
      queries: {
        gcTime: config.queryClient.cacheTime,
        staleTime: config.queryClient.staleTime,
        retry: (failureCount, error) => {
          if (error instanceof AxiosError) {
            return !!(
              error.response?.status &&
              error.response.status >= 500 &&
              failureCount < 2
            );
          }

          return failureCount < 2;
        },
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: (failureCount, error) => {
          if (error instanceof AxiosError) {
            return !!(
              error.response?.status &&
              error.response.status >= 500 &&
              failureCount < 2
            );
          }

          return false;
        },
      },
    },
  };
}

export const api = async <T>(config: AxiosRequestConfig): Promise<T> => {
  const axiosInstance = APIManager.getInstance();

  if (!axiosInstance) {
    throw new Error('APIManager is not configured');
  }

  const { data } = await axiosInstance({ ...config });

  return data;
};

export type ErrorType<T> = AxiosError<T>;

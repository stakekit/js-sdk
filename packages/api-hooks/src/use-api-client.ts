import { AxiosRequestConfig } from 'axios';
import { useApiClient } from './api-client-provider';

export const useApi = <T>() => {
  const apiClient = useApiClient();

  return (config: AxiosRequestConfig): Promise<T> =>
    apiClient(config).then((response) => response.data);
};

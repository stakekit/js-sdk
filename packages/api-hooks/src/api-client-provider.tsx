import { AxiosInstance } from 'axios';
import { PropsWithChildren, createContext, useContext } from 'react';

const Context = createContext<AxiosInstance | undefined>(undefined);

export const ApiClientProvider = ({
  apiClient,
  children,
}: PropsWithChildren<{ apiClient: AxiosInstance }>) => {
  return <Context.Provider value={apiClient}>{children}</Context.Provider>;
};

export const useApiClient = () => {
  const value = useContext(Context);

  if (!value) {
    throw new Error('ApiClient must be used within a ApiHooksProvider');
  }

  return value;
};

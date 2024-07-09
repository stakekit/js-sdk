import { PropsWithChildren, createContext, useContext } from 'react';

type ApiClientProps = {
  fetchInstance: <T>(
    url: string,
    requestInit: {
      method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
      data?: Record<string, any>;
      headers?: Record<string, any>;
      signal?: AbortSignal;
    },
  ) => Promise<T>;
  baseURL?: string;
  apiKey: string;
};

const Context = createContext<ApiClientProps | undefined>(undefined);

export const ApiClientProvider = ({
  children,
  ...apiClientProps
}: PropsWithChildren<ApiClientProps>) => (
  <Context.Provider value={apiClientProps}>{children}</Context.Provider>
);

export const useApiClientProps = () => {
  const value = useContext(Context);

  if (!value) {
    throw new Error('ApiClient must be used within a ApiHooksProvider');
  }

  return value;
};

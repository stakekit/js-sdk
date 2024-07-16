import { useApiClientProps } from './api-client-provider';

const defaultBaseURL = 'https://api.stakek.it/';

const getUrl = ({
  baseURL,
  path,
  params,
}: {
  baseURL: string;
  path: string;
  params?: Record<string, any>;
}): string => {
  const url = new URL(baseURL);
  url.pathname = path;

  if (params) {
    const urlSearchParams = new URLSearchParams();

    Object.keys(params).forEach((key) => {
      const val = params[key];
      if (val === undefined || val === null || val === '') return;

      urlSearchParams.append(key, params[key]);
    });

    url.search = urlSearchParams.toString();
  }

  return url.toString();
};

export const useApi = <T>() => {
  const {
    fetchInstance,
    apiKey,
    baseURL = defaultBaseURL,
  } = useApiClientProps();

  return ({
    url,
    data,
    method,
    params,
    headers,
    signal,
  }: {
    url: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    params?: any;
    data?: Record<string, any>;
    headers?: Record<string, any>;
    signal?: AbortSignal;
  }): Promise<T> =>
    fetchInstance<T>(getUrl({ baseURL, path: url, params }), {
      method,
      data,
      headers: { ...headers, 'X-API-KEY': apiKey },
      signal,
    });
};

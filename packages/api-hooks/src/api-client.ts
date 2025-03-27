import { StakeKitApiClient } from './api-client-config';

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

export const customFetch = async <T>({
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
}): Promise<T> => {
  const { apiKey, baseURL, fetchInstance } = StakeKitApiClient.getConfig();

  const finalUrl = getUrl({ baseURL, path: url, params });
  const requestInit: RequestInit = {
    method,
    headers: { ...headers, 'X-API-KEY': apiKey },
    signal,
    ...(data && { body: JSON.stringify(data) }),
  };

  if (fetchInstance) {
    return fetchInstance<T>(finalUrl, requestInit);
  }

  const response = await fetch(finalUrl, requestInit);

  if (response.ok) {
    return response.json();
  }

  return Promise.reject(response);
};

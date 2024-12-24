type CustomFetch = <T>(
  input: RequestInfo | URL,
  init?: RequestInit,
) => Promise<T>;

export class StakeKitApiClient {
  private static config: {
    apiKey: string;
    baseURL: string;
    customFetch?: CustomFetch;
  };

  static configure({
    apiKey,
    baseURL,
    customFetch,
  }: {
    apiKey: string;
    baseURL?: string;
    customFetch?: CustomFetch;
  }) {
    StakeKitApiClient.config = {
      apiKey,
      baseURL: baseURL || 'https://api.stakek.it/',
      customFetch,
    };
  }

  static getConfig() {
    return StakeKitApiClient.config;
  }
}

type FetchInstance = <T>(input: string, init: RequestInit) => Promise<T>;

export class StakeKitApiClient {
  private static config: {
    apiKey: string;
    baseURL: string;
    fetchInstance?: FetchInstance;
  };

  static configure({
    apiKey,
    baseURL,
    fetchInstance,
  }: {
    apiKey: string;
    baseURL?: string;
    fetchInstance?: FetchInstance;
  }) {
    StakeKitApiClient.config = {
      apiKey,
      baseURL: baseURL || 'https://api.stakek.it/',
      fetchInstance,
    };
  }

  static getConfig() {
    return StakeKitApiClient.config;
  }
}

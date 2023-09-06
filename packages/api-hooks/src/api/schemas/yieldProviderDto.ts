import type { YieldProviders } from './yieldProviders';

export interface YieldProviderDto {
  id: YieldProviders;
  name: string;
  description: string;
  externalLink: string;
  logoURI: string;
}

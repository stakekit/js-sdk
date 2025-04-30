import type { Networks } from './networks';

export type TokenGetTokensParams = {
  /**
   * When true, returns only tokens that are related to enabled yields
   */
  enabledYieldsOnly?: boolean;
  network?: Networks;
};

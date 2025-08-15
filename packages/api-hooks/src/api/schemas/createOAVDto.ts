import type { OAVStrategyDto } from './oAVStrategyDto';

export interface CreateOAVDto {
  /** vOAV Integration ID (must be an existing vOAV integration from core) */
  integrationId: string;
  /** Array of strategies with weights and APYs */
  strategies: OAVStrategyDto[];
}

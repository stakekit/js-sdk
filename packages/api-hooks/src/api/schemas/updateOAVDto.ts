import type { OAVStrategyDto } from './oAVStrategyDto';

export interface UpdateOAVDto {
  /** Whether the OAV is active */
  isActive?: boolean;
  /** Array of strategies with weights and APYs */
  strategies?: OAVStrategyDto[];
}

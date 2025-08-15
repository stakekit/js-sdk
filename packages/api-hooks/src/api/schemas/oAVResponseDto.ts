import type { OAVStrategyDto } from './oAVStrategyDto';

export interface OAVResponseDto {
  /** Creation timestamp */
  createdAt: string;
  /** Unique identifier */
  id: string;
  /** Integration ID for the OAV */
  integrationId: string;
  /** Whether the OAV is active */
  isActive: boolean;
  /** Project ID */
  projectId: string;
  /** Array of strategies with yield IDs and weights */
  strategies: OAVStrategyDto[];
  /** Last update timestamp */
  updatedAt: string;
}

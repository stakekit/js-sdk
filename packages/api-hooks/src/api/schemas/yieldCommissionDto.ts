import type { CommissionAppliesTo } from './commissionAppliesTo';

export interface YieldCommissionDto {
  appliesTo: CommissionAppliesTo;
  value: number;
}

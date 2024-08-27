import type { YieldBalanceLabelDto } from './yieldBalanceLabelDto';
import type { PendingActionDto } from './pendingActionDto';
import type { TokenDto } from './tokenDto';
import type { BalanceTypes } from './balanceTypes';
import type { YieldBalanceValueDto } from './yieldBalanceValueDto';

export interface YieldBalanceDto {
  amount: string;
  date?: string;
  groupId: string;
  label?: YieldBalanceLabelDto;
  pendingActions: PendingActionDto[];
  /** The price of the reward token as a multiple of the underlying token. Used when dealing with index based yields where the reward asset appreciates in value over time. */
  pricePerShare: string;
  providerId?: string;
  token: TokenDto;
  type: BalanceTypes;
  validatorAddress?: string;
  validatorAddresses?: string[];
  value?: YieldBalanceValueDto;
}

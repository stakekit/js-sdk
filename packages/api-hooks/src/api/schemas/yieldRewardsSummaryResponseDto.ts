import type { YieldRewardsSummaryDto } from './yieldRewardsSummaryDto';
import type { TokenDto } from './tokenDto';

export interface YieldRewardsSummaryResponseDto {
  rewards: YieldRewardsSummaryDto;
  token: TokenDto;
}

import type { WalletViewDto } from './walletViewDto';
import type { StakeResponseDtoStake } from './stakeResponseDtoStake';

export interface StakeResponseDto {
  id: WalletViewDto;
  stake: StakeResponseDtoStake;
}

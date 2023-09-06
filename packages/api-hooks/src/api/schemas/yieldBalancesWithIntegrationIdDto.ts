import type { AddressesDto } from './addressesDto';
import type { ValidatorAddressesDto } from './validatorAddressesDto';
import type { YieldBalanceDto } from './yieldBalanceDto';

export interface YieldBalancesWithIntegrationIdDto {
  addresses: AddressesDto;
  args?: ValidatorAddressesDto;
  integrationId: string;
  balances: YieldBalanceDto[];
}

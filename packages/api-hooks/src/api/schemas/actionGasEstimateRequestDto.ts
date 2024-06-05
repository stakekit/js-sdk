import type { AddressesDto } from './addressesDto';
import type { ActionArgumentsDto } from './actionArgumentsDto';
import type { ActionGasEstimateRequestDtoGasArgs } from './actionGasEstimateRequestDtoGasArgs';

export interface ActionGasEstimateRequestDto {
  addresses: AddressesDto;
  args: ActionArgumentsDto;
  /** Custom gas properties to request gas estimate with. Can include properties like `gasPrice`, `maxGasPerFee`, etc for EVM chains. */
  gasArgs?: ActionGasEstimateRequestDtoGasArgs;
  integrationId: string;
  referralCode?: string;
}

import type { AddressArgumentsDto } from './addressArgumentsDto';
import type { ArgumentOptionsDto } from './argumentOptionsDto';

export interface ActionArgumentOptionsDto {
  addresses?: AddressArgumentsDto;
  args?: ArgumentOptionsDto;
}

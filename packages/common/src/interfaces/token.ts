import { Networks } from '../enums';

export class Token {
  name!: string;
  network!: Networks;
  symbol!: string;
  decimals!: number;
  address?: string;

  coinGeckoId?: string;

  logoURI?: string;
}

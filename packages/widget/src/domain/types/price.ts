import { TokenString } from "./tokens";

export type Price = {
  price: number | undefined;
  price24H: number | undefined;
};

export type Prices = Map<TokenString, Price>;

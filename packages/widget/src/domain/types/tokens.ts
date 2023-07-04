import { Token } from "@stakekit/common";

export type TokenString = `${Token["network"]}-${Token["address"]}`;

import {
  AddressWithTokenDtoAdditionalAddresses,
  TransactionDto,
} from "@stakekit/api-hooks";
import { EitherAsync } from "purify-ts";
import {
  SendTransactionError,
  TransactionDecodeError,
} from "../../pages/steps/errors";
import { GetNetworkResult } from "@wagmi/core";
import { CosmosNetworks, EvmNetworks } from "@stakekit/common";

export type Hash = string;

export type SKWallet = {
  disconnect: () => Promise<void>;
  sendTransaction: (
    tx: NonNullable<TransactionDto["unsignedTransaction"]>,
    index: number
  ) => EitherAsync<
    TransactionDecodeError | SendTransactionError,
    { hash: Hash }
  >;
  additionalAddresses: AddressWithTokenDtoAdditionalAddresses | null;
} & (
  | {
      network: EvmNetworks | CosmosNetworks;
      address: string;
      chain: GetNetworkResult["chain"];
      isConnected: true;
      isConnecting: false;
    }
  | {
      network: null;
      address: null;
      chain: null;
      isConnected: false;
      isConnecting: boolean;
    }
);

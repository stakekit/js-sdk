import {
  Codec,
  GetType,
  Left,
  Right,
  number,
  optional,
  string,
} from "purify-ts";
import { Hex } from "viem";

const bigintCodec = Codec.custom<bigint>({
  decode: (input) => {
    if (typeof input !== "string" && typeof input !== "number") {
      return Left("Invalid value type");
    }

    const val = BigInt(input);

    return Right(val);
  },
  encode: (input) => input.toString(),
});

const hexStringCodec = Codec.custom<Hex>({
  decode: (input) =>
    typeof input === "string" && input.startsWith("0x")
      ? Right(input as Hex)
      : Left("Invalid hex string"),
  encode: (input) => input,
});

export const unsignedTransactionCodec = Codec.interface({
  data: hexStringCodec,
  to: string,
  gasLimit: bigintCodec,
  from: string,
  value: optional(bigintCodec),
  nonce: number,
  type: number,
  maxFeePerGas: optional(bigintCodec),
  maxPriorityFeePerGas: optional(bigintCodec),
  chainId: number,
});

export type UnsignedTransaction = GetType<typeof unsignedTransactionCodec>;

import { Either, GetType, Right, record, string } from "purify-ts";

type KV = {
  skPubKeys: Record<string, string>;
};

const codecs = {
  skPubKeys: record(string, string),
};

export const getStorageItem = (
  key: keyof KV
): Either<Error, null | GetType<(typeof codecs)[keyof KV]>> => {
  const val = localStorage.getItem(key);

  if (!val) return Right(null);

  return Either.encase(() => JSON.parse(val)).chain((parsedVal) =>
    codecs[key].decode(parsedVal).mapLeft((e) => new Error(e))
  );
};

export const setStorageItem = <T extends keyof KV>(
  key: T,
  value: GetType<(typeof codecs)[T]>
) => {
  return Either.encase(() => localStorage.setItem(key, JSON.stringify(value)));
};

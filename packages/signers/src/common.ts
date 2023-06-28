import * as bip32 from "bip32";
import * as bip39 from "bip39";
// @ts-ignore
import hdkeyImport from "ethereumjs-wallet/dist/hdkey";
import * as memoizee from "memoizee";

export const getSeed = memoizee(async (mnemonic: string) => {
  return bip39.mnemonicToSeed(mnemonic);
});

export const getNode = memoizee(async (mnemonic: string) => {
  return bip32.fromSeed(Buffer.from(await getSeed(mnemonic)));
});

export const derive = async (mnemonic: string, path: string) => {
  const hdWallet = hdkeyImport.fromMasterSeed(
    Buffer.from(await getSeed(mnemonic))
  );

  const root = hdWallet.derivePath(path);
  return root.getWallet().getPrivateKey().toString("hex");
};

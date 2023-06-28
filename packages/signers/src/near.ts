import * as bs58 from "bs58";
import { derivePath } from "ed25519-hd-key";
import { Signer, utils } from "near-api-js";
import * as nacl from "tweetnacl";

import NearLedgerApp from "near-ledger-js";
import { getSeed } from "./common";
import {
  isLedgerOptions,
  LedgerApps,
  walletDerivationPaths,
  WalletOptions,
} from "./constants";
import { NearLedgerSigner, NearSigner } from "./ledger/near";

export async function nearKeyPairToAddress(keyPair: Signer) {
  const pubKey = await keyPair.getPublicKey();
  return Buffer.from(pubKey.data).toString("hex");
}

export const getNearWallet = async (options: WalletOptions) => {
  if (isLedgerOptions(options)) {
    if (!options.config.NEAR?.derivationPath) {
      throw new Error("no derivation path");
    }

    const transport = await options.transport(LedgerApps.NEAR);
    const app = await NearLedgerApp.createClient(transport);
    return new NearLedgerSigner(app, options.config.NEAR.derivationPath);
  }

  const { mnemonic, walletType, index } = options;
  const seed = await getSeed(mnemonic);

  const derivationPath = walletDerivationPaths[walletType].near(index)!;
  const { key } = derivePath(derivationPath, Buffer.from(seed).toString("hex"));

  const keyPair = nacl.sign.keyPair.fromSeed(key);

  const secretKey = "ed25519:" + bs58.encode(Buffer.from(keyPair.secretKey));

  const kp = utils.KeyPair.fromString(secretKey);
  return new NearSigner(kp);
};

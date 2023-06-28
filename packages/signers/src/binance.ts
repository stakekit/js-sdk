import { BncClient, crypto, ledger } from "@binance-chain/javascript-sdk";
import { LedgerSigningDelegate } from "@binance-chain/javascript-sdk/lib/client";
import { PublicKey } from "@binance-chain/javascript-sdk/lib/ledger/ledger-app";

import { derive } from "./common";
import {
  isLedgerOptions,
  LedgerApps,
  walletDerivationPaths,
  WalletOptions,
} from "./constants";

type SigningDelegate = BncClient["_signingDelegate"];

export const getBinanceChainWallet = async (
  options: WalletOptions
): Promise<
  | { address: string; delegate: SigningDelegate }
  | { address: string; privateKey: string }
> => {
  if (isLedgerOptions(options)) {
    if (!options.config.Binance?.derivationPath) {
      throw new Error("binance derivation path not found");
    }

    const hdPath = options.config.Binance.derivationPath
      .split("/")
      .map((x) => parseInt(x));

    const app = new ledger.LedgerApp(
      await options.transport(LedgerApps.Binance)
    );
    const publicKey: PublicKey = await app.getPublicKey(hdPath);
    if (!publicKey.pk) {
      throw new Error("unable to pull public key");
    }

    const address = crypto.getAddressFromPublicKey(
      publicKey.pk.toString("hex"),
      "bnb"
    );

    const delegate = LedgerSigningDelegate(
      app,
      () => {},
      () => {},
      () => {},
      hdPath
    );

    return { delegate, address };
  }

  const { mnemonic, walletType, index } = options;
  const derivationPath = walletDerivationPaths[walletType].binanceChain(index)!;

  const privateKey = await derive(mnemonic, derivationPath);
  const address = crypto.getAddressFromPrivateKey(privateKey, "bnb");
  return { address, privateKey };
};

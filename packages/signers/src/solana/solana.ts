import { Keypair } from "@solana/web3.js";
import { derivePath } from "ed25519-hd-key";
import * as nacl from "tweetnacl";

import { getNode, getSeed } from "../common";
import {
  ImportableWallets,
  LedgerApps,
  SolanaWalletOptions,
  WalletOptions,
  isLedgerOptions,
  isSolanaWalletOptions,
  walletDerivationPaths,
} from "../constants";
import {
  STEAKWALLET_SOLANA_DERIVATION_PATH,
  isSteakwalletSolana,
} from "./constants";
import {
  SolanaKeyPairSigner,
  SolanaLedgerSigner,
  SolanaSigner,
} from "./signers";

async function fromMnemonic(mnemonic: string, derivationPath: string) {
  // stake account
  // it is the first index, meaning Steakwallet or Phantom and it's explicitly not
  // a fully qualified first Phantom index
  if (
    isSteakwalletSolana(derivationPath) &&
    derivationPath !== STEAKWALLET_SOLANA_DERIVATION_PATH
  ) {
    const node = await getNode(mnemonic);
    const base = node.derivePath(derivationPath);
    return new SolanaKeyPairSigner(Keypair.fromSeed(base.privateKey!));
  }

  // Phantom wallet or a Phantom stake account
  const seed = Buffer.from(await getSeed(mnemonic)).toString("hex");
  const key = derivePath(derivationPath, seed).key;
  return new SolanaKeyPairSigner(
    Keypair.fromSecretKey(nacl.sign.keyPair.fromSeed(key).secretKey)
  );
}

/**
 * Absence of any derivation path means it's a basic Steakwallet/Omni account
 *
 * m/44'/501'/0'/XXX' means it could be either a Steakwallet stake account
 * or the stake account of the first index of a Phantom wallet
 *
 * m/44'/501'/XXX'/XXX' means it's a Phantom wallet or a Phantom stake account
 */
export const getSolanaWallet = async (
  options: WalletOptions | SolanaWalletOptions
): Promise<SolanaSigner> => {
  if (isLedgerOptions(options)) {
    if (!options.config.Solana?.derivationPath) {
      throw new Error("missing solana derivation path");
    }

    return new SolanaLedgerSigner(
      await options.transport(LedgerApps.Solana),
      options.config.Solana.derivationPath!
    );
  }

  if (isSolanaWalletOptions(options)) {
    return fromMnemonic(options.mnemonic, options.derivationPathOverride);
  }

  if (
    options.walletType === ImportableWallets.Steakwallet ||
    options.walletType === ImportableWallets.Omni
  ) {
    const node = await getNode(options.mnemonic);
    const base = node.derivePath(STEAKWALLET_SOLANA_DERIVATION_PATH);
    return new SolanaKeyPairSigner(Keypair.fromSeed(base.privateKey!));
  }

  const derivationPath = walletDerivationPaths[options.walletType].solana(
    options.index
  )!;
  return fromMnemonic(options.mnemonic, derivationPath);
};

import { Keypair } from '@solana/web3.js';
import { derivePath } from 'ed25519-hd-key';
import * as nacl from 'tweetnacl';

import { getNode, getSeed } from '../common';
import {
  ImportableWallets,
  LedgerApps,
  LedgerOptions,
  MnemonicWalletOptions,
  SolanaMnemonicOptions,
  SolanaWalletOptions,
  WalletOptions,
  isLedgerOptions,
  isSolanaWalletOptions,
  walletDerivationPaths,
} from '../constants';
import {
  STEAKWALLET_SOLANA_DERIVATION_PATH,
  isSteakwalletSolana,
} from './constants';
import {
  SolanaKeyPairSigner,
  SolanaLedgerSigner,
  SolanaSigner,
} from './signers';

const getDerivationPath = (
  options: MnemonicWalletOptions | SolanaMnemonicOptions,
): string | undefined => {
  if (isSolanaWalletOptions(options)) {
    return options.derivationPathOverride;
  }

  if (
    options.walletType === ImportableWallets.Steakwallet ||
    options.walletType === ImportableWallets.Omni
  ) {
    return STEAKWALLET_SOLANA_DERIVATION_PATH;
  }

  return walletDerivationPaths[options.walletType].solana(options.index);
};

const getSolanaKeypair = async (
  mnemonic: string,
  derivationPath: string,
): Promise<Keypair> => {
  if (isSteakwalletSolana(derivationPath)) {
    // stake account
    // it is the first index, meaning Steakwallet or Phantom and it's explicitly not
    // a fully qualified first Phantom index
    const node = await getNode(mnemonic);
    const base = node.derivePath(derivationPath);

    return Keypair.fromSeed(base.privateKey!);
  }

  // Phantom wallet or a Phantom stake account
  const seed = Buffer.from(await getSeed(mnemonic)).toString('hex');
  const key = derivePath(derivationPath, seed).key;

  return Keypair.fromSecretKey(nacl.sign.keyPair.fromSeed(key).secretKey);
};

const getLedgerWallet = async (
  options: LedgerOptions,
): Promise<SolanaSigner> => {
  if (!options.config.Solana?.derivationPath) {
    throw new Error('missing solana derivation path');
  }

  return new SolanaLedgerSigner(
    await options.transport(LedgerApps.Solana),
    options.config.Solana.derivationPath!,
  );
};

/**
 * Absence of any derivation path means it's a basic Steakwallet/Omni account
 *
 * m/44'/501'/0'/XXX' means it could be either a Steakwallet stake account
 * or the stake account of the first index of a Phantom wallet
 *
 * m/44'/501'/XXX'/XXX' means it's a Phantom wallet or a Phantom stake account
 */
export const getSolanaWallet = async (
  options: WalletOptions | SolanaWalletOptions,
): Promise<SolanaSigner> => {
  if (isLedgerOptions(options)) {
    return getLedgerWallet(options);
  }

  const derivationPath = getDerivationPath(options);
  if (derivationPath === undefined) {
    throw new Error(
      `Derivation path for Solana not found for this wallet type ${options.walletType}`,
    );
  }

  const keypair = await getSolanaKeypair(options.mnemonic, derivationPath);

  return new SolanaKeyPairSigner(keypair);
};

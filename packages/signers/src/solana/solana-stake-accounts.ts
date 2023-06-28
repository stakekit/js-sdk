import { incrementDerivationPath } from '../utils/increment-derivation-path';
import { STEAKWALLET_SOLANA_DERIVATION_PATH } from './constants';
import { MnemonicWalletOptions, walletDerivationPaths } from '../constants';

/**
 * What is this?
 *
 * If you have a Steakwallet Solana account, it'll have been derived from
 * STEAKWALLET_SOLANA_DERIVATION_PATH, when we're deriving the stake accounts
 * we can simply increment this derivation path for each one.
 *
 * If you have a MetaMask/Phantom/Keplr based Solana account, we can't simply
 * increment the derivation path as that account would then clash with the next
 * base account index.
 *
 * It's important to note that Steakwallets will never have more than one index
 * with this scheme.
 *
 * What we need to do is extend and then begin incrementing.
 *
 * ie.
 *    - we have derivation path (from Steakwallet) m/44'/501'/0'/0'
 *    - incrementing would lead to m/44'/501'/0'/1' which is OK
 *    - we have derivation path (from MM) m/44'/60'/0'/0/0
 *    - incrementing would lead to m/44'/60'/0'/0/1 however this clashes with
 *      their base account of another index. So we extend by one to avoid that
 *      situation, giving m/44'/60'/0'/0/0/0, m/44'/60'/0'/0/0/1, etc
 */

export function getSolanaStakeAccountDerivationPath(
  options: Omit<MnemonicWalletOptions, 'mnemonic'>,
  incrementBy: number
) {
  const derivationPath = walletDerivationPaths[options.walletType].solana(
    options.index
  )!;

  let baseDerivationPath = derivationPath ?? STEAKWALLET_SOLANA_DERIVATION_PATH;
  if (baseDerivationPath !== STEAKWALLET_SOLANA_DERIVATION_PATH) {
    baseDerivationPath = `${baseDerivationPath}/0`;
  }

  return incrementDerivationPath(baseDerivationPath, incrementBy);
}

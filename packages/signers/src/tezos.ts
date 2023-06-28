import { LedgerSigner } from '@taquito/ledger-signer';
import { InMemorySigner } from '@taquito/signer';
import * as TaquitoUtils from '@taquito/utils';
import { derivePath } from 'ed25519-hd-key';

import { getSeed } from './common';
import {
  ImportableWallets,
  isLedgerOptions,
  LedgerApps,
  walletDerivationPaths,
  WalletOptions,
} from './constants';

export const getTezosWallet = async (
  options: WalletOptions
): Promise<InMemorySigner | LedgerSigner> => {
  if (isLedgerOptions(options)) {
    if (!options.config.Tezos?.derivationPath) {
      throw new Error('missing Tezos derivation path');
    }

    const signer = new LedgerSigner(
      await options.transport(LedgerApps.Tezos),
      options.config.Tezos.derivationPath,
      false
    );
    return signer;
  }

  const { mnemonic, walletType, index } = options;
  const derivationPath = walletDerivationPaths[walletType].tezos(index)!;
  if (!derivationPath) {
    return await InMemorySigner.fromFundraiser(
      'steakwallet',
      'steakwallet',
      mnemonic
    );
  }

  if (walletType === ImportableWallets.Temple) {
    const seed = await getSeed(mnemonic);
    const { key } = derivePath(derivationPath, seed.toString('hex'));
    return InMemorySigner.fromSecretKey(
      TaquitoUtils.b58cencode(key.slice(0, 32), TaquitoUtils.prefix.edsk2)
    );
  }

  const { key } = derivePath(
    derivationPath,
    Buffer.from(mnemonic).toString('hex')
  );
  return InMemorySigner.fromSecretKey(
    TaquitoUtils.b58cencode(key.slice(0, 32), TaquitoUtils.prefix.edsk2)
  );
};

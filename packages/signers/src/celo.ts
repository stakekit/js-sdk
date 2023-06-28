import { getNode } from './common';

import {
  ImportableWallets,
  isLedgerOptions,
  walletDerivationPaths,
  WalletOptions,
} from './constants';
import { EthWalletApp, getEthereumWallet } from './ethereum';

export const getCeloWallet = async (options: WalletOptions) => {
  if (
    !isLedgerOptions(options) &&
    options.walletType === ImportableWallets.Steakwallet
  ) {
    const { mnemonic, walletType, index } = options;
    const derivationPath = walletDerivationPaths[walletType].celo(index)!;
    const node = await getNode(mnemonic);
    const newNode = node.derivePath(derivationPath);
    return new EthWalletApp(newNode.privateKey!);
  }

  return getEthereumWallet(options);
};

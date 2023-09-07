import * as TronWeb from 'tronweb';
import {
  isLedgerOptions,
  walletDerivationPaths,
  WalletOptions,
} from './constants';

const TRON_HOST = 'https://api.trongrid.io';

export const getTronWallet = async (options: WalletOptions) => {
  if (isLedgerOptions(options)) {
    // TODO add ledger support
    throw new Error('Ledger mode is not supported.');
  }

  const { mnemonic, walletType, index } = options;
  const privateKey: string = TronWeb.fromMnemonic(
    mnemonic,
    walletDerivationPaths[walletType].tron(index),
  ).privateKey;

  const tronWallet = new TronWeb({
    fullHost: TRON_HOST,
    privateKey: privateKey.substring(2), // We need to remove 0x from the output above
  });

  return tronWallet;
};

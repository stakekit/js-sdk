import { ethers } from 'ethers';

import EthLedgerApp from '@ledgerhq/hw-app-eth';
import { EthereumLedgerSigner } from '../ledger/ethereum';

import { derive, getSeed } from '../common';
import {
  isLedgerOptions,
  LedgerApps,
  walletDerivationPaths,
  WalletOptions,
} from '../constants';
import { EthWalletApp } from './eip712-wrapper';

export const getEthereumWallet = async (options: WalletOptions) => {
  if (isLedgerOptions(options)) {
    if (!options.config.Ethereum?.derivationPath) {
      throw new Error('missing Ethereum derivation path');
    }

    const app = new EthLedgerApp(await options.transport(LedgerApps.Ethereum));
    return await EthereumLedgerSigner.init(app, {
      derivationPath: options.config.Ethereum.derivationPath,
    });
  }

  const { mnemonic, walletType, index } = options;
  const derivationPath = walletDerivationPaths[walletType].evm(index);

  if (!derivationPath) {
    const seed = await getSeed(mnemonic);
    const hdNode = ethers.utils.HDNode.fromSeed(seed);
    return new EthWalletApp(hdNode.privateKey);
  }

  const privateKey = await derive(mnemonic, derivationPath);
  const rawWallet = new EthWalletApp(privateKey);
  return rawWallet;
};

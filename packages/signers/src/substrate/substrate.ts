import { ApiPromise, HttpProvider, Keyring } from '@polkadot/api';
import { KeyringPair } from '@polkadot/keyring/types';
import { SubstrateNetworks } from '@stakekit/common';
import {
  WalletOptions,
  isLedgerOptions,
  walletDerivationPaths,
} from '../constants';
import { getKeyringOptionsFromNetwork } from './utils';

export const getSubstrateWallet = async (
  options: WalletOptions,
  network: SubstrateNetworks,
): Promise<KeyringPair> => {
  if (isLedgerOptions(options)) {
    // TODO add ledger support
    // Check portability here: https://wiki.polkadot.network/docs/learn-account-advanced#portability
    throw new Error('Ledger mode is not supported.');
  }

  const { mnemonic, walletType, index } = options;
  const derivationPath = walletDerivationPaths[walletType].polkadot(index);

  const provider = new HttpProvider('https://rpc.polkadot.io');
  const api = await ApiPromise.create({ provider });

  const keyring = new Keyring(getKeyringOptionsFromNetwork(network));

  const wallet = keyring.createFromUri(`${mnemonic}${derivationPath}`);

  await api.disconnect();

  return wallet;
};

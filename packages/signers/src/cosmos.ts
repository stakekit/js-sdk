import { Secp256k1HdWallet } from '@cosmjs/amino';
import { stringToPath } from '@cosmjs/crypto';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import CosmosLedgerApp from '@ledgerhq/hw-app-cosmos';

import { getSeed } from './common';
import {
  isLedgerOptions,
  keplrPath,
  LedgerApps,
  walletDerivationPaths,
  WalletOptions,
} from './constants';
import { CosmosLedgerSigner } from './ledger/cosmos/cosmos';

export const getStargateWallet = async (
  prefix: string,
  options: WalletOptions,
): Promise<Secp256k1HdWallet | DirectSecp256k1HdWallet> => {
  if (isLedgerOptions(options)) {
    if (!options.config.Cosmos?.derivationPath) {
      throw new Error('missing cosmos derivation path');
    }

    const app = new CosmosLedgerApp(await options.transport(LedgerApps.Cosmos));
    const signer = await CosmosLedgerSigner.init(app, {
      derivationPath: options.config.Cosmos.derivationPath,
      prefix,
    });

    // @ts-expect-error
    return signer;
  }

  const { mnemonic, walletType, index } = options;
  const seed = await getSeed(mnemonic);

  const derivationPath = walletDerivationPaths[walletType].cosmos(index)!;
  // @ts-ignore
  const wallet = new DirectSecp256k1HdWallet(mnemonic, {
    prefix,
    hdPaths: derivationPath ? [stringToPath(derivationPath)] : undefined,
    seed,
  });

  return wallet;
};

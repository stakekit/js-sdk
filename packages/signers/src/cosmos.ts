import { Secp256k1HdWallet } from '@cosmjs/amino';
import { stringToPath } from '@cosmjs/crypto';
import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import CosmosLedgerApp from '@ledgerhq/hw-app-cosmos';

import { CosmosNetworks } from '@stakekit/common';
import { getSeed } from './common';
import {
  isLedgerOptions,
  LedgerApps,
  walletDerivationPaths,
  WalletOptions,
} from './constants';
import { CosmosLedgerSigner } from './ledger/cosmos/cosmos';

// Sources:
// https://github.com/satoshilabs/slips/blob/master/slip-0044.md
// https://github.com/trustwallet/wallet-core/blob/master/registry.json
const getCosmosNetworksCoinType = (network: CosmosNetworks): number => {
  switch (network) {
    case CosmosNetworks.Kava:
      return 459;
    case CosmosNetworks.Secret:
      return 529;
    case CosmosNetworks.IRISnet:
      return 566;
    case CosmosNetworks.Desmos:
      return 852;
    case CosmosNetworks.Coreum:
      return 990;

    default:
      return 118;
  }
};

export const getStargateWallet = async (
  prefix: string,
  options: WalletOptions,
  network: CosmosNetworks,
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

  const derivationPath = walletDerivationPaths[walletType].cosmos(
    index,
    getCosmosNetworksCoinType(network),
  );

  // @ts-ignore
  const wallet = new DirectSecp256k1HdWallet(mnemonic, {
    prefix,
    hdPaths: derivationPath ? [stringToPath(derivationPath)] : undefined,
    seed,
  });

  return wallet;
};

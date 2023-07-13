import { ledger as BinanceChain } from '@binance-chain/javascript-sdk';
import CosmosLedgerApp from '@ledgerhq/hw-app-cosmos';
import EthLedgerApp from '@ledgerhq/hw-app-eth';
import SolanaLedgerApp from '@ledgerhq/hw-app-solana';
import Transport from '@ledgerhq/hw-transport';
import AvaxLedgerApp from '@obsidiansystems/hw-app-avalanche';
import {
  HDPathTemplate,
  LedgerSigner as TezosLedgerApp,
} from '@taquito/ledger-signer';
import NearLedgerApp from 'near-ledger-js';

import { LedgerApps } from '../constants';

const resolver: {
  [x in LedgerApps]: (transport: Transport) => Promise<boolean>;
} = {
  [LedgerApps.Avalanche]: async (t) => {
    const app = new AvaxLedgerApp(t);
    return !!(await app.getAppConfiguration());
  },
  [LedgerApps.Ethereum]: async (t) => {
    // @ts-expect-error
    const app = new EthLedgerApp(t);
    return !!(await app.getAppConfiguration());
  },
  [LedgerApps.NEAR]: async (t) => {
    const app = await NearLedgerApp.createClient(t);
    return !!(await app.getVersion());
  },
  [LedgerApps.Tezos]: async (t) => {
    const signer = new TezosLedgerApp(t, HDPathTemplate(0), false);
    return !!(await signer.publicKeyHash());
  },
  [LedgerApps.Binance]: async (t) => {
    const app = new BinanceChain.LedgerApp(t);
    return !!(await app.getVersion());
  },
  [LedgerApps.Solana]: async (t) => {
    // @ts-expect-error
    const app = new SolanaLedgerApp(t);
    return !!(await app.getAppConfiguration());
  },
  [LedgerApps.Cosmos]: async (t) => {
    // @ts-expect-error
    const app = new CosmosLedgerApp(t);
    const config = await app.getAppConfiguration();
    return config.device_locked === false;
  },
};

export function isTransportConnected(
  transport: Transport<string>,
  app: LedgerApps,
) {
  return resolver[app](transport);
}

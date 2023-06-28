import { AdditionalAddresses } from '@stakekit/common';

/**
 * The placement of this index is of utmost importance
 * "m / purpose' / coin_type' / account' / change / address_index"
 *
 */
export const keplrPath = (index: number) => `m/44'/118'/0'/0/${index}`;
export const phantomPath = (index: number) => `m/44'/501'/${index}'/0'`;
export const metamaskPath = (index: number) => `m/44'/60'/0'/0/${index}`;
export const templePath = (index: number) => `m/44'/1729'/${index}'/0'`;

const nearPath = () => "m/44'/397'/0'";
const binanceChainPath = () => "m/44'/714'/0'/0/0";
const celoPath = () => "m/44'/52752'/0'/0/0";

export enum ImportableWallets {
  MetaMask = 'MetaMask',
  Keplr = 'Keplr',
  Phantom = 'Phantom',
  Steakwallet = 'Steakwallet',
  Omni = 'Omni',
  Temple = 'Temple',
}

export enum LedgerWallet {
  Ledger = 'ledger',
}

export type SupportedWallets = ImportableWallets | LedgerWallet;
export const SupportedWallets = { ...ImportableWallets, ...LedgerWallet };

export type MnemonicWalletOptions = {
  mnemonic: string;
  walletType: ImportableWallets;
  index: number;
};

export type WalletOptions = MnemonicWalletOptions | LedgerOptions;

export interface SigningWallet {
  signTransaction: (tx: string) => Promise<string>;
  getAddress: () => Promise<string>;
  getAdditionalAddresses: () => Promise<AdditionalAddresses>;
}

export type LedgerOptions = {
  config: {
    [x in LedgerApps]?: {
      derivationPath: string;
    };
  };
  transport: (app: LedgerApps) => Promise<any>;
};

export function isLedgerOptions(
  x: WalletOptions | LedgerOptions | SolanaWalletOptions,
): x is LedgerOptions {
  return !!(x as any).transport;
}

export type SolanaMnemonicOptions = MnemonicWalletOptions & {
  mnemonic: string;
  derivationPathOverride: string;
};

export type SolanaWalletOptions = SolanaMnemonicOptions | LedgerOptions;

export function isSolanaWalletOptions(
  options: WalletOptions | SolanaWalletOptions,
): options is SolanaWalletOptions {
  return (options as any).derivationPathOverride;
}

export enum WalletDomain {
  evm = 'evm',
  cosmos = 'cosmos',
  near = 'near',
  tezos = 'tezos',
  solana = 'solana',
  binanceChain = 'binanceChain',
  celo = 'celo',
}

export type WalletDerivationPaths = {
  [x in WalletDomain]: (index: number) => string | undefined;
};

const steakwalletDerivationPaths: WalletDerivationPaths = {
  cosmos: keplrPath,
  evm: () => undefined,
  near: nearPath,
  solana: () => phantomPath(0),
  tezos: () => undefined,
  binanceChain: binanceChainPath,
  celo: celoPath,
};

const omniDerivationPaths: {
  [x in WalletDomain]: (index: number) => string | undefined;
} = {
  ...steakwalletDerivationPaths,
  evm: metamaskPath,
};

const createDerivationPaths = (
  fn: (index: number) => string | undefined,
): WalletDerivationPaths =>
  Object.values(WalletDomain).reduce(
    (accum, cur) => ({ ...accum, [cur]: fn }),
    {} as WalletDerivationPaths,
  );

export const walletDerivationPaths: {
  [x in ImportableWallets]: WalletDerivationPaths;
} = {
  [ImportableWallets.MetaMask]: createDerivationPaths(metamaskPath),
  [ImportableWallets.Keplr]: createDerivationPaths(keplrPath),
  [ImportableWallets.Phantom]: createDerivationPaths(phantomPath),
  [ImportableWallets.Steakwallet]: steakwalletDerivationPaths,
  [ImportableWallets.Omni]: omniDerivationPaths,
  [ImportableWallets.Temple]: createDerivationPaths(templePath),
};

export enum LedgerApps {
  Ethereum = 'Ethereum',
  Cosmos = 'Cosmos',
  NEAR = 'NEAR',
  Tezos = 'Tezos',
  Solana = 'Solana',
  Avalanche = 'Avalanche',
  Binance = 'Binance',
}

export const defaultLedgerDerivationPaths: { [x in LedgerApps]: string } = {
  [LedgerApps.Ethereum]: metamaskPath(0),
  [LedgerApps.Cosmos]: keplrPath(0),
  [LedgerApps.NEAR]: "44'/397'/0'/0'/1'",
  [LedgerApps.Tezos]: "44'/1729'/0'/0'",
  [LedgerApps.Avalanche]: "m/44'/9000'/0'/0/0",
  [LedgerApps.Binance]: "44/714/0/0/0'",
  [LedgerApps.Solana]: phantomPath(0),
};

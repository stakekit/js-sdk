# StakeKit Signers

## Introduction

The StakeKit Signers is a package that allows you to create a signing wallet instance from a mnemonic phrase or ledger app and sign transactions.

In addition to that, you can provide a custom derivation path for your mnemonic phrase and get different wallets derived from it, from different types of wallet mechanisms, such as MetaMask, Omni, Phantom or Keplr.

### Supported Networks

We currently support the following networks:

- Avalanche-C
- Avalanche-C Atomic
- Avalanche-P
- Arbitrum
- Binance
- BinanceBeacon
- Celo
- Ethereum
- Ethereum Goerli
- Fantom
- Harmony
- Optimism
- Polygon
- Akash
- Cosmos
- Juno
- Kava
- Osmosis
- Stargaze
- Near
- Solana
- Tezos

### Supported Wallets

We currently support:

- MetaMask
- Omni
- Phantom
- Keplr
- SteakWallet
- Temple

## Development

Create `.env` file and add variables from `.env.example`.

Install all dependencies:

```bash
yarn install
```

## Installation

To install StakeKit Signers (in addition, we recomment installing the packages @stakekit/common):

```bash
npm install @stakekit/signers @stakekit/common
```

or

```bash
yarn add @stakekit/signers @stakekit/common
```

or

```bash
pnpm add @stakekit/signers @stakekit/common
```

## Usage

### Examples

#### Ethereum

```tsx
import { ImportableWallets, getSigningWallet } from '@stakekit/signers';
import { Networks } from '@stakekit/common';
import { TransactionRequest } from '@ethersproject/abstract-provider';

const walletoptions = {
  mnemonic: process.env.MNEMONIC,
  walletType: ImportableWallets.MetaMask,
  index: 0,
};

const signingWallet = await getSigningWallet(Networks.Ethereum, walletoptions);
const address = await signingWallet.getAddress();

console.log('My wallet address: ', address);

const someUnsignedTx: TransactionRequest = {}; // Your unsigned transaction.

const signedTx = await wallet.signTransaction(unsignedTransaction);

// submitTransaction(signedTx);
```

#### Solana

```tsx
import { ImportableWallets, getSigningWallet } from '@stakekit/signers';
import { Networks } from '@stakekit/common';

const walletoptions = {
  mnemonic: process.env.MNEMONIC,
  walletType: ImportableWallets.MetaMask,
  index: 0,
};

const signingWallet = await getSigningWallet(Networks.Solana, walletoptions);
const address = await signingWallet.getAddress();

console.log('My wallet address: ', address);

const someUnsignedTx: string = ''; // Your unsigned transaction in hex.

const signedTx = await wallet.signTransaction(unsignedTransaction);

// submitTransaction(signedTx);
```

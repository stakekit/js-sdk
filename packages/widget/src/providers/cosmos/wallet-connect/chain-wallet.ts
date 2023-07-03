import { ChainRecord, Wallet } from "@cosmos-kit/core";
import { ChainWC } from "@cosmos-kit/walletconnect";
import { WalletConnect } from "./client";

export class ChainWalletConnect extends ChainWC {
  constructor(walletInfo: Wallet, chainInfo: ChainRecord) {
    super(walletInfo, chainInfo, WalletConnect);
  }
}

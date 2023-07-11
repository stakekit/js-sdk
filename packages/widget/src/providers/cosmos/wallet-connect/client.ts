import { WCClient } from "@cosmos-kit/walletconnect";

export class WalletConnect extends WCClient {
  disconnect() {
    this.signClient?.pairing
      .getAll()
      .forEach((p) =>
        this.signClient?.core.pairing.disconnect({ topic: p.topic })
      );

    return super.disconnect();
  }
}

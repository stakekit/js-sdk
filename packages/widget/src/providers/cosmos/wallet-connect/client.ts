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

  restorePairings() {
    if (typeof this.signClient === "undefined") {
      throw new Error("WalletConnect is not initialized");
    }
    this.pairings = this.signClient.pairing
      .getAll({
        active: true,
      })
      .filter((p) => p.expiry * 1000 > Date.now() + 1000);
    this.logger?.debug("RESTORED PAIRINGS: ", this.pairings);
  }

  restoreSessions() {
    if (typeof this.signClient === "undefined") {
      throw new Error("WalletConnect is not initialized");
    }
    this.sessions = this.signClient.session
      .getAll()
      .filter((s) => s.expiry * 1000 > Date.now() + 1000);
    this.logger?.debug("RESTORED SESSIONS: ", this.sessions);
  }
}

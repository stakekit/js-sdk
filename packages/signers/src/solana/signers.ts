import SolanaLedgerApp from "@ledgerhq/hw-app-solana";
import Transport from "@ledgerhq/hw-transport";
import { Keypair, PublicKey, Transaction } from "@solana/web3.js";
import * as nacl from "tweetnacl";

export interface SolanaSigner {
  sign: (x: Buffer) => Promise<Buffer>;
  signTransaction: (x: Transaction) => Promise<Transaction>;

  getPublicKey: () => Promise<PublicKey>;
}

export class SolanaKeyPairSigner implements SolanaSigner {
  constructor(private keyPair: Keypair) {}

  async signTransaction(tx: Transaction) {
    const signature = nacl.sign.detached(
      tx.compileMessage().serialize(),
      this.keyPair.secretKey
    );

    const existingIndex = tx.signatures.findIndex(
      (x) => x.publicKey.toBase58() === this.keyPair.publicKey.toBase58()
    );
    if (existingIndex !== -1) {
      tx.signatures[existingIndex].signature = Buffer.from(signature);
    } else {
      tx.addSignature(this.keyPair.publicKey, Buffer.from(signature));
    }

    return tx;
  }

  async getPublicKey() {
    return this.keyPair.publicKey;
  }

  async sign(message: Buffer) {
    const signature = nacl.sign.detached(message, this.keyPair.secretKey);
    return Buffer.from(signature);
  }
}

export class SolanaLedgerSigner implements SolanaSigner {
  private publicKey!: PublicKey;
  private sol: SolanaLedgerApp;
  private derivationPath: string;

  constructor(transport: Transport, derivationPath: string) {
    // Solana Ledger app doesn't like leading purpose (m)
    const [_m, ...rest] = derivationPath.split("/");
    this.derivationPath = rest.join("/");
    this.sol = new SolanaLedgerApp(transport as any);
  }

  async getPublicKey() {
    if (!this.publicKey) {
      const { address } = await this.sol.getAddress(this.derivationPath);
      this.publicKey = new PublicKey(address);
    }

    return this.publicKey;
  }

  async signTransaction(tx: Transaction) {
    const { signature } = await this.sol.signTransaction(
      this.derivationPath,
      tx.compileMessage().serialize()
    );

    // tx.signatures = [{ publicKey: await this.getPublicKey(), signature: null }];
    tx.addSignature(await this.getPublicKey(), signature);

    return tx;
  }

  async sign(message: Buffer) {
    const { signature } = await this.sol.signTransaction(
      this.derivationPath,
      message
    );
    return signature;
  }
}

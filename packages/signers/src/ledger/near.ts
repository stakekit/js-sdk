import { baseEncode } from "borsh";
import * as sha256 from "js-sha256";
import { KeyPair, Signer } from "near-api-js";
import { PublicKey, Signature } from "near-api-js/lib/utils/key_pair";

export class NearLedgerSigner extends Signer {
  private pubKey?: PublicKey;

  constructor(private near: any, private derivationPath: string) {
    super();
  }

  async getPublicKey(): Promise<PublicKey> {
    if (this.pubKey) {
      return this.pubKey;
    }

    const pubKey: Buffer = await this.near.getPublicKey(this.derivationPath);
    this.pubKey = PublicKey.from(baseEncode(pubKey));
    return this.pubKey;
  }

  async signMessage(message: Uint8Array): Promise<Signature> {
    const signature = await this.near.sign(message, this.derivationPath);
    return {
      signature,
      publicKey: await this.getPublicKey(),
    };
  }

  createKey(
    accountId: string,
    networkId?: string | undefined
  ): Promise<PublicKey> {
    throw new Error("Unsupported operation");
  }
}

export class NearSigner extends Signer {
  constructor(private keyPair: KeyPair) {
    super();
  }

  async getPublicKey(): Promise<PublicKey> {
    return this.keyPair.getPublicKey();
  }

  async signMessage(message: Uint8Array): Promise<Signature> {
    const hash = new Uint8Array(sha256.sha256.array(message));
    return await this.keyPair.sign(hash);
  }

  createKey(
    accountId: string,
    networkId?: string | undefined
  ): Promise<PublicKey> {
    throw new Error("Unsupported operation");
  }
}

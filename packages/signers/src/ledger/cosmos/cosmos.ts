import {
  AccountData,
  AminoSignResponse,
  encodeSecp256k1Signature,
  OfflineAminoSigner,
  StdSignDoc,
  makeSignDoc,
} from '@cosmjs/amino';
import { Secp256k1, Secp256k1Signature } from '@cosmjs/crypto';
import LedgerAppCosmos from '@ledgerhq/hw-app-cosmos';

import { sortedObject } from './utils';

export class CosmosLedgerSigner implements OfflineAminoSigner {
  private accounts?: AccountData[];

  static async init(
    app: LedgerAppCosmos,
    options: { derivationPath: string; prefix: string }
  ) {
    return new CosmosLedgerSigner(app, options);
  }

  public constructor(
    private app: LedgerAppCosmos,
    private options: { derivationPath: string; prefix: string }
  ) {}

  public async getAccounts(): Promise<readonly AccountData[]> {
    if (this.accounts) {
      return this.accounts;
    }

    const result = await this.app.getAddress(
      this.options.derivationPath,
      this.options.prefix
    );

    this.accounts = [result].map((x) => ({
      pubkey: Secp256k1.compressPubkey(Buffer.from(x.publicKey, 'hex')),
      address: x.address,
      algo: 'secp256k1' as const,
    }));

    return this.accounts;
  }

  public async signAmino(
    signerAddress: string,
    signDoc: StdSignDoc
  ): Promise<AminoSignResponse> {
    const result = await this.app.sign(
      this.options.derivationPath,
      JSON.stringify(sortedObject(signDoc))
    );

    if (!result.signature) {
      throw new Error(`Invalid return code ${result.return_code}`);
    }

    const [{ pubkey }] = await this.getAccounts();
    const stdSignature = encodeSecp256k1Signature(
      pubkey,
      Secp256k1Signature.fromDer(result.signature).toFixedLength()
    );

    return {
      signed: signDoc,
      signature: stdSignature,
    };
  }
}

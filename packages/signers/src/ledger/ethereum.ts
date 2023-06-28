import { ethers } from "ethers";
import EthLedgerApp, { isEIP712Message } from "@ledgerhq/hw-app-eth";
import ledgerService from "@ledgerhq/hw-app-eth/lib/services/ledger";

function waiter(duration: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
}

function ensureHex(x: string) {
  return ethers.utils.hexlify(parseInt(x));
}

export class EthereumLedgerSigner extends ethers.Signer {
  readonly type!: string;
  readonly path!: string;

  readonly _eth!: EthLedgerApp;

  static async init(app: EthLedgerApp, options: { derivationPath: string }) {
    return new EthereumLedgerSigner(app, options);
  }

  constructor(eth: EthLedgerApp, private options: { derivationPath: string }) {
    super();

    ethers.utils.defineReadOnly(this, "path", this.options.derivationPath);
    ethers.utils.defineReadOnly(this, "_eth", eth);
  }

  _retry<T = any>(
    callback: (eth: EthLedgerApp) => Promise<T>,
    timeout?: number
  ): Promise<T> {
    return new Promise(async (resolve, reject) => {
      if (timeout && timeout > 0) {
        setTimeout(() => {
          reject(new Error("timeout"));
        }, timeout);
      }

      const eth = await this._eth;

      // Wait up to 5 seconds
      for (let i = 0; i < 50; i++) {
        try {
          const result = await callback(eth);
          return resolve(result);
        } catch (error: any) {
          if (error.id !== "TransportLocked") {
            return reject(error);
          }
        }
        await waiter(100);
      }

      return reject(new Error("timeout"));
    });
  }

  async getAddress(): Promise<string> {
    const account = await this._retry((eth) => eth.getAddress(this.path));
    return ethers.utils.getAddress(account.address);
  }

  async signMessage(message: ethers.utils.Bytes | string): Promise<string> {
    if (typeof message === "string") {
      message = ethers.utils.toUtf8Bytes(message);
    }

    const messageHex = ethers.utils.hexlify(message).substring(2);

    const sig = await this._retry((eth) =>
      eth.signPersonalMessage(this.path, messageHex)
    );
    sig.r = "0x" + sig.r;
    sig.s = "0x" + sig.s;
    return ethers.utils.joinSignature(sig);
  }

  async signTransaction(
    transaction: ethers.providers.TransactionRequest
  ): Promise<string> {
    const tx = await ethers.utils.resolveProperties(transaction);

    //@ts-ignore
    const baseTx: ethers.utils.UnsignedTransaction = {
      chainId: tx.chainId || undefined,
      data: tx.data || undefined,
      gasLimit: tx.gasLimit || undefined,
      nonce: tx.nonce ? ethers.BigNumber.from(tx.nonce).toNumber() : undefined,
      to: tx.to || undefined,
      value: tx.value || undefined,
    };

    if (tx.gasPrice) {
      baseTx.gasPrice = ensureHex(tx.gasPrice.toString());
    }

    if (tx.maxFeePerGas && tx.maxPriorityFeePerGas) {
      baseTx.type = 2;
      baseTx.maxFeePerGas = ensureHex(tx.maxFeePerGas.toString());
      baseTx.maxPriorityFeePerGas = ensureHex(
        tx.maxPriorityFeePerGas.toString()
      );
    }

    const unsignedTx = ethers.utils.serializeTransaction(baseTx).substring(2);
    const resolution = null;
    // const resolution = await ledgerService.resolveTransaction(
    //   unsignedTx,
    //   {},
    //   {
    //     nft: true,
    //     externalPlugins: true,
    //     erc20: true,
    //   }
    // );

    const sig = await this._retry((eth) =>
      eth.signTransaction(this.path, unsignedTx, resolution)
    );

    return ethers.utils.serializeTransaction(baseTx, {
      v: ethers.BigNumber.from("0x" + sig.v).toNumber(),
      r: "0x" + sig.r,
      s: "0x" + sig.s,
    });
  }

  async signTypedData(signedTypedData: Record<string, any>): Promise<string> {
    if (!isEIP712Message(signedTypedData)) {
      throw new Error("signedTypedData");
    }
    const sig = await this._retry((eth) =>
      eth.signEIP712Message(this.path, signedTypedData)
    );
    sig.r = "0x" + sig.r;
    sig.s = "0x" + sig.s;
    return ethers.utils.joinSignature(sig);
  }

  connect(provider: ethers.providers.Provider): ethers.Signer {
    // @ts-expect-error
    this.provider = provider;
    return this;
  }
}

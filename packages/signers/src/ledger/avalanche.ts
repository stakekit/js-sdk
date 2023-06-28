import {
  activeNetwork,
  avalanche,
  bintools,
  ChainIdType,
  getAppAvax,
  getAppEth,
  getLedgerConfigAvax,
  idToChainAlias,
  ILedgerAppConfig,
  MIN_EVM_SUPPORT_V,
  PublicMnemonicWallet,
  TxHelper,
  WalletNameType,
  web3,
} from "@avalabs/avalanche-wallet-sdk";
import EthereumjsCommon from "@ethereumjs/common";
import { Transaction, TxOptions } from "@ethereumjs/tx";
import { Buffer } from "avalanche";
import {
  AVMConstants,
  ImportTx as AVMImportTx,
  OperationTx,
  SelectCredentialClass as AVMSelectCredentialClass,
  TransferableOperation,
  Tx as AVMTx,
  UnsignedTx as AVMUnsignedTx,
} from "avalanche/dist/apis/avm";
import {
  EVMConstants,
  EVMInput,
  ExportTx as EVMExportTx,
  ImportTx as EVMImportTx,
  SelectCredentialClass as EVMSelectCredentialClass,
  Tx as EVMTx,
  UnsignedTx as EVMUnsignedTx,
} from "avalanche/dist/apis/evm";
import {
  ExportTx as PlatformExportTx,
  ImportTx as PlatformImportTx,
  PlatformVMConstants,
  SelectCredentialClass as PlatformSelectCredentialClass,
  Tx as PlatformTx,
  UnsignedTx as PlatformUnsignedTx,
} from "avalanche/dist/apis/platformvm";
import { Credential, SigIdx, Signature } from "avalanche/dist/common";
import { Buffer as BufferNative } from "buffer";
import createHash from "create-hash";
import { BN as EthBN, bnToRlp, rlp } from "ethereumjs-util";
import HDKey from "hdkey";
const { ParseableAvmTxEnum, ParseablePlatformEnum, ParseableEvmTxEnum } =
  TxHelper;
import Transport from "@ledgerhq/hw-transport";
import * as bip32 from "bip32";
import bippath from "bip32-path";
import { LedgerApps } from "../constants";

const ERR_TransportNotSet = new Error("Transport is not set.");
const ERR_ConfigNotSet = new Error("Ledger configuration is not set.");

// m / purpose' / coin_type' / account' / change / index
function parseDerivationPath(path: string) {
  const [m, purpose, coinType, account, ...rest] = path.split("/");

  return {
    prefix: [m, purpose, coinType, account].join("/"),
    suffix: rest.join("/"),
  };
}

interface OmniDerivationPaths {
  ethereum: string;
  avalanche: string;
}

/**
 *
 * @param xpub Extended public key for m/44'/60'/0'
 * @param index Index of the Eth address
 * @returns Extended public key for m/44'/60'/0'/0/n where `n` is the address index
 */
export function getEthAddressKeyFromAccountKey(xpub: string, path: string) {
  const node = bip32.fromBase58(xpub).derivePath(path);
  return node.toBase58();
}

export class OmniAvalancheLedgerWallet extends PublicMnemonicWallet {
  type: WalletNameType;
  static config: ILedgerAppConfig | undefined;

  /**
   *
   * @param xpubAVM of derivation path m/44'/9000'/n' where `n` is the account index
   * @param xpubEVM of derivation path m/44'/60'/0'/0/n where `n` is the account index
   * @param accountIndex The given xpubs must match this index
   * @param config
   */
  constructor(
    private getTransport: (app: LedgerApps) => Promise<Transport>,
    xpubAVM: string,
    xpubEVM: string,
    private derivationPaths: OmniDerivationPaths
  ) {
    super(xpubAVM, xpubEVM);

    this.type = "ledger";
  }

  /**
   * Create a new ledger wallet instance from the given transport
   * @param transport
   * @param accountIndex
   */
  static async fromTransport(
    getTransport: (app: LedgerApps) => Promise<Transport>,
    derivationPaths: OmniDerivationPaths
  ) {
    const avalancheTransport = await getTransport(LedgerApps.Avalanche);
    const pubAvax =
      await OmniAvalancheLedgerWallet.getExtendedPublicKeyAvaxAccount(
        avalancheTransport,
        derivationPaths
      );

    let config = await getLedgerConfigAvax(avalancheTransport);
    if (config.version < MIN_EVM_SUPPORT_V) {
      throw new Error(
        `Unable to connect ledger. You must use ledger version ${MIN_EVM_SUPPORT_V} or above.`
      );
    }

    OmniAvalancheLedgerWallet.config = config;

    const pubEth =
      await OmniAvalancheLedgerWallet.getExtendedPublicKeyEthAddress(
        await getTransport(LedgerApps.Ethereum),
        derivationPaths
      );

    const wallet = new OmniAvalancheLedgerWallet(
      getTransport,
      pubAvax,
      pubEth,
      derivationPaths
    );

    return wallet;
  }

  /**
   * Returns the extended public key used by C chain for address derivation.
   * @remarks Returns the extended public key for path `m/44'/60'/0'`. This key can be used to derive C chain addresses.
   * @param transport
   */
  static async getExtendedPublicKeyEthAccount(
    transport: Transport,
    derivationPaths: OmniDerivationPaths
  ): Promise<string> {
    const ethApp = getAppEth(transport);
    let ethRes = await ethApp.getAddress(
      parseDerivationPath(derivationPaths.ethereum).prefix,
      true,
      true
    );
    let hdEth = new HDKey();

    hdEth.publicKey = BufferNative.from(ethRes.publicKey, "hex");
    hdEth.chainCode = BufferNative.from(ethRes.chainCode!, "hex");
    return hdEth.publicExtendedKey;
  }

  /**
   * Get the extended public key for a specific C chain address.
   * @returns The xpub of HD node m/44'/60'/0'/0/n where `n` is `accountIndex`
   * @param transport
   * @param accountIndex
   */
  static async getExtendedPublicKeyEthAddress(
    transport: Transport,
    derivationPaths: OmniDerivationPaths
  ): Promise<string> {
    const accountKey =
      await OmniAvalancheLedgerWallet.getExtendedPublicKeyEthAccount(
        transport,
        derivationPaths
      );
    return getEthAddressKeyFromAccountKey(
      accountKey,
      parseDerivationPath(derivationPaths.ethereum).suffix
    );
  }

  /**
   * Returns the extended public key used by X and P chains for address derivation.
   * @remarks Returns the extended public key for path `m/44'/90000'/n'` where `n` is the account index.
   * @param transport
   * @param accountIndex Which account's public key to derive
   */
  static async getExtendedPublicKeyAvaxAccount(
    transport: Transport,
    derivationPaths: OmniDerivationPaths
  ): Promise<string> {
    const app = getAppAvax(transport);

    let res = await app.getWalletExtendedPublicKey(
      parseDerivationPath(derivationPaths.avalanche).prefix
    );

    let pubKey = res.public_key;
    let chainCode = res.chain_code;

    // Get the base58 publick key from the HDKey instance
    let hdKey = new HDKey();
    // @ts-ignore
    hdKey.publicKey = pubKey;
    // @ts-ignore
    hdKey.chainCode = chainCode;

    return hdKey.publicExtendedKey;
  }

  async signEvm(tx: Transaction): Promise<Transaction> {
    const rawUnsignedTx = rlp.encode([
      bnToRlp(tx.nonce),
      bnToRlp(tx.gasPrice),
      bnToRlp(tx.gasLimit),
      tx.to !== undefined ? tx.to.buf : Buffer.from([]),
      bnToRlp(tx.value),
      tx.data,
      bnToRlp(tx.common.chainIdBN()),
      Buffer.from([]),
      Buffer.from([]),
    ]);

    const ethApp = getAppEth(await this.getTransport(LedgerApps.Ethereum));
    const signature = await ethApp.signTransaction(
      this.derivationPaths.ethereum,
      rawUnsignedTx.toString("hex")
    );

    const signatureBN = {
      v: new EthBN(signature.v, 16),
      r: new EthBN(signature.r, 16),
      s: new EthBN(signature.s, 16),
    };

    const chainId = await web3.eth.getChainId();
    const networkId = await web3.eth.net.getId();

    let common = EthereumjsCommon.forCustomChain(
      "mainnet",
      { networkId, chainId },
      "istanbul"
    );

    const chainParams: TxOptions = {
      common,
    };

    const signedTx = Transaction.fromTxData(
      {
        nonce: tx.nonce,
        gasPrice: tx.gasPrice,
        gasLimit: tx.gasLimit,
        to: tx.to!,
        value: tx.value,
        data: tx.data,
        ...signatureBN,
      },
      chainParams
    );
    return signedTx;
  }

  // Returns an array of derivation paths that need to sign this transaction
  // Used with signTransactionHash and signTransactionParsable
  async getTransactionPaths<
    UnsignedTx extends AVMUnsignedTx | PlatformUnsignedTx
  >(
    unsignedTx: UnsignedTx,
    chainId: ChainIdType
  ): Promise<{ paths: string[]; isAvaxOnly: boolean }> {
    let tx = unsignedTx.getTransaction();
    let txType = tx.getTxType();

    let ins = tx.getIns();
    let operations: TransferableOperation[] = [];

    // Try to get operations, it will fail if there are none, ignore and continue
    try {
      operations = (tx as OperationTx).getOperations();
    } catch (e) {
      console.log("Failed to get tx operations.");
    }

    let items = ins;
    if (
      (txType === AVMConstants.IMPORTTX && chainId === "X") ||
      (txType === PlatformVMConstants.IMPORTTX && chainId === "P")
    ) {
      // @ts-ignore
      items = ((tx as AVMImportTx) || PlatformImportTx).getImportInputs();
    }

    let hrp = avalanche.getHRP();
    let paths: string[] = [];

    let isAvaxOnly = true;

    // Collect paths derivation paths for source addresses
    for (let i = 0; i < items.length; i++) {
      let item = items[i];

      let assetId = bintools.cb58Encode(item.getAssetID());
      if (assetId !== activeNetwork.avaxID) {
        isAvaxOnly = false;
      }

      let sigidxs: SigIdx[] = item.getInput().getSigIdxs();
      let sources = sigidxs.map((sigidx) => sigidx.getSource());
      let addrs: string[] = sources.map((source) => {
        return bintools.addressToString(hrp, chainId, source);
      });

      for (let j = 0; j < addrs.length; j++) {
        let srcAddr = addrs[j];
        let pathStr = await this.getPathFromAddress(srcAddr); // returns change/index
        paths.push(pathStr);
      }
    }

    // Do the Same for operational inputs, if there are any...
    for (let i = 0; i < operations.length; i++) {
      let op = operations[i];
      let sigidxs: SigIdx[] = op.getOperation().getSigIdxs();
      let sources = sigidxs.map((sigidx) => sigidx.getSource());
      let addrs: string[] = sources.map((source) => {
        return bintools.addressToString(hrp, chainId, source);
      });

      for (let j = 0; j < addrs.length; j++) {
        let srcAddr = addrs[j];
        let pathStr = await this.getPathFromAddress(srcAddr); // returns change/index
        paths.push(pathStr);
      }
    }

    return { paths, isAvaxOnly };
  }

  /**
   * You may notice that our implementation of this function is quite
   * different to Ava Labs' one. This is because our wallets can only ever
   * be loaded with one seed phrase.
   *
   * If the address is a P chain address, ie. `P-...` then we know we can
   * only sign for it with our Avalanche suffix. Likewise for EVM related
   * things we can only use the Ethereum suffix change path.
   */
  async getPathFromAddress(address: string) {
    if (address.startsWith("P-")) {
      return parseDerivationPath(this.derivationPaths.avalanche).suffix;
    } else {
      return parseDerivationPath(this.derivationPaths.ethereum).suffix;
    }
  }

  // Used for signing transactions that are parsable
  async signTransactionParsable<
    UnsignedTx extends AVMUnsignedTx | PlatformUnsignedTx | EVMUnsignedTx,
    SignedTx extends AVMTx | PlatformTx | EVMTx
  >(
    unsignedTx: UnsignedTx,
    paths: string[],
    chainId: ChainIdType
  ): Promise<SignedTx> {
    let tx = unsignedTx.getTransaction();
    let txType = tx.getTxType();
    let parseableTxs = {
      X: ParseableAvmTxEnum,
      P: ParseablePlatformEnum,
      C: ParseableEvmTxEnum,
    }[chainId];

    let bip32Paths = this.pathsToUniqueBipPaths(paths);

    const appAvax = getAppAvax(await this.getTransport(LedgerApps.Avalanche));
    const accountPath =
      chainId === "C"
        ? bippath.fromString(
            parseDerivationPath(this.derivationPaths.ethereum).prefix
          )
        : bippath.fromString(
            parseDerivationPath(this.derivationPaths.avalanche).prefix
          );
    let txbuff = unsignedTx.toBuffer();

    let ledgerSignedTx = await appAvax.signTransaction(
      accountPath,
      bip32Paths,
      txbuff
    );

    let sigMap = ledgerSignedTx.signatures;
    let creds = this.getCredentials<UnsignedTx>(
      unsignedTx,
      paths,
      sigMap,
      chainId
    );

    let signedTx;
    switch (chainId) {
      case "X":
        signedTx = new AVMTx(unsignedTx as AVMUnsignedTx, creds);
        break;
      case "P":
        signedTx = new PlatformTx(unsignedTx as PlatformUnsignedTx, creds);
        break;
      case "C":
        signedTx = new EVMTx(unsignedTx as EVMUnsignedTx, creds);
        break;
    }

    return signedTx as SignedTx;
  }

  /**
   *
   * @param accountPath `m/44'/9000'/0'` For X/P Chains, `m/44'/60'/0'` for C Chain
   * @param bip32Paths an array of paths to sign with `['0/0','0/1'..]`
   * @param hash A buffer of the hash to sign
   * @remarks Never sign untrusted hashes. This can lead to loss of funds.
   */
  async signHash(
    accountPath: any,
    bip32Paths: any,
    hash: Buffer
  ): Promise<Map<string, Buffer>> {
    const appAvax = getAppAvax(await this.getTransport(LedgerApps.Avalanche));
    return await appAvax.signHash(accountPath, bip32Paths, hash);
  }
  // Used for non parsable transactions.
  // Ideally we wont use this function at all, but ledger is not ready yet.
  async signTransactionHash<
    UnsignedTx extends AVMUnsignedTx | PlatformUnsignedTx | EVMUnsignedTx,
    SignedTx extends AVMTx | PlatformTx | EVMTx
  >(
    unsignedTx: UnsignedTx,
    paths: string[],
    chainId: ChainIdType
  ): Promise<SignedTx> {
    let txbuff = unsignedTx.toBuffer();
    const msg: Buffer = Buffer.from(
      createHash("sha256").update(txbuff).digest()
    );

    let bip32Paths = this.pathsToUniqueBipPaths(paths);

    const appAvax = getAppAvax(await this.getTransport(LedgerApps.Avalanche));
    // Sign the msg with ledger
    //TODO: Update when ledger supports Accounts
    const accountPathSource =
      chainId === "C"
        ? parseDerivationPath(this.derivationPaths.ethereum).prefix
        : parseDerivationPath(this.derivationPaths.avalanche).prefix;
    const accountPath = bippath.fromString(accountPathSource);
    let sigMap = await appAvax.signHash(accountPath, bip32Paths, msg);

    let creds: Credential[] = this.getCredentials<UnsignedTx>(
      unsignedTx,
      paths,
      sigMap,
      chainId
    );

    let signedTx;
    switch (chainId) {
      case "X":
        signedTx = new AVMTx(unsignedTx as AVMUnsignedTx, creds);
        break;
      case "P":
        signedTx = new PlatformTx(unsignedTx as PlatformUnsignedTx, creds);
        break;
      case "C":
        signedTx = new EVMTx(unsignedTx as EVMUnsignedTx, creds);
        break;
    }

    return signedTx as SignedTx;
  }

  pathsToUniqueBipPaths(paths: string[]) {
    let uniquePaths = paths.filter((val: any, i: number) => {
      return paths.indexOf(val) === i;
    });

    let bip32Paths = uniquePaths.map((path) => {
      return bippath.fromString(path, false);
    });

    return bip32Paths;
  }

  getCredentials<
    UnsignedTx extends AVMUnsignedTx | PlatformUnsignedTx | EVMUnsignedTx
  >(
    unsignedTx: UnsignedTx,
    paths: string[],
    sigMap: any,
    chainId: ChainIdType
  ): Credential[] {
    let creds: Credential[] = [];
    let tx = unsignedTx.getTransaction();
    let txType = tx.getTxType();

    // @ts-ignore
    let ins = tx.getIns ? tx.getIns() : [];
    let operations: TransferableOperation[] = [];
    let evmInputs: EVMInput[] = [];

    let items = ins;
    if (
      (txType === AVMConstants.IMPORTTX && chainId === "X") ||
      (txType === PlatformVMConstants.IMPORTTX && chainId === "P") ||
      (txType === EVMConstants.IMPORTTX && chainId === "C")
    ) {
      items = ((tx as AVMImportTx) || PlatformImportTx || EVMImportTx)
        // @ts-ignore
        .getImportInputs();
    }

    // Try to get operations, it will fail if there are none, ignore and continue
    try {
      operations = (tx as OperationTx).getOperations();
    } catch (e) {
      console.log("Failed to get tx operations.");
    }

    let CredentialClass;
    if (chainId === "X") {
      CredentialClass = AVMSelectCredentialClass;
    } else if (chainId === "P") {
      CredentialClass = PlatformSelectCredentialClass;
    } else {
      CredentialClass = EVMSelectCredentialClass;
    }

    // Try to get evm inputs, it will fail if there are none, ignore and continue
    try {
      evmInputs = (tx as EVMExportTx).getInputs();
    } catch (e) {
      console.log("Failed to get EVM inputs.");
    }

    for (let i = 0; i < items.length; i++) {
      const sigidxs: SigIdx[] = items[i].getInput().getSigIdxs();
      const cred: Credential = CredentialClass(
        items[i].getInput().getCredentialID()
      );

      for (let j = 0; j < sigidxs.length; j++) {
        let pathIndex = i + j;
        let pathStr = paths[pathIndex];

        let sigRaw = sigMap.get(pathStr);
        let sigBuff = Buffer.from(sigRaw);
        const sig: Signature = new Signature();
        sig.fromBuffer(sigBuff);
        cred.addSignature(sig);
      }
      creds.push(cred);
    }

    for (let i = 0; i < operations.length; i++) {
      let op = operations[i].getOperation();
      const sigidxs: SigIdx[] = op.getSigIdxs();
      const cred: Credential = CredentialClass(op.getCredentialID());

      for (let j = 0; j < sigidxs.length; j++) {
        let pathIndex = items.length + i + j;
        let pathStr = paths[pathIndex];

        let sigRaw = sigMap.get(pathStr);
        let sigBuff = Buffer.from(sigRaw);
        const sig: Signature = new Signature();
        sig.fromBuffer(sigBuff);
        cred.addSignature(sig);
      }
      creds.push(cred);
    }

    for (let i = 0; i < evmInputs.length; i++) {
      let evmInput = evmInputs[i];
      const sigidxs: SigIdx[] = evmInput.getSigIdxs();
      const cred: Credential = CredentialClass(evmInput.getCredentialID());

      for (let j = 0; j < sigidxs.length; j++) {
        let pathIndex = items.length + i + j;
        let pathStr = paths[pathIndex];

        let sigRaw = sigMap.get(pathStr);
        let sigBuff = Buffer.from(sigRaw);
        const sig: Signature = new Signature();
        sig.fromBuffer(sigBuff);
        cred.addSignature(sig);
      }
      creds.push(cred);
    }

    return creds;
  }

  async signP(unsignedTx: PlatformUnsignedTx): Promise<PlatformTx> {
    let tx = unsignedTx.getTransaction();
    let txType = tx.getTxType();
    let chainId: ChainIdType = "P";
    let parseableTxs = ParseablePlatformEnum;

    let { paths, isAvaxOnly } =
      await this.getTransactionPaths<PlatformUnsignedTx>(unsignedTx, chainId);

    if (!OmniAvalancheLedgerWallet.config) throw ERR_ConfigNotSet;

    // If ledger doesnt support parsing, sign hash
    let canLedgerParse = OmniAvalancheLedgerWallet.config.version >= "0.3.1";
    let isParsableType = txType in parseableTxs && isAvaxOnly;

    // TODO: Remove after ledger is fixed
    // If UTXOS contain lockedStakeable funds always use sign hash
    let txIns = unsignedTx.getTransaction().getIns();
    for (let i = 0; i < txIns.length; i++) {
      let typeID = txIns[i].getInput().getTypeID();
      if (typeID === PlatformVMConstants.STAKEABLELOCKINID) {
        canLedgerParse = false;
        break;
      }
    }

    // TODO: Remove after ledger update
    // Ledger is not able to parse P/C atomic transactions
    if (txType === PlatformVMConstants.EXPORTTX) {
      const destChainBuff = (tx as PlatformExportTx).getDestinationChain();
      // If destination chain is C chain, sign hash
      const destChain = idToChainAlias(bintools.cb58Encode(destChainBuff));
      if (destChain === "C") {
        canLedgerParse = false;
      }
    }
    // TODO: Remove after ledger update
    // Ledger is not able to parse P/C atomic transactions
    if (txType === PlatformVMConstants.IMPORTTX) {
      const sourceChainBuff = (tx as PlatformImportTx).getSourceChain();
      // If destination chain is C chain, sign hash
      const sourceChain = idToChainAlias(bintools.cb58Encode(sourceChainBuff));
      if (sourceChain === "C") {
        canLedgerParse = false;
      }
    }

    let signedTx;
    if (canLedgerParse && isParsableType) {
      signedTx = await this.signTransactionParsable<
        PlatformUnsignedTx,
        PlatformTx
      >(unsignedTx, paths, chainId);
    } else {
      signedTx = await this.signTransactionHash<PlatformUnsignedTx, PlatformTx>(
        unsignedTx,
        paths,
        chainId
      );
    }
    return signedTx;
  }

  async signC(unsignedTx: EVMUnsignedTx): Promise<EVMTx> {
    // TODO: Might need to upgrade paths array to:
    //  paths = Array(utxoSet.getAllUTXOs().length).fill('0/0'),
    let tx = unsignedTx.getTransaction();
    let typeId = tx.getTxType();

    let paths = [parseDerivationPath(this.derivationPaths.ethereum).suffix];
    if (typeId === EVMConstants.EXPORTTX) {
      let ins = (tx as EVMExportTx).getInputs();
      paths = ins.map(
        () => parseDerivationPath(this.derivationPaths.ethereum).suffix
      );
    } else if (typeId === EVMConstants.IMPORTTX) {
      let ins = (tx as EVMImportTx).getImportInputs();
      paths = ins.map(
        () => parseDerivationPath(this.derivationPaths.ethereum).suffix
      );
    }

    let canLedgerParse = true;

    // TODO: Remove after ledger update
    // Ledger is not able to parse P/C atomic transactions
    if (typeId === EVMConstants.EXPORTTX) {
      const destChainBuff = (tx as EVMExportTx).getDestinationChain();
      // If destination chain is C chain, sign hash
      const destChain = idToChainAlias(bintools.cb58Encode(destChainBuff));
      if (destChain === "P") {
        canLedgerParse = false;
      }
    }
    // TODO: Remove after ledger update
    if (typeId === EVMConstants.IMPORTTX) {
      const sourceChainBuff = (tx as EVMImportTx).getSourceChain();
      // If destination chain is C chain, sign hash
      const sourceChain = idToChainAlias(bintools.cb58Encode(sourceChainBuff));
      if (sourceChain === "P") {
        canLedgerParse = false;
      }
    }

    let txSigned;
    if (canLedgerParse) {
      txSigned = (await this.signTransactionParsable(
        unsignedTx,
        paths,
        "C"
      )) as EVMTx;
    } else {
      txSigned = (await this.signTransactionHash(
        unsignedTx,
        paths,
        "C"
      )) as EVMTx;
    }

    return txSigned;
  }
}

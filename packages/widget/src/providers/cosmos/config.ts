import { chains as allChains } from "./chains";
import { CosmosNetworks } from "@stakekit/common";
import { wallets as keplrWallets } from "@cosmos-kit/keplr";
import { wallets as leapWallets } from "@cosmos-kit/leap";
import { WalletConnectWallet, walletConnectInfo } from "./wallet-connect";
import { Address, Connector, mainnet } from "wagmi";
import { ChainWalletBase, MainWalletBase } from "@cosmos-kit/core";
import { EthereumProvider } from "eip1193-provider";
import { createWalletClient, custom } from "viem";
import { Chain, Wallet } from "@rainbow-me/rainbowkit";
import { getNetworkLogo } from "../../utils";
import { toBase64 } from "@cosmjs/encoding";
import { getStorageItem, setStorageItem } from "../../services/local-storage";

type SetKeys<T> = T extends Set<infer U> ? U : never;

export const supportedCosmosNetworks = new Map([
  ["cosmoshub", "cosmos"],
  ...Object.values(CosmosNetworks)
    .filter((val) => val !== CosmosNetworks.Persistence)
    .map((val) => [val, val] as const),
]);

export type SupportedCosmosNetworks = SetKeys<typeof supportedCosmosNetworks>;

export const chains: typeof allChains = allChains.filter((chain) =>
  supportedCosmosNetworks.has(chain.chain_name as SupportedCosmosNetworks)
);

export const initialChain: (typeof allChains)[number] = chains.find(
  (c) => c.chain_name === "cosmoshub"
)!;

export const wcWallet = new WalletConnectWallet(walletConnectInfo);

export const wallets = [...keplrWallets, ...leapWallets, wcWallet];

export const cosmosChainsToWagmiChains = chains.map(
  (c) =>
    ({
      ...c,
      id: c.chain_id as unknown as number,
      iconUrl:
        c.chain_name === "osmosis"
          ? getNetworkLogo(CosmosNetworks.Osmosis)
          : c.logo_URIs?.png ?? c.logo_URIs?.svg ?? "",
      name: c.chain_name,
      network: c.chain_id,
      // TODO: change this
      nativeCurrency: mainnet.nativeCurrency,
      rpcUrls: {
        default: {
          http: c.apis?.rpc?.map((r) => r.address) ?? [""],
        },
        public: {
          http: c.apis?.rpc?.map((r) => r.address) ?? [""],
        },
      },
    } as Chain)
);

export class CosmosWagmiConnector extends Connector {
  readonly id: string;
  readonly name: string;

  ready = true;

  chainWallet: Promise<ChainWalletBase>;

  readonly provider = new EthereumProvider({} as any);

  readonly wallet: MainWalletBase;

  constructor(opts: { wallet: MainWalletBase }) {
    super({ chains: cosmosChainsToWagmiChains, options: {} });
    this.id = opts.wallet.walletInfo.name;
    this.name = opts.wallet.walletInfo.name;
    this.wallet = opts.wallet;

    this.chainWallet = new Promise((res) => {
      setTimeout(() => {
        const cw = this.wallet.chainWalletMap.get(initialChain.chain_name)!;
        this.ready = !!cw.client;
        res(cw);
      }, 1000); // no other way to check if wallet is ready :(
    });
  }

  connect = async () => {
    setTimeout(() => this.emit("message", { type: "connecting" }), 0);

    const cw = await this.chainWallet;

    if (cw.address && cw.chainId) {
      return {
        account: cw.address as Address,
        chain: {
          id: cw.chainId as unknown as number,
          unsupported: false,
        },
      };
    }

    await cw.connect();

    await this.getAndSavePubKeyToStorage();

    return {
      account: cw.address as Address,
      chain: {
        id: cw.chainId as unknown as number,
        unsupported: false,
      },
    };
  };

  getAndSavePubKeyToStorage = async () => {
    if (typeof window === "undefined") return;

    const cw = await this.chainWallet;

    const result = await cw.client?.getAccount?.(cw.chainId);

    if (!result) return;

    const { address, pubkey } = result;

    const prevVal = getStorageItem("skPubKeys").orDefault({}) ?? {};

    setStorageItem("skPubKeys", { ...prevVal, [address]: toBase64(pubkey) });
  };

  switchChain = async (chainId: number) => {
    const chainName = this.chains.find((c) => c.id === chainId)?.name!;

    const newCw = this.wallet.getChainWallet(chainName) as ChainWalletBase;

    if (!newCw) throw new Error("Wallet not found");

    this.chainWallet = Promise.resolve(newCw);
    await this.connect();

    const chain = this.chains.find((c) => c.id === chainId);

    if (!chain) throw new Error("Chain not found");

    this.provider.events.emit("chainChanged", chainId);
    this.onChainChanged(chainId);
    this.onAccountsChanged([newCw.address as Address]);

    return chain;
  };

  disconnect = async () => {
    (await this.chainWallet).disconnect();
  };
  getAccount = async () => {
    return (await this.chainWallet).address as Address;
  };
  isAuthorized = async () => {
    return !!(await this.chainWallet).address;
  };
  getChainId = async () =>
    (await this.chainWallet).chainId as unknown as number;

  getProvider = async () => this.provider;

  getWalletClient = async () => {
    const chainId = await this.getChainId();
    const chain = cosmosChainsToWagmiChains.find((c) => c.id === chainId)!;
    const provider = await this.getProvider();
    const account = await this.getAccount();

    return createWalletClient({
      account,
      chain,
      name: this.name,
      transport: custom(provider),
    });
  };

  protected onAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      this.emit("disconnect");
    } else {
      this.emit("change", { account: accounts[0] as Address });
    }
  };

  protected onChainChanged = (chainId: number | string) => {
    this.emit("change", {
      chain: { id: chainId as number, unsupported: false },
    });
  };

  protected onDisconnect = () => {
    this.emit("disconnect");
  };
}

export const createCosmosConnector = ({
  wallet,
}: {
  wallet: MainWalletBase;
}): Wallet => {
  return {
    id: wallet.walletInfo.name,
    name: wallet.walletInfo.prettyName,
    iconUrl: wallet.walletInfo.logo ?? "",
    iconBackground: "transparent",
    downloadUrls: {
      chrome: wallet.walletInfo.downloads?.[0].link,
      firefox: wallet.walletInfo.downloads?.[1].link,
      browserExtension: wallet.walletInfo.downloads?.[0].link,
    },
    createConnector: () => {
      const connector = new CosmosWagmiConnector({ wallet });

      return {
        connector,
        qrCode: {
          getUri: async () => {
            const cw = await connector.chainWallet;

            if (!cw.qrUrl || !cw.client) return "";

            return new Promise((res, rej) => {
              const timeoutId = setTimeout(() => {
                rej();
              }, 4000);

              // @ts-expect-error
              cw.client.setActions({
                qrUrl: {
                  state: () => {
                    clearTimeout(timeoutId);

                    const data = cw.qrUrl.data;
                    if (data) {
                      console.log("qrcode", data);
                      res(data);
                    } else {
                      rej();
                    }
                  },
                },
              });
            });
          },
        },
      };
    },
  };
};

export const connector = {
  groupName: "Cosmos",
  wallets: wallets.map((w) => createCosmosConnector({ wallet: w })),
};

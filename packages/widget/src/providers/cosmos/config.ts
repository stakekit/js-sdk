import { chains as allChains, assets as allAssets } from "chain-registry";
import { CosmosNetworks } from "@stakekit/common";
import { wallets as keplrWallets } from "@cosmos-kit/keplr";
import { wallets as leapWallets } from "@cosmos-kit/leap";
import { WalletConnectWallet, walletConnectInfo } from "./wallet-connect";
import { Address, Chain, Connector, mainnet } from "wagmi";
import { ChainWalletBase, MainWalletBase } from "@cosmos-kit/core";
import { EthereumProvider } from "eip1193-provider";
import { createWalletClient, custom } from "viem";
import { Wallet } from "@rainbow-me/rainbowkit";

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

export const assets: typeof allAssets = allAssets.filter((asset) =>
  supportedCosmosNetworks.has(asset.chain_name as SupportedCosmosNetworks)
);

export const assetSet: Map<
  (typeof allAssets)[number]["chain_name"],
  (typeof allAssets)[number]
> = new Map(assets.map((a) => [a.chain_name, a]));

export const wcWallet = new WalletConnectWallet(walletConnectInfo);

export const wallets = [...keplrWallets, ...leapWallets, wcWallet];

const osmosisLogo =
  "https://raw.githubusercontent.com/stakekit/assets/main/networks/osmosis.svg";

export const cosmosChainsToWagmiChains = chains.map(
  (c) =>
    ({
      ...c,
      id: c.chain_id as unknown as number,
      iconUrl:
        c.chain_name === "osmosis"
          ? osmosisLogo
          : c.logo_URIs?.png ?? c.logo_URIs?.svg ?? "",
      name: c.chain_name,
      network: c.chain_id,
      // TODO: change this
      nativeCurrency: mainnet.nativeCurrency,
      rpcUrls: mainnet.rpcUrls,
    } as Chain)
);

export class CosmosWagmiConnector extends Connector {
  readonly id: string;
  readonly name: string;

  ready = false;

  chainWallet: Promise<ChainWalletBase>;

  readonly provider = new EthereumProvider({} as any);

  readonly wallet: MainWalletBase;

  constructor(opts: { wallet: MainWalletBase }) {
    super({ chains: cosmosChainsToWagmiChains, options: {} });
    this.id = opts.wallet.walletInfo.name;
    this.name = opts.wallet.walletInfo.name;
    this.wallet = opts.wallet;
    this.ready = true;

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

    return {
      account: cw.address as Address,
      chain: {
        id: cw.chainId as unknown as number,
        unsupported: false,
      },
    };
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

  disconnect = async () => (await this.chainWallet).disconnect();
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

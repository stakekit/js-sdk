import { IFrameEthereumProvider } from "@ledgerhq/iframe-provider";
import { Connector } from "wagmi";
import { isLedgerDappBrowserProvider } from "../../utils";
import {
  Address,
  ProviderRpcError,
  ResourceUnavailableRpcError,
  RpcError,
  SwitchChainError,
  UserRejectedRequestError,
  createWalletClient,
  custom,
  getAddress,
  numberToHex,
} from "viem";
import { Wallet } from "@rainbow-me/rainbowkit";

class FrameEthereumProvider extends IFrameEthereumProvider {
  request = (args: { method: string; params: any }) => {
    return this.send(args.method, args.params);
  };
}

class LedgerHQFrameConnector extends Connector<
  FrameEthereumProvider,
  ConstructorParameters<typeof IFrameEthereumProvider>[0]
> {
  readonly id = "ledgerLive";
  readonly name = "Ledger Live";
  readonly ready = isLedgerDappBrowserProvider();

  providerInstance?: FrameEthereumProvider;

  getProvider = async () => {
    if (!this.providerInstance) {
      this.providerInstance = new FrameEthereumProvider(this.options);
    }
    return this.providerInstance;
  };

  connect = async ({ chainId }: { chainId?: number } = {}) => {
    try {
      const provider = await this.getProvider();

      if (provider.on) {
        provider.on("accountsChanged", this.onAccountsChanged);
        provider.on("chainChanged", this.onChainChanged);
      }

      this.emit("message", { type: "connecting" });

      const account = await this.getAccount();

      let id = await this.getChainId();
      let unsupported = this.isChainUnsupported(id);

      if (chainId && id !== chainId) {
        const chain = await this.switchChain(chainId);
        id = chain.id;
        unsupported = this.isChainUnsupported(id);
      }

      return { account, chain: { id, unsupported }, provider };
    } catch (error) {
      if (this.isUserRejectedRequestError(error)) {
        throw new UserRejectedRequestError(error as Error);
      }
      if ((error as RpcError).code === -32002) {
        throw new ResourceUnavailableRpcError(error as Error);
      }

      throw error;
    }
  };

  disconnect = async () => {
    const provider = await this.getProvider();

    provider.removeListener("accountsChanged", this.onAccountsChanged);
    provider.removeListener("chainChanged", this.onChainChanged);
  };

  async switchChain(chainId: number) {
    const provider = await this.getProvider();

    const id = numberToHex(chainId);

    try {
      await Promise.all([
        provider.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: id }],
        }),
        new Promise<void>((res) =>
          this.on("change", ({ chain }) => {
            if (chain?.id === chainId) res();
          })
        ),
      ]);

      return (
        this.chains.find((x) => x.id === chainId) ?? {
          id: chainId,
          name: `Chain ${id}`,
          network: `${id}`,
          nativeCurrency: { name: "Ether", decimals: 18, symbol: "ETH" },
          rpcUrls: { default: { http: [""] }, public: { http: [""] } },
        }
      );
    } catch (error) {
      throw new SwitchChainError(error as Error);
    }
  }

  getAccount = async () => {
    const provider = await this.getProvider();

    const accounts = await provider.send("eth_requestAccounts");

    return getAddress(accounts[0] as string);
  };

  getChainId = async () => {
    const provider = await this.getProvider();

    return provider.send("eth_chainId").then(this.normalizeChainId);
  };

  isAuthorized = async () => {
    const provider = await this.getProvider();

    const accounts = await provider.send("eth_accounts");
    const account = accounts[0];
    return !!account;
  };

  getWalletClient = async ({ chainId }: { chainId?: number } = {}) => {
    const [provider, account] = await Promise.all([
      this.getProvider(),
      this.getAccount(),
    ]);

    const chain = this.chains.find((x) => x.id === chainId);

    return createWalletClient({
      account,
      chain,
      name: this.name,
      transport: custom(provider),
    });
  };

  watchAsset = async ({
    address,
    decimals = 18,
    image,
    symbol,
  }: {
    address: Address;
    decimals?: number;
    image?: string;
    symbol: string;
  }) => {
    const provider = await this.getProvider();

    return provider.request({
      method: "wallet_watchAsset",
      params: {
        type: "ERC20",
        options: {
          address,
          decimals,
          image,
          symbol,
        },
      },
    });
  };

  protected onAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0 || !accounts[0]) {
      this.emit("disconnect");
    } else {
      this.emit("change", { account: getAddress(accounts[0]) });
    }
  };

  protected onChainChanged = (chainId: number | string) => {
    const id = this.normalizeChainId(chainId);
    const unsupported = this.isChainUnsupported(id);
    this.emit("change", { chain: { id, unsupported } });
  };

  protected isUserRejectedRequestError(error: unknown) {
    return (error as ProviderRpcError).code === 4001;
  }

  protected onDisconnect = () => {
    this.emit("disconnect");
  };

  private normalizeChainId(chainId: string | number | bigint) {
    if (typeof chainId === "string")
      return Number.parseInt(
        chainId,
        chainId.trim().substring(0, 2) === "0x" ? 16 : 10
      );
    if (typeof chainId === "bigint") return Number(chainId);
    return chainId;
  }
}

export const ledgerFrameWallet = (
  args: ConstructorParameters<typeof LedgerHQFrameConnector>[0]
): Wallet => {
  return {
    id: "ledgerLive",
    name: "Ledger Live",
    iconUrl: async () =>
      "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyOCIgaGVpZ2h0PSIyOCIgZmlsbD0ibm9uZSI+PHBhdGggZmlsbD0iIzAwMCIgZD0iTTAgMGgyOHYyOEgweiIvPjxwYXRoIGZpbGw9IiNmZmYiIGZpbGwtcnVsZT0iZXZlbm9kZCIgZD0iTTExLjY1IDQuNEg0LjRWOWgxLjFWNS41bDYuMTUtLjA0VjQuNFptLjA1IDUuOTV2Ny4yNWg0LjZ2LTEuMWgtMy41bC0uMDQtNi4xNUgxMS43Wk00LjQgMjMuNmg3LjI1di0xLjA2TDUuNSAyMi41VjE5SDQuNHY0LjZaTTE2LjM1IDQuNGg3LjI1VjloLTEuMVY1LjVsLTYuMTUtLjA0VjQuNFptNy4yNSAxOS4yaC03LjI1di0xLjA2bDYuMTUtLjA0VjE5aDEuMXY0LjZaIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=",
    iconBackground: "#fff",
    hidden: () => !isLedgerDappBrowserProvider(),
    createConnector: () => ({
      connector: new LedgerHQFrameConnector(args) as any,
    }),
  };
};

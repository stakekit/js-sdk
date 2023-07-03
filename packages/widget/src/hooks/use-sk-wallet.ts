import { Chain, Connector, useAccount, useDisconnect, useNetwork } from "wagmi";
import { useCallback, useMemo } from "react";
import { Either, EitherAsync, Left, Maybe, Right } from "purify-ts";
import { fromHex, toBase64 } from "@cosmjs/encoding";
import { unsignedTransactionCodec } from "../pages/steps/types";
import {
  SendTransactionError,
  TransactionDecodeError,
} from "../pages/steps/errors";
import { sendTransaction as wagmiSendTransaction } from "@wagmi/core";
import { SignDoc } from "cosmjs-types/cosmos/tx/v1beta1/tx";
import { decodeSignature } from "@cosmjs/amino";
import { CosmosWagmiConnector } from "../providers/cosmos/config";
import { AddressWithTokenDtoAdditionalAddresses } from "@stakekit/api-hooks";
import { Hash, SKWallet } from "../domain/types";
import { chains as evmChain } from "../providers/ethereum/config";
import { chains as cosmosChains } from "../providers/cosmos/config";
import { CosmosNetworks, EvmNetworks } from "@stakekit/common";
import { useQuery } from "@tanstack/react-query";
import { waitForSec } from "../utils";

export const useSKWallet = (): SKWallet => {
  const {
    isConnected: _isConnected,
    isConnecting,
    address,
    connector,
  } = useAccount();

  const isConnected = _isConnected && !!address && !!connector;

  const { chain } = useNetwork();

  const network = useMemo(
    () =>
      Maybe.fromNullable(chain)
        .map((val) => wagmiNetworkToSKNetwork(val))
        .extractNullable(),
    [chain]
  );

  const { disconnectAsync: disconnect } = useDisconnect();

  const { data: additionalAddresses } = useQuery(
    ["additionalAddresses", connector?.id, address],
    async () => {
      if (!connector) return Promise.resolve(null);

      const res = await getAdditionalAddresses(connector);

      return res.caseOf({
        Left: (e) => Promise.reject(e),
        Right: (val) => Promise.resolve(val),
      });
    }
  );

  const sendTransaction = useCallback<SKWallet["sendTransaction"]>(
    (tx, index) =>
      EitherAsync.liftEither(
        !isConnected || !network || !connector
          ? Left(new Error("No wallet connected"))
          : Right(connector)
      ).chain((conn) => {
        if (isCosmosConnector(conn)) {
          return getCosmosChainWallet(conn).chain((cw) =>
            EitherAsync(() =>
              cw.client.signDirect!(
                cw.chainId,
                cw.address!,
                SignDoc.decode(fromHex(tx))
              )
            )
              .mapLeft(() => new Error("signDirect failed"))
              .chain((val) => {
                const broadcast = () =>
                  cw.broadcast({
                    authInfoBytes: val.signed.authInfoBytes,
                    bodyBytes: val.signed.bodyBytes,
                    signatures: [decodeSignature(val.signature).signature],
                  });

                return EitherAsync(broadcast)
                  .chainLeft(
                    () =>
                      EitherAsync(async () => {
                        await waitForSec(2);
                        return broadcast();
                      }) // retry once
                  )
                  .mapLeft(() => new Error("broadcast failed"))
                  .map((val) => ({ hash: val.transactionHash as Hash }));
              })
          );
        }

        return EitherAsync.liftEither(
          Either.encase(() => JSON.parse(tx))
            .chain((val) => unsignedTransactionCodec.decode(val))
            .mapLeft((e) => {
              console.log(e);
              return new TransactionDecodeError();
            })
        )
          .map((val) => {
            console.log({ val: val });
            return val;
          })
          .chain((val) =>
            EitherAsync(() =>
              wagmiSendTransaction({
                ...val,
                nonce: val.nonce + index,
                gas: val.gasLimit,
                mode: "prepared",
              })
            )
              .mapLeft((e) => {
                console.log(e);
                return new SendTransactionError();
              })
              .map((val) => ({ hash: val.hash as Hash }))
          );
      }),
    [network, connector, isConnected]
  );

  const value = useMemo((): SKWallet => {
    const common = { disconnect, sendTransaction };

    if (isConnected && address && network) {
      return {
        ...common,
        network,
        address,
        chain,
        isConnected: true,
        isConnecting: false,
        additionalAddresses: additionalAddresses ?? null,
      };
    }

    return {
      ...common,
      network: null,
      address: null,
      chain: null,
      isConnected: false,
      isConnecting,
      additionalAddresses: null,
    };
  }, [
    disconnect,
    sendTransaction,
    isConnected,
    address,
    network,
    isConnecting,
    chain,
    additionalAddresses,
  ]);

  return value;
};

const isCosmosConnector = (
  connector: Connector
): connector is CosmosWagmiConnector =>
  !!(connector as CosmosWagmiConnector).chainWallet;

const getAdditionalAddresses = (
  connector: Connector
): EitherAsync<Error, AddressWithTokenDtoAdditionalAddresses | null> => {
  if (isCosmosConnector(connector)) {
    return getCosmosPubKey(connector).map(
      (pubKey): AddressWithTokenDtoAdditionalAddresses => ({
        cosmosPubKey: pubKey,
      })
    );
  }

  return EitherAsync.liftEither(Right(null));
};

const getCosmosPubKey = (connector: Connector) =>
  getCosmosChainWallet(connector).chain((val) =>
    EitherAsync(() => val.client.getAccount!(val.chainId))
      .mapLeft(() => new Error("missing account"))
      .map((account) => toBase64(account.pubkey))
  );

const getCosmosChainWallet = (connector: Connector | undefined) =>
  EitherAsync.liftEither(
    !connector
      ? Left(new Error("no connector"))
      : !isCosmosConnector(connector)
      ? Left(new Error("not a cosmos connector"))
      : Right(connector)
  ).chain((conn) =>
    EitherAsync(() => conn.chainWallet).mapLeft(
      () => new Error("could not get chain wallet")
    )
  );

const wagmiNetworkToSKNetwork = (chain: Chain): SKWallet["network"] => {
  const asEvmNetwork = chain.network as (typeof evmChain)[number]["network"];

  if (asEvmNetwork === "arbitrum") return EvmNetworks.Arbitrum;
  if (asEvmNetwork === "avalanche") return EvmNetworks.AvalancheC;
  if (asEvmNetwork === "celo") return EvmNetworks.Celo;
  if (asEvmNetwork === "harmony") return EvmNetworks.Harmony;
  if (asEvmNetwork === "homestead") return EvmNetworks.Ethereum;
  if (asEvmNetwork === "matic") return EvmNetworks.Polygon;
  if (asEvmNetwork === "optimism") return EvmNetworks.Optimism;

  const asCosmosNetwork =
    chain.name.toLowerCase() as (typeof cosmosChains)[number]["chain_id"];

  if (asCosmosNetwork.startsWith("akash")) return CosmosNetworks.Akash;
  if (asCosmosNetwork.startsWith("cosmos")) return CosmosNetworks.Cosmos;
  if (asCosmosNetwork.startsWith("juno")) return CosmosNetworks.Juno;
  if (asCosmosNetwork.startsWith("kava")) return CosmosNetworks.Kava;
  if (asCosmosNetwork.startsWith("osmosis")) return CosmosNetworks.Osmosis;
  if (asCosmosNetwork.startsWith("persistence"))
    return CosmosNetworks.Persistence;
  if (asCosmosNetwork.startsWith("stargaze")) return CosmosNetworks.Stargaze;

  return null;
};

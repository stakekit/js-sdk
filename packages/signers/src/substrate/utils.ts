import { ApiPromise, HttpProvider } from '@polkadot/api';
import { KeyringOptions } from '@polkadot/keyring/types';
import { SubstrateNetworks } from '@stakekit/common';
import { GetRegistryOpts } from '@substrate/txwrapper-polkadot';

export const getKeyringOptionsFromNetwork = (
  network: SubstrateNetworks,
): KeyringOptions => {
  // source: https://github.com/paritytech/ss58-registry/blob/main/ss58-registry.json
  switch (network) {
    case SubstrateNetworks.Polkadot:
      return { type: 'sr25519', ss58Format: 0 };
    case SubstrateNetworks.Kusama:
      return { type: 'sr25519', ss58Format: 2 };
    case SubstrateNetworks.Westend:
      return { type: 'sr25519', ss58Format: 42 };
  }
};

export const getChainDetails = async (
  network: SubstrateNetworks,
  address: string,
) => {
  const provider = new HttpProvider(getSubstrateRpcEndpointByNetwork(network));
  const api = await ApiPromise.create({ provider });

  const { block } = await api.rpc.chain.getBlock();
  const blockHash = await api.rpc.chain.getBlockHash();
  const genesisHash = api.genesisHash;
  const metadataRpc = await api.rpc.state.getMetadata();
  const { specVersion, specName, transactionVersion } =
    await api.rpc.state.getRuntimeVersion();
  const { nonce } = await api.query.system.account(address);

  return {
    block,
    blockHash: blockHash.toString(),
    genesisHash: genesisHash.toString(),
    metadataRpc: metadataRpc.toHex(),
    specVersion: specVersion.toNumber(),
    specName: specName.toString() as GetRegistryOpts['specName'],
    transactionVersion: transactionVersion.toNumber(),
    nonce: nonce.toNumber(),
  };
};

export const getSubstrateRpcEndpointByNetwork = (
  network: SubstrateNetworks,
) => {
  switch (network) {
    case SubstrateNetworks.Polkadot:
      return 'https://rpc.polkadot.io';
    case SubstrateNetworks.Kusama:
      return 'https://kusama-rpc.polkadot.io';
    case SubstrateNetworks.Westend:
      return 'https://westend-rpc.polkadot.io';
  }
};

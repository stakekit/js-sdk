import { ApiPromise, WsProvider } from '@polkadot/api';
import { KeyringOptions } from '@polkadot/keyring/types';
import { SubstrateNetworks } from '@stakekit/common';
import { GetRegistryOpts } from '@substrate/txwrapper-polkadot';

export const getKeyringOptionsFromNetwork = (
  network: SubstrateNetworks,
): KeyringOptions => {
  switch (network) {
    case SubstrateNetworks.Polkadot:
      return { type: 'sr25519', ss58Format: 0 };
  }
};

export const getChainDetails = async (address: string) => {
  const provider = new WsProvider('wss://rpc.polkadot.io');
  const api = await ApiPromise.create({ provider });

  const { block } = await api.rpc.chain.getBlock();
  const blockHash = await api.rpc.chain.getBlockHash();
  const genesisHash = api.genesisHash;
  const metadataRpc = await api.rpc.state.getMetadata();
  const { specVersion, specName, transactionVersion } =
    await api.rpc.state.getRuntimeVersion();
  const { nonce } = await api.query.system.account(address);

  await api.disconnect();

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

import { KeyringOptions } from '@polkadot/keyring/types';
import { SubstrateNetworks } from '@stakekit/common';

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

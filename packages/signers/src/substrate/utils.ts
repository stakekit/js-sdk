import { KeyringOptions } from '@polkadot/keyring/types';
import { SubstrateNetworks } from '@stakekit/common';

export const getKeyringOptionsFromNetwork = (
  network: SubstrateNetworks,
): KeyringOptions => {
  switch (network) {
    case SubstrateNetworks.Polkadot:
      return { type: 'sr25519', ss58Format: 0 };
  }
};

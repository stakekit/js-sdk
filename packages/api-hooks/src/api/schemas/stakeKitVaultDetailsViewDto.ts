export interface StakeKitVaultDetailsViewDto {
  /** The URL pointing to the asset's icon in PNG format. */
  asset_icon: string;
  /** Address of the token held in the user's wallet. */
  contract_address: string;
  /** The name of the protocol. */
  protocol: string;
  /** The name of the protocol to display. */
  protocol_display_name: string;
  /** The URL pointing to the protocol's icon in PNG format. */
  protocol_icon: string;
  /** The symbol of the asset held in the user's wallet. */
  shared_symbol: string;
}

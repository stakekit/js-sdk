const STEAKWALLET_SOLANA = "m/44'/501'/0'";
export const STEAKWALLET_SOLANA_DERIVATION_PATH = `${STEAKWALLET_SOLANA}/0'`;
export const isSteakwalletSolana = (str: string) =>
  str.startsWith(STEAKWALLET_SOLANA);

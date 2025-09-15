export interface InterestViewDto {
  /** The type of interest - APY */
  type: string;
  /** The Net APY interest rate. Interest user is getting from their staking position. Not the protocol's APY. */
  value: string;
}

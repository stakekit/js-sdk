export interface ProtocolInterestViewDto {
  /** Ledger crypto currency ID */
  currency: string;
  /** The type of interest - APY */
  type: string;
  /** The protocol's Net APY interest rate. */
  value: string;
}

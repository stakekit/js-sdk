export interface OAVStrategyDto {
  /** Weight percentage for this strategy (greater than 0, up to 100) */
  weight: number;
  /** Yield ID for the strategy */
  yieldId: string;
}

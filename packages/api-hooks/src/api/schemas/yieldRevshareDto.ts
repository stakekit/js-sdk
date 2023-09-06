export interface YieldRevshareDto {
  enabled: boolean;
  minCommissionPercentage?: number;
  maxCommissionPercentage?: number;
  baselinePercentage?: number;
  lowEndTvlPercentage?: number;
  highEndTvlPercentage?: number;
}

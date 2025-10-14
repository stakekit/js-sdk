import type { ValidatorHistoricalRevshareChangesDtoApr } from './validatorHistoricalRevshareChangesDtoApr';
import type { ValidatorHistoricalRevshareChangesDtoCommission } from './validatorHistoricalRevshareChangesDtoCommission';
import type { ValidatorHistoricalRevshareChangesDtoMevCommission } from './validatorHistoricalRevshareChangesDtoMevCommission';
import type { ValidatorHistoricalRevshareChangesDtoPreferred } from './validatorHistoricalRevshareChangesDtoPreferred';
import type { ValidatorHistoricalRevshareChangesDtoType } from './validatorHistoricalRevshareChangesDtoType';

export interface ValidatorHistoricalRevshareChangesDto {
  apr?: ValidatorHistoricalRevshareChangesDtoApr;
  commission?: ValidatorHistoricalRevshareChangesDtoCommission;
  id: string;
  lastDay: string;
  mevCommission?: ValidatorHistoricalRevshareChangesDtoMevCommission;
  preferred?: ValidatorHistoricalRevshareChangesDtoPreferred;
  type: ValidatorHistoricalRevshareChangesDtoType;
  validatorId: string;
}

import {
  GasModeValueDto,
  StakeDto,
  StakeRequestDto,
  ValidatorDto,
  YieldOpportunityDto,
} from "@stakekit/api-hooks";
import BigNumber from "bignumber.js";
import { Maybe } from "purify-ts";

export type Action<T extends string, D = void> = D extends void
  ? { type: T }
  : { type: T; data: D };

export type State = {
  selectedStake: Maybe<YieldOpportunityDto>;
  selectedValidator: Maybe<ValidatorDto>;
  stakeAmount: Maybe<BigNumber>;
};

export type ExtraData = {
  gasEstimateTotal: BigNumber;
  availableAmount: BigNumber;
  maxStakeAmount: BigNumber;
  minStakeAmount: BigNumber;
  stakeSession: Maybe<StakeDto>;
  gasModeValue: Maybe<GasModeValueDto>;
  stakeRequestDto: Maybe<StakeRequestDto>;
  stakeEnterTxGas: Maybe<BigNumber>;
  actions: { onMaxClick: () => void };
};

type SelectedStakeAction = Action<"stake/select", YieldOpportunityDto>;
type SelectedValidatorAction = Action<"validator/select", ValidatorDto>;
type StakeAmountChangeAction = Action<"stakeAmount/change", Maybe<BigNumber>>;
type StakeAmountMaxAction = Action<"stakeAmount/max", Maybe<BigNumber>>;
type StateResetAction = Action<"state/reset">;

export type Actions =
  | SelectedStakeAction
  | StakeAmountChangeAction
  | StakeAmountMaxAction
  | StateResetAction
  | SelectedValidatorAction;

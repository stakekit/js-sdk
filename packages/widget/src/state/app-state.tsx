import BigNumber from "bignumber.js";
import { List, Maybe } from "purify-ts";
import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { getGasEstimateTotal, getMaxStakeAmount } from "../domain";
import { useAccountBalance } from "../hooks";
import { Actions, ExtraData, State } from "./types";
import { useFilteredOpportunities } from "../hooks/api/use-filtered-opportunities";
import { config } from "../config";
import { StakeRequestDto, useStakeGetValidators } from "@stakekit/api-hooks";
import { useStakeEnterAndTxsConstruct } from "../hooks/api/use-stake-enter-and-txs-construct";
import { useSKWallet } from "../hooks/use-sk-wallet";
import { useNetworkGas } from "../hooks/api/use-network-gas";

const AppStateContext = createContext<(State & ExtraData) | undefined>(
  undefined
);
const AppDispatchContext = createContext<Dispatch<Actions> | undefined>(
  undefined
);

const getInitialState = (): State => ({
  selectedStake: Maybe.empty(),
  selectedValidator: Maybe.empty(),
  stakeAmount: Maybe.of(new BigNumber(0)),
});

export const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const reducer = (state: State, action: Actions): State => {
    // console.log("__APP_STATE_ACTION__: ", state, action);

    switch (action.type) {
      case "stake/select":
        return {
          ...state,
          selectedValidator: Maybe.empty(),
          selectedStake: Maybe.of(action.data),
          stakeAmount: Maybe.fromNullable(
            action.data.args.enter.args?.amount?.minimum
          )
            .toEither(new BigNumber(0))
            .map((min) => new BigNumber(min))
            .toMaybe(),
        };
      case "validator/select": {
        return {
          ...state,
          selectedValidator: Maybe.of(action.data),
        };
      }
      case "stakeAmount/change": {
        return {
          ...state,
          stakeAmount: action.data,
        };
      }
      case "stakeAmount/max": {
        return {
          ...state,
          stakeAmount: action.data,
        };
      }
      case "state/reset": {
        return getInitialState();
      }
      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, getInitialState());

  const { selectedValidator, selectedStake, stakeAmount } = state;

  const { address, additionalAddresses } = useSKWallet();

  const opportunities = useFilteredOpportunities();

  // set initial stake opportunity
  useEffect(() => {
    if (opportunities.data?.length) {
      dispatch({ type: "stake/select", data: opportunities.data[0] });
    }
  }, [address, opportunities.data]);

  const selectedStakeId = selectedStake.mapOrDefault((s) => s.id, "");

  const gasParameters = useNetworkGas(selectedStake);

  const gasModeValue = useMemo(
    () =>
      Maybe.fromNullable(gasParameters.data).chain((val) =>
        List.find((v) => v.name === "average", val.modes.values)
      ),
    [gasParameters.data]
  );

  const { data: validators } = useStakeGetValidators(selectedStakeId, {
    query: { enabled: !!selectedStakeId },
  });

  /**
   * Set initial validator
   */
  useEffect(() => {
    selectedValidator.ifNothing(() => {
      Maybe.fromNullable(validators)
        .chain((v) => selectedStake.map((ss) => ({ v, ss })))
        .toEither(null)
        .chain((val) =>
          List.find(
            (item) =>
              !!(
                item.address &&
                val.ss.config.defaultValidator &&
                item.address === val.ss.config.defaultValidator
              ),
            val.v
          )
            .toEither(null)
            .chainLeft(() => List.head(val.v).toEither(null))
        )
        .ifRight((val) => dispatch({ type: "validator/select", data: val }));
    });
  }, [selectedStake, selectedValidator, validators]);

  const accountBalance = useAccountBalance({ selectedStake });

  const availableAmount = useMemo(() => {
    return Maybe.fromNullable(accountBalance.data).mapOrDefault(
      (b) =>
        b.reduce(
          (acc, next) => acc.plus(new BigNumber(next.amount ?? 0)),
          new BigNumber(0)
        ),
      new BigNumber(0)
    );
  }, [accountBalance.data]);

  const stakeIntegrationMinLimit = useMemo(
    () =>
      selectedStake
        .chainNullable((y) => y.args.enter.args?.amount?.minimum)
        .map((a) => new BigNumber(a))
        .orDefault(new BigNumber(0)),
    [selectedStake]
  );

  const stakeIntegrationMaxLimit = useMemo(
    () =>
      selectedStake
        .chainNullable((y) => y.args.enter.args?.amount?.maximum)
        .map((a) => new BigNumber(a))
        .orDefault(new BigNumber(Number.POSITIVE_INFINITY)),
    [selectedStake]
  );

  const stakeEnterAndTxsConstruct = useStakeEnterAndTxsConstruct();

  const stakeSession = useMemo(
    () => Maybe.fromNullable(stakeEnterAndTxsConstruct.data?.stakeEnterRes),
    [stakeEnterAndTxsConstruct.data?.stakeEnterRes]
  );

  const gasEstimateTotal = useMemo(
    () =>
      gasModeValue.mapOrDefault(
        (val) => getGasEstimateTotal({ gasModeValue: val }),
        new BigNumber(0)
      ),
    [gasModeValue]
  );

  const maxStakeAmount = useMemo(() => {
    return getMaxStakeAmount({
      availableAmount,
      gasEstimateTotal,
      stakeIntegrationMaxLimit,
    });
  }, [availableAmount, gasEstimateTotal, stakeIntegrationMaxLimit]);

  const minStakeAmount = stakeIntegrationMinLimit;

  const stakeRequestDto = useMemo(
    () =>
      selectedStake
        .chain((stake) =>
          stakeAmount.map((amount) => ({
            stake,
            amount,
            validator: selectedValidator.extractNullable(),
          }))
        )
        .chain((v) =>
          Maybe.fromNullable(address).map((a) => ({ ...v, address: a }))
        )
        .map<StakeRequestDto>((val) => ({
          addresses: {
            address: val.address,
            additionalAddresses: additionalAddresses ?? undefined,
          },
          integrationId: val.stake.id,
          args: {
            amount: val.amount.toString(),
            validatorAddress: val.validator?.address,
          },
        })),
    [
      address,
      selectedStake,
      selectedValidator,
      stakeAmount,
      additionalAddresses,
    ]
  );

  const stakeEnterTxGas = useMemo(() => {
    return Maybe.fromNullable(stakeEnterAndTxsConstruct.data).map((val) =>
      val.transactionConstructRes.reduce(
        (acc, val) => acc.plus(new BigNumber(val.gasEstimate?.amount ?? 0)),
        new BigNumber(0)
      )
    );
  }, [stakeEnterAndTxsConstruct.data]);

  const actions = useMemo(
    () => ({
      onMaxClick: () => {
        const gasEstimateTotalWithPercFix = gasEstimateTotal.multipliedBy(
          config.gasEstimatePercentFix / 100 + 1
        );

        dispatch({
          type: "stakeAmount/max",
          data: Maybe.of(
            getMaxStakeAmount({
              availableAmount,
              gasEstimateTotal: gasEstimateTotalWithPercFix,
              stakeIntegrationMaxLimit,
            })
          ),
        });
      },
    }),
    [availableAmount, gasEstimateTotal, stakeIntegrationMaxLimit]
  );

  const value: State & ExtraData = useMemo(
    () => ({
      selectedValidator,
      selectedStake,
      stakeAmount,
      gasEstimateTotal,
      availableAmount,
      maxStakeAmount,
      minStakeAmount,
      stakeSession,
      actions,
      gasModeValue,
      stakeRequestDto,
      stakeEnterTxGas,
    }),
    [
      selectedValidator,
      selectedStake,
      stakeAmount,
      gasEstimateTotal,
      availableAmount,
      maxStakeAmount,
      minStakeAmount,
      stakeSession,
      actions,
      gasModeValue,
      stakeRequestDto,
      stakeEnterTxGas,
    ]
  );

  return (
    <AppStateContext.Provider value={value}>
      <AppDispatchContext.Provider value={dispatch}>
        {children}
      </AppDispatchContext.Provider>
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const state = useContext(AppStateContext);
  if (state === undefined) {
    throw new Error("useState must be used within a StateProvider");
  }

  return state;
};

export const useAppDispatch = () => {
  const dispatch = useContext(AppDispatchContext);
  if (dispatch === undefined) {
    throw new Error("useDispatch must be used within a StateProvider");
  }

  return dispatch;
};

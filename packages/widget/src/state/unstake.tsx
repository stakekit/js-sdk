import BigNumber from "bignumber.js";
import { Maybe } from "purify-ts";
import {
  Dispatch,
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from "react";
import { Action } from "./types";
import { useStakeExitAndTxsConstruct } from "../hooks/api/use-stake-exit-and-txs-construct";
import { StakeDto, StakeSessionTypes } from "@stakekit/api-hooks";
import { usePendingActionAndTxsConstruct } from "../hooks/api/use-pending-action-and-txs-construct";

type UnstakeAmountChange = Action<
  "unstake/amount/change",
  { integrationId: string; amount: Maybe<BigNumber> }
>;

type ClaimSet = Action<
  "claim/set",
  {
    integrationId: string;
    type: StakeSessionTypes;
    passthrough: string;
    amount: string;
  }
>;

type Actions = UnstakeAmountChange | ClaimSet;

const getInitialState = (): State => ({
  unstake: Maybe.empty(),
  claim: Maybe.empty(),
});

type State = {
  unstake: Maybe<{ integrationId: string; amount: Maybe<BigNumber> }>;
  claim: Maybe<{
    integrationId: string;
    type: StakeSessionTypes;
    passthrough: string;
    amount: string;
  }>;
};

type ExtraData = {
  stakeExitTxGas: Maybe<BigNumber>;
  unstakeSession: Maybe<StakeDto>;
  pendingActionSession: Maybe<StakeDto>;
};

const UnstakeOrClaimContext = createContext<(State & ExtraData) | undefined>(
  undefined
);

const UnstakeOrClaimDispatchContext = createContext<
  Dispatch<Actions> | undefined
>(undefined);

export const UnstakeOrClaimContextProvider = ({
  children,
}: PropsWithChildren) => {
  const reducer = (state: State, action: Actions): State => {
    switch (action.type) {
      case "unstake/amount/change": {
        return {
          ...state,
          unstake: Maybe.of(action.data),
        };
      }
      case "claim/set": {
        return {
          ...state,
          claim: Maybe.of(action.data),
        };
      }

      default:
        return state;
    }
  };

  const [state, dispatch] = useReducer(reducer, getInitialState());

  const stakeExitAndTxsConstruct = useStakeExitAndTxsConstruct();
  const pendingActionAndTxsConstruct = usePendingActionAndTxsConstruct();

  const unstakeSession = useMemo(
    () => Maybe.fromNullable(stakeExitAndTxsConstruct.data?.stakeExitRes),
    [stakeExitAndTxsConstruct.data?.stakeExitRes]
  );

  const pendingActionSession = useMemo(
    () =>
      Maybe.fromNullable(pendingActionAndTxsConstruct.data?.pendingActionRes),
    [pendingActionAndTxsConstruct.data?.pendingActionRes]
  );

  const stakeExitTxGas = useMemo(() => {
    return Maybe.fromNullable(stakeExitAndTxsConstruct.data).map((val) =>
      val.transactionConstructRes.reduce(
        (acc, val) => acc.plus(new BigNumber(val.gasEstimate?.amount ?? 0)),
        new BigNumber(0)
      )
    );
  }, [stakeExitAndTxsConstruct.data]);

  const value: State & ExtraData = useMemo(
    () => ({
      stakeExitTxGas,
      unstakeSession,
      pendingActionSession,
      unstake: state.unstake,
      claim: state.claim,
    }),
    [
      stakeExitTxGas,
      state.claim,
      state.unstake,
      unstakeSession,
      pendingActionSession,
    ]
  );

  return (
    <UnstakeOrClaimContext.Provider value={value}>
      <UnstakeOrClaimDispatchContext.Provider value={dispatch}>
        {children}
      </UnstakeOrClaimDispatchContext.Provider>
    </UnstakeOrClaimContext.Provider>
  );
};

export const useUnstakeOrClaimState = () => {
  const state = useContext(UnstakeOrClaimContext);
  if (state === undefined) {
    throw new Error("useState must be used within a UnstakeContextProvider");
  }

  return state;
};

export const useUnstakeOrClaimDispatch = () => {
  const dispatch = useContext(UnstakeOrClaimDispatchContext);
  if (dispatch === undefined) {
    throw new Error("useDispatch must be used within a UnstakeContextProvider");
  }

  return dispatch;
};

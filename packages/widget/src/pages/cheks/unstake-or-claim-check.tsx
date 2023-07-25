import { Navigate, Outlet, useMatch } from "react-router-dom";
import { useUnstakeOrClaimState } from "../../state/unstake";

export const UnstakeOrClaimCheck = () => {
  const { unstake, pendingActionSession } = useUnstakeOrClaimState();

  const claimMatch = useMatch("claim/:integrationId/*");

  const isReady = claimMatch
    ? pendingActionSession.isJust()
    : unstake
        .chain((u) => u.amount)
        .mapOrDefault((val) => !val.isNaN() && !val.isZero(), false);

  return isReady ? <Outlet /> : <Navigate to="/" replace />;
};

import { Navigate, Outlet } from "react-router-dom";
import { useAppState } from "../../state";

export const StakeCheck = () => {
  const { selectedStake, stakeAmount } = useAppState();

  const isDetailsComplete = selectedStake
    .chain(() => stakeAmount.map((a) => !a.isZero() && !a.isNaN()))
    .extractNullable();

  return isDetailsComplete ? <Outlet /> : <Navigate to="/" replace />;
};

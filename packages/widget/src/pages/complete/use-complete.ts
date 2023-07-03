import { useLocation, useNavigate } from "react-router-dom";
import { useAppState, useDerivedAppState } from "../../state";
import { useResetApp } from "../../hooks/use-reset-app";

export const useComplete = () => {
  const { selectedStake, stakeAmount } = useAppState();

  const resetApp = useResetApp();

  const navigate = useNavigate();

  const { rewardToken } = useDerivedAppState();

  const token = selectedStake.map((y) => y.token).extractNullable();
  const metadata = selectedStake.map((y) => y.metadata).extractNullable();

  const network = selectedStake.mapOrDefault((y) => y.token.symbol, "");

  const amount = stakeAmount.mapOrDefault((a) => a.toString(), "");

  const location = useLocation();

  const urls: string[] | undefined = location.state?.urls;

  const onClick = () => {
    resetApp();
    navigate("/");
  };

  const onViewTransactionClick = () => {
    if (!urls) return;

    if (typeof window === "undefined") return;

    urls.forEach((url) => window.open(url, "_blank"));
  };

  const rewardTokenDetails = rewardToken.extractNullable();

  return {
    network,
    amount,
    token,
    rewardTokenDetails,
    metadata,
    onClick,
    onViewTransactionClick,
  };
};

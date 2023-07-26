import { useLocation, useMatch, useNavigate } from "react-router-dom";
import { useDerivedAppState } from "../../state";
import { useResetApp } from "../../hooks/use-reset-app";

export const useComplete = () => {
  const resetApp = useResetApp();

  const navigate = useNavigate();

  const { rewardToken } = useDerivedAppState();

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

  const unstakeMatch = useMatch("unstake/:integrationId/complete");
  const claimMatch = useMatch("claim/:integrationId/complete");

  return {
    rewardTokenDetails,
    onClick,
    onViewTransactionClick,
    unstakeMatch,
    claimMatch,
    hasUrs: !!urls?.length,
  };
};

import { useTranslation } from "react-i18next";
import { Box, Button, Heading, Text } from "../../components";
import { PageContainer } from "../components";
import { CheckCircleIcon } from "../../components/atoms/icons/check-circle";
import { useComplete } from "./use-complete";
import { TokenIcon } from "../../components/atoms/token-icon";
import { useAppState } from "../../state";
import { TokenDto, YieldMetadataDto } from "@stakekit/api-hooks";
import { useUnstakeOrClaimState } from "../../state/unstake";
import { useMatch, useParams } from "react-router-dom";
import { usePositionData } from "../../hooks/use-position-data";
import BigNumber from "bignumber.js";
import { formatTokenBalance } from "../../utils";

type Props = {
  token: TokenDto | null;
  metadata: YieldMetadataDto | null;
  network: string;
  amount: string;
};

const CompletePage = ({ amount, metadata, network, token }: Props) => {
  const { t } = useTranslation();

  const {
    rewardTokenDetails,
    onClick,
    onViewTransactionClick,
    unstakeMatch,
    claimMatch,
  } = useComplete();

  return (
    <PageContainer>
      <Box
        flex={1}
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
      >
        <Box
          flex={1}
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          textAlign="center"
        >
          {token && metadata && (
            <Box marginBottom="4">
              <TokenIcon
                metadata={metadata}
                tokenLogoHw="32"
                tokenNetworkLogoHw="8"
                token={token}
              />
            </Box>
          )}
          <Heading variant={{ level: "h3" }}>
            {t(
              unstakeMatch
                ? "complete.successfully_unstaked"
                : claimMatch
                ? "complete.successfully_claimed"
                : "complete.successfully_staked",
              {
                amount,
                tokenNetwork: network,
              }
            )}
          </Heading>

          {rewardTokenDetails && (
            <Box display="flex" marginTop="2">
              {rewardTokenDetails.logoUri && (
                <Box
                  hw="5"
                  as="img"
                  src={rewardTokenDetails.logoUri}
                  marginRight="1"
                />
              )}
              <Text variant={{ type: "muted", size: "small" }}>
                {t("complete.via", {
                  providerName: rewardTokenDetails.providerName,
                })}
              </Text>
            </Box>
          )}

          <Box
            marginTop="4"
            display="flex"
            justifyContent="center"
            alignItems="center"
            as="button"
            onClick={onViewTransactionClick}
          >
            <Box
              marginRight="1"
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <CheckCircleIcon width={22} height={22} />
            </Box>
            <Text variant={{ type: "muted", size: "small" }}>
              {t("complete.view_transaction")}
            </Text>
          </Box>
        </Box>

        <Box display="flex" alignItems="flex-end">
          <Button onClick={onClick}>{t("shared.ok")}</Button>
        </Box>
      </Box>
    </PageContainer>
  );
};

export const StakeCompletePage = () => {
  const { stakeAmount, selectedStake } = useAppState();

  const token = selectedStake.map((y) => y.token).extractNullable();
  const metadata = selectedStake.map((y) => y.metadata).extractNullable();

  const network = selectedStake.mapOrDefault((y) => y.token.symbol, "");

  const amount = stakeAmount.mapOrDefault((a) => a.toString(), "");

  return (
    <CompletePage
      token={token}
      metadata={metadata}
      network={network}
      amount={amount}
    />
  );
};

export const UnstakeOrClaimCompletePage = () => {
  const { unstake, claim } = useUnstakeOrClaimState();

  const claimMatch = useMatch("claim/:integrationId/complete");

  const integrationId = useParams<{ integrationId: string }>().integrationId!;

  const { position } = usePositionData(integrationId);

  const token = position.map((p) => p.balanceData.token).extractNullable();
  const metadata = position
    .map((p) => p.integrationData.metadata)
    .extractNullable();
  const network = token?.symbol ?? "";
  const amount = claimMatch
    ? claim.mapOrDefault(
        (val) => formatTokenBalance(new BigNumber(val.amount), 6),
        ""
      )
    : unstake
        .chain((u) => u.amount)
        .mapOrDefault((a) => formatTokenBalance(a, 6), "");

  return (
    <CompletePage
      token={token}
      metadata={metadata}
      network={network}
      amount={amount}
    />
  );
};

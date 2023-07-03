import { useTranslation } from "react-i18next";
import { Box, Button, Heading, Text } from "../../components";
import { PageContainer } from "../components";
import { CheckCircleIcon } from "../../components/atoms/icons/check-circle";
import { useComplete } from "./use-complete";
import { TokenIcon } from "../../components/atoms/token-icon";

export const CompletePage = () => {
  const { t } = useTranslation();

  const {
    amount,
    network,
    token,
    metadata,
    rewardTokenDetails,
    onClick,
    onViewTransactionClick,
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
            {t("complete.successfully_staked", {
              amount,
              tokenNetwork: network,
            })}
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

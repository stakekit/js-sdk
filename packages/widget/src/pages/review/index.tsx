import { Trans, useTranslation } from "react-i18next";
import { Button, Divider, Highlight } from "../../components";
import { Box } from "../../components/atoms/box";
import { Heading, Text } from "../../components/atoms/typography";
import { PageContainer } from "../components";
import { useReview } from "./use-review";
import { feeStyles, spanStyle } from "./style.css";
import { RewardTokenDetails } from "../../components/molecules/reward-token-details";
import { TokenIcon } from "../../components/atoms/token-icon";
import { HelpModal } from "../../components/molecules/help-modal";

export const ReviewPage = () => {
  const {
    amount,
    fee,
    interestRate,
    tokenNetwork,
    yieldType,
    token,
    onClick,
    rewardToken,
    metadata,
  } = useReview();

  const { t } = useTranslation();

  return (
    <>
      <PageContainer>
        <Box marginBottom="4">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginBottom="1"
          >
            <Heading variant={{ level: "h1" }}>{yieldType}</Heading>
            {token && metadata && (
              <TokenIcon token={token} metadata={metadata} />
            )}
          </Box>

          <Heading variant={{ level: "h1" }}>
            <Trans
              i18nKey="review.amount_and_earn"
              values={{
                amount,
                tokenNetwork,
                interestRate,
              }}
              components={{
                highlight0: <Highlight className={spanStyle} />,
                highlight1: <Highlight className={spanStyle} />,
                highlight3: <Highlight className={spanStyle} />,
              }}
            />
          </Heading>

          <Box marginTop="1">
            <Text variant={{ size: "xsmall", type: "muted", weight: "normal" }}>
              {t("review.estimated_reward")}
            </Text>
          </Box>
        </Box>

        <Divider />

        <RewardTokenDetails rewardToken={rewardToken} />

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginTop="3"
        >
          <Text variant={{ weight: "semibold", size: "small" }}>
            {t("shared.fees")}
          </Text>
          <HelpModal type="fees" />
        </Box>

        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          my="1"
          data-testid="estimated_gas_fee"
        >
          <Text variant={{ size: "small", weight: "normal", type: "muted" }}>
            {t("review.estimated_gas_fee")}
          </Text>
          <Text
            className={feeStyles}
            variant={{ size: "small", type: "muted", weight: "normal" }}
          >
            {fee}
          </Text>
        </Box>

        <Box
          flex={1}
          display="flex"
          justifyContent="flex-end"
          flexDirection="column"
        >
          <Button
            onClick={onClick}
            variant={{ color: "primary", animation: "press" }}
          >
            {t("shared.confirm")}
          </Button>
        </Box>
      </PageContainer>

      <Box background="backgroundMuted" px="6" py="6">
        <Text variant={{ size: "xsmall", weight: "normal", type: "muted" }}>
          <Trans
            i18nKey="review.terms_of_use"
            components={{
              underline0: <span style={{ textDecoration: "underline" }} />,
            }}
          />
        </Text>
      </Box>
    </>
  );
};
